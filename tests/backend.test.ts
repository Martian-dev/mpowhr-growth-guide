import { beforeAll, beforeEach, afterAll, expect, mock, test } from "bun:test";
import { PGlite } from "@electric-sql/pglite";
import { readFile } from "node:fs/promises";
import { createHmac } from "node:crypto";

// All persistence uses an isolated PostgreSQL engine; no real keys, DB or Sheet.
delete process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
delete process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
delete process.env.RESEND_API_KEY;
process.env.DATABASE_URL = "postgres://test";
process.env.POSH_WORKSHOP_CAPACITY = "50";
process.env.RAZORPAY_KEY_ID = "rzp_test_fixture";
process.env.RAZORPAY_KEY_SECRET = "fixture-secret";
process.env.RAZORPAY_WEBHOOK_SECRET = "fixture-webhook";
process.env.CRON_SECRET = "fixture-cron";
const database = new PGlite();
type Query = {
  text: string;
  values: unknown[];
  then: (
    resolve: (v: unknown[]) => unknown,
    reject?: (e: unknown) => unknown,
  ) => Promise<unknown>;
};
const query = (text: string, values: unknown[] = []): Query => ({
  text,
  values,
  then: (resolve, reject) =>
    database
      .query(text, values)
      .then((r) => r.rows)
      .then(resolve, reject),
});
const sql = Object.assign(
  (parts: TemplateStringsArray, ...values: unknown[]) =>
    query(
      parts.reduce(
        (s, p, i) => s + p + (i < values.length ? `$${i + 1}` : ""),
        "",
      ),
      values,
    ),
  {
    query,
    transaction: async (queries: Query[]) => {
      await database.exec("BEGIN");
      try {
        const rows = [];
        for (const q of queries)
          rows.push((await database.query(q.text, q.values)).rows);
        await database.exec("COMMIT");
        return rows;
      } catch (e) {
        await database.exec("ROLLBACK");
        throw e;
      }
    },
  },
);
mock.module("@neondatabase/serverless", () => ({ neon: () => sql }));
mock.module("@vercel/functions", () => ({
  waitUntil: (promise: Promise<unknown>) => {
    void promise;
  },
}));

const cells = new Map<string, unknown[]>();
let googleFailure = false;
let googleAmbiguous = false;
const sheetRequest = async ({
  url,
  data,
}: {
  url: string;
  data?: { data?: { range: string; values: unknown[][] }[] };
}) => {
  if (googleFailure) throw new Error("Offline");
  if (url.includes("?fields="))
    return {
      data: {
        sheets: ["Bookings", "Attendees"].map((title, i) => ({
          properties: {
            sheetId: i,
            title,
            gridProperties: { rowCount: 10000, columnCount: 20 },
          },
        })),
      },
    };
  if (url.includes("/values:batchGet")) {
    const ranges = new URL(url).searchParams.getAll("ranges");
    return {
      data: {
        valueRanges: ranges.map((range) => ({
          values: cells.has(range.split(":")[0])
            ? [cells.get(range.split(":")[0])]
            : [],
        })),
      },
    };
  }
  if (url.includes("/values:batchUpdate")) {
    for (const item of data?.data ?? [])
      cells.set(item.range.split(":")[0], item.values[0]);
    if (
      googleAmbiguous &&
      data?.data?.some((item) => !item.range.includes("!A1:"))
    ) {
      googleAmbiguous = false;
      throw new Error("Write succeeded, response timed out");
    }
  }
  return { data: {} };
};
mock.module("google-auth-library", () => ({
  GoogleAuth: class {
    async getClient() {
      return { request: sheetRequest };
    }
  },
}));

const registration = await import("../api/posh/registration");
const orderRoute = await import("../api/razorpay/order");
const verifyRoute = await import("../api/razorpay/verify");
const webhookRoute = await import("../api/razorpay/webhook");
const maintenanceRoute = await import("../api/posh/maintenance");
const db = await import("../server/posh/db");
const payments = await import("../server/posh/payments");
const { runSheetSync } = await import("../server/posh/maintenance");
const { tokenHash } = await import("../server/posh/http");
const { sqlStatements } = await import("../scripts/sql-statements");
let cookie = "";
let bookingId = "";
let orderCount = 0;
let rejectOrder = false;
let loseOrderResponse = false;
const providerOrders = new Map<string, Record<string, unknown>>();
const providerPayments = new Map<string, Record<string, unknown>>();
globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = new URL(String(input));
  const path = url.pathname.replace("/v1/", "");
  if (url.hostname !== "api.razorpay.com")
    throw new Error("Unexpected external request");
  if (path === "orders" && init?.method === "POST") {
    if (rejectOrder)
      return Response.json({ error: "Rejected" }, { status: 400 });
    const body = JSON.parse(String(init.body));
    const o = { ...body, id: `order_Test${++orderCount}`, status: "created" };
    providerOrders.set(o.id, o);
    if (loseOrderResponse) {
      loseOrderResponse = false;
      throw new Error("Response lost after creating order");
    }
    return Response.json(o);
  }
  if (path === "orders")
    return Response.json({
      items: [...providerOrders.values()].filter(
        (o) => o.receipt === url.searchParams.get("receipt"),
      ),
    });
  if (path.startsWith("payments/"))
    return Response.json(providerPayments.get(path.slice(9)));
  if (path.endsWith("/payments"))
    return Response.json({
      items: [...providerPayments.values()].filter(
        (p) => p.order_id === path.split("/")[1],
      ),
    });
  if (path.startsWith("orders/"))
    return Response.json(providerOrders.get(path.slice(7)));
  throw new Error("Unexpected provider operation");
}) as typeof fetch;
const contact = {
  name: "Anne Test",
  email: "anne@example.test",
  phone: "+919876543210",
};
const other = {
  name: "Second Person",
  email: "second@example.test",
  phone: "+919876543211",
  audience: "Students" as const,
};
const request = (path: string, method = "GET", body?: unknown) =>
  new Request(`https://workshop.test${path}`, {
    method,
    headers: {
      origin: "https://workshop.test",
      cookie,
      "content-type": "application/json",
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
const start = async (seats: 1 | 2 = 1) => {
  const response = await registration.POST(
    request("/api/posh/registration", "POST", contact),
  );
  expect(response.status).toBe(200);
  cookie = response.headers.get("set-cookie")!.split(";")[0];
  bookingId = (await response.json()).id;
  expect(
    (
      await registration.PATCH(
        request("/api/posh/registration", "PATCH", {
          step: "audience",
          audience: "Team leaders",
        }),
      )
    ).status,
  ).toBe(200);
  expect(
    (
      await registration.PATCH(
        request("/api/posh/registration", "PATCH", {
          step: "selection",
          selection: {
            seats,
            ...(seats === 2 ? { secondAttendee: other } : {}),
          },
        }),
      )
    ).status,
  ).toBe(200);
};
const createOrder = async () => {
  const response = await orderRoute.POST(
    request("/api/razorpay/order", "POST", {}),
  );
  expect(response.status).toBe(200);
  return await response.json();
};
const capture = (orderId: string, amount = 79900, id = "pay_Test1") => {
  const p = {
    id,
    order_id: orderId,
    amount,
    currency: "INR",
    status: "captured",
  };
  providerPayments.set(id, p);
  return p;
};
const webhook = async (event: string, entity: unknown, eventId = "event-1") => {
  const body = JSON.stringify({
    event,
    payload: {
      [event.startsWith("refund") ? "refund" : "payment"]: { entity },
    },
  });
  return webhookRoute.POST(
    new Request("https://workshop.test/api/razorpay/webhook", {
      method: "POST",
      headers: {
        "x-razorpay-event-id": eventId,
        "x-razorpay-signature": createHmac("sha256", "fixture-webhook")
          .update(body)
          .digest("hex"),
      },
      body,
    }),
  );
};
beforeAll(async () => {
  await database.exec(await readFile("db/001_posh_registrations.sql", "utf8"));
  await database.exec(await readFile("db/002_registration_flow.sql", "utf8"));
});
beforeEach(async () => {
  delete process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  delete process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  googleFailure = false;
  googleAmbiguous = false;
  cells.clear();
  cookie = "";
  bookingId = "";
  orderCount = 0;
  rejectOrder = false;
  loseOrderResponse = false;
  providerOrders.clear();
  providerPayments.clear();
  await database.exec(
    "TRUNCATE posh_sheet_jobs,posh_attendees,posh_payment_orders,posh_registrations,razorpay_webhook_events,razorpay_processed_refunds,posh_worker_leases,posh_order_rate_limits CASCADE;",
  );
});
afterAll(() => database.close());

test("migration splitter preserves function bodies and quoted semicolons", () => {
  expect(
    sqlStatements(
      "-- comment\nSELECT ';';CREATE FUNCTION x() RETURNS void AS $$ BEGIN PERFORM 1; END; $$ LANGUAGE plpgsql;",
    ),
  ).toHaveLength(2);
});
test("contact submission persists an incomplete lead, attendee and transactional sync job", async () => {
  const r = await registration.POST(
    request("/api/posh/registration", "POST", contact),
  );
  expect(r.status).toBe(200);
  expect(r.headers.get("set-cookie")).toContain("HttpOnly");
  expect(r.headers.get("set-cookie")).toContain("Secure");
  expect(
    (await database.query("SELECT * FROM posh_registrations")).rows[0],
  ).toMatchObject({ status: "draft", seats: null, email: contact.email });
  expect(
    (await database.query("SELECT * FROM posh_sheet_jobs")).rows,
  ).toHaveLength(1);
  expect(
    (await database.query("SELECT * FROM posh_attendees")).rows,
  ).toHaveLength(1);
});
test("cross-origin submissions and malformed contact details are rejected", async () => {
  const cross = new Request("https://workshop.test/api/posh/registration", {
    method: "POST",
    headers: {
      origin: "https://other.test",
      "content-type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  expect((await registration.POST(cross)).status).toBe(403);
  expect(
    (
      await registration.POST(
        request("/api/posh/registration", "POST", { ...contact, name: "  " }),
      )
    ).status,
  ).toBe(400);
  expect(
    (await database.query("SELECT * FROM posh_registrations")).rows,
  ).toHaveLength(0);
});
test("unrelated or absent cookies cannot read a registration", async () => {
  await start();
  cookie = "posh_session=" + "a".repeat(64);
  expect(
    await (await registration.GET(request("/api/posh/registration"))).json(),
  ).toEqual({ booking: null });
});
test("two seats require complete second attendee and valid classification", async () => {
  await start();
  const invalid = await registration.PATCH(
    request("/api/posh/registration", "PATCH", {
      step: "selection",
      selection: { seats: 2 },
    }),
  );
  expect(invalid.status).toBe(400);
  expect((await db.attendeesFor(bookingId)).length).toBe(1);
});
test("backend sets two-person price and saves both attendee records", async () => {
  await start(2);
  const o = await createOrder();
  expect(o.amount).toBe(149900);
  expect(o.seats).toBe(2);
  expect(await db.attendeesFor(bookingId)).toHaveLength(2);
});
test("browser amount overrides are rejected without creating provider orders", async () => {
  await start();
  const r = await orderRoute.POST(
    request("/api/razorpay/order", "POST", { amount: 1 }),
  );
  expect(r.status).toBe(400);
  expect(orderCount).toBe(0);
});
test("duplicate checkout submissions reuse the same provider order", async () => {
  await start();
  const first = await createOrder();
  const second = await createOrder();
  expect(first.orderId).toBe(second.orderId);
  expect(orderCount).toBe(1);
});
test("incomplete classifications cannot start checkout", async () => {
  const r = await registration.POST(
    request("/api/posh/registration", "POST", contact),
  );
  cookie = r.headers.get("set-cookie")!.split(";")[0];
  expect(
    (await orderRoute.POST(request("/api/razorpay/order", "POST", {}))).status,
  ).toBe(409);
});
test("active checkout locks edits to protect the payment snapshot", async () => {
  await start();
  await createOrder();
  expect(
    (
      await registration.PATCH(
        request("/api/posh/registration", "PATCH", {
          step: "selection",
          selection: { seats: 2, secondAttendee: other },
        }),
      )
    ).status,
  ).toBe(409);
});
test("failed payment attempt preserves registration and allows retry", async () => {
  await start();
  const o = await createOrder();
  expect(
    (await webhook("payment.failed", { order_id: o.orderId, id: "pay_Failed" }))
      .status,
  ).toBe(200);
  expect((await db.findSession(cookie.slice(13)))?.status).toBe(
    "awaiting_payment",
  );
  expect((await createOrder()).orderId).toBe(o.orderId);
});
test("verified captured payment confirms exactly once and survives a refresh", async () => {
  await start(2);
  const o = await createOrder();
  const p = capture(o.orderId, 149900);
  const body = {
    razorpay_order_id: o.orderId,
    razorpay_payment_id: p.id,
    razorpay_signature: createHmac("sha256", "fixture-secret")
      .update(`${o.orderId}|${p.id}`)
      .digest("hex"),
  };
  for (let i = 0; i < 2; i++) {
    const r = await verifyRoute.POST(
      request("/api/razorpay/verify", "POST", body),
    );
    expect(r.status).toBe(200);
    expect((await r.json()).verified).toBe(true);
  }
  const view = await (
    await registration.GET(request("/api/posh/registration"))
  ).json();
  expect(view.booking.status).toBe("paid");
  expect(view.booking.attendees).toHaveLength(2);
  expect(view.booking.communityUrl).toBeNull();
  expect(
    (await database.query("SELECT * FROM posh_payment_orders")).rows,
  ).toHaveLength(1);
});
test("forged signature and captured amount mismatch cannot confirm", async () => {
  await start();
  const o = await createOrder();
  const p = capture(o.orderId, 100);
  expect(
    (
      await verifyRoute.POST(
        request("/api/razorpay/verify", "POST", {
          razorpay_order_id: o.orderId,
          razorpay_payment_id: p.id,
          razorpay_signature: "0".repeat(64),
        }),
      )
    ).status,
  ).toBe(400);
  expect((await webhook("payment.captured", p)).status).toBe(409);
  expect((await db.findSession(cookie.slice(13)))?.status).toBe(
    "awaiting_payment",
  );
});
test("webhook confirms a payment when the browser never calls verification", async () => {
  await start();
  const o = await createOrder();
  const p = capture(o.orderId);
  expect((await webhook("payment.captured", p)).status).toBe(200);
  expect((await webhook("payment.captured", p)).status).toBe(200);
  expect((await db.findSession(cookie.slice(13)))?.status).toBe("paid");
  expect(
    (await database.query("SELECT * FROM razorpay_webhook_events")).rows,
  ).toHaveLength(1);
});
test("status endpoint recovers captured payments if callback and webhook are missing", async () => {
  await start();
  const o = await createOrder();
  capture(o.orderId);
  const result = await (
    await registration.GET(request("/api/posh/registration"))
  ).json();
  expect(result.booking.status).toBe("paid");
});
test("refund arriving before capture is applied and cannot show successful registration", async () => {
  await start();
  const o = await createOrder();
  const p = capture(o.orderId);
  expect(
    (
      await webhook(
        "refund.processed",
        { id: "rfnd_1", payment_id: p.id, amount: 79900 },
        "refund-first",
      )
    ).status,
  ).toBe(200);
  expect((await webhook("payment.captured", p, "capture-later")).status).toBe(
    200,
  );
  expect((await db.findSession(cookie.slice(13)))?.status).toBe("refunded");
});
test("duplicate partial refunds accumulate once and full refund updates booking", async () => {
  await start();
  const o = await createOrder();
  const p = capture(o.orderId);
  await webhook("payment.captured", p);
  for (const id of ["event-r1", "event-r1-duplicate"])
    await webhook(
      "refund.processed",
      { id: "rfnd_1", payment_id: p.id, amount: 40000 },
      id,
    );
  expect((await db.findSession(cookie.slice(13)))?.refunded_amount).toBe(40000);
  await webhook(
    "refund.processed",
    { id: "rfnd_2", payment_id: p.id, amount: 39900 },
    "event-r2",
  );
  expect((await db.findSession(cookie.slice(13)))?.status).toBe("refunded");
});
test("unknown provider responses recover by receipt without creating a second order", async () => {
  await start();
  loseOrderResponse = true;
  expect(
    (await orderRoute.POST(request("/api/razorpay/order", "POST", {}))).status,
  ).toBe(503);
  expect((await createOrder()).orderId).toBe("order_Test1");
  expect(orderCount).toBe(1);
});
test("capacity reservations prevent overselling and delayed captures are flagged for review", async () => {
  process.env.POSH_WORKSHOP_CAPACITY = "1";
  try {
    await start();
    const first = await createOrder();
    const firstCookie = cookie;
    await database.exec(
      `UPDATE posh_payment_orders SET expires_at=now()-interval '1 minute'`,
    );
    cookie = "";
    await start();
    const second = await createOrder();
    await webhook(
      "payment.captured",
      capture(second.orderId, 79900, "pay_Second"),
      "second-paid",
    );
    await webhook(
      "payment.captured",
      capture(first.orderId, 79900, "pay_First"),
      "first-late",
    );
    cookie = firstCookie;
    expect((await db.findSession(cookie.slice(13)))?.status).toBe(
      "payment_review",
    );
  } finally {
    process.env.POSH_WORKSHOP_CAPACITY = "50";
  }
});
test("a second captured order is recorded for review rather than fulfilled twice", async () => {
  await start();
  const first = await createOrder();
  await database.exec(
    `UPDATE posh_payment_orders SET expires_at=now()-interval '1 minute'`,
  );
  const second = await createOrder();
  await webhook(
    "payment.captured",
    capture(first.orderId, 79900, "pay_First"),
    "first",
  );
  await webhook(
    "payment.captured",
    capture(second.orderId, 79900, "pay_Second"),
    "second",
  );
  expect((await db.findSession(cookie.slice(13)))?.status).toBe(
    "payment_review",
  );
  expect(
    (
      await database.query(
        "SELECT * FROM posh_payment_orders WHERE status='paid'",
      )
    ).rows,
  ).toHaveLength(2);
});
test("maintenance requires the worker secret", async () => {
  expect(
    (await maintenanceRoute.GET(request("/api/posh/maintenance"))).status,
  ).toBe(401);
});
test("sheet sync writes one booking and two attendees, with safe retries after an ambiguous write", async () => {
  await start(2);
  process.env.GOOGLE_SERVICE_ACCOUNT_JSON = "{}";
  process.env.GOOGLE_SHEETS_SPREADSHEET_ID = "fixture";
  // First batch writes headers, then fail the subsequent data write response.
  googleAmbiguous = true;
  await runSheetSync(true);
  await runSheetSync(true);
  await runSheetSync(true);
  const bookingRows = [...cells.entries()].filter(
    ([k]) => /^Bookings!A\d+$/.test(k) && k !== "Bookings!A1",
  );
  const attendeeRows = [...cells.entries()].filter(
    ([k]) => /^Attendees!A\d+$/.test(k) && k !== "Attendees!A1",
  );
  expect(bookingRows).toHaveLength(1);
  expect(attendeeRows).toHaveLength(2);
  expect(bookingRows[0][1][6]).toBe(1499);
  const job = (await database.query("SELECT * FROM posh_sheet_jobs")).rows[0];
  expect(job.synced_version).toBe(job.version);
});
test("Google downtime leaves a durable pending job and booking intact", async () => {
  await start();
  process.env.GOOGLE_SERVICE_ACCOUNT_JSON = "{}";
  process.env.GOOGLE_SHEETS_SPREADSHEET_ID = "fixture";
  googleFailure = true;
  await runSheetSync(true);
  const job = (await database.query("SELECT * FROM posh_sheet_jobs")).rows[0];
  expect(job.synced_version).toBeLessThan(job.version);
  expect(job.last_error).toBeTruthy();
  expect((await db.findSession(cookie.slice(13)))?.status).toBe("draft");
});
test("transaction rollback does not leave an outbox job without its registration", async () => {
  await database.exec("BEGIN");
  await database.query(
    "INSERT INTO posh_registrations(id,name,email,phone,status) VALUES('rolled-back','Test','t@test.test','1234567890','draft')",
  );
  await database.exec("ROLLBACK");
  expect(
    (
      await database.query(
        "SELECT * FROM posh_sheet_jobs WHERE registration_id='rolled-back'",
      )
    ).rows,
  ).toHaveLength(0);
});

test("concurrent checkout claims return a single order", async () => {
  await start();
  const [a, b] = await Promise.all([
    db.claimCheckout(bookingId, "claim-a"),
    db.claimCheckout(bookingId, "claim-b"),
  ]);
  expect(a.id).toBe(b.id);
  expect(
    (await database.query("SELECT * FROM posh_payment_orders")).rows,
  ).toHaveLength(1);
});
test("active reservations block another booking when capacity is exhausted", async () => {
  process.env.POSH_WORKSHOP_CAPACITY = "1";
  try {
    await start();
    await createOrder();
    cookie = "";
    await start();
    expect(
      (await orderRoute.POST(request("/api/razorpay/order", "POST", {})))
        .status,
    ).toBe(409);
    expect(orderCount).toBe(1);
  } finally {
    process.env.POSH_WORKSHOP_CAPACITY = "50";
  }
});
test("a late capture restores the attendees and amount from its original checkout", async () => {
  await start(2);
  const original = await createOrder();
  await database.exec(
    "UPDATE posh_payment_orders SET expires_at=now()-interval '1 minute'",
  );
  await db.saveSelection(bookingId, { seats: 1 });
  await webhook("payment.captured", capture(original.orderId, 149900));
  const booking = await db.findSession(cookie.slice(13));
  expect(booking?.seats).toBe(2);
  expect(booking?.expected_amount).toBe(149900);
  expect((await db.attendeesFor(bookingId))[1].name).toBe(other.name);
});
test("late failed events cannot regress a paid registration", async () => {
  await start();
  const order = await createOrder();
  await webhook("payment.captured", capture(order.orderId));
  await webhook(
    "payment.failed",
    { order_id: order.orderId, id: "pay_Failed" },
    "late-failure",
  );
  expect((await db.findSession(cookie.slice(13)))?.status).toBe("paid");
});
test("authorized but uncaptured payment stays pending", async () => {
  await start();
  const order = await createOrder();
  const payment = { ...capture(order.orderId), status: "authorized" };
  providerPayments.set(payment.id, payment);
  const response = await verifyRoute.POST(
    request("/api/razorpay/verify", "POST", {
      razorpay_order_id: order.orderId,
      razorpay_payment_id: payment.id,
      razorpay_signature: createHmac("sha256", "fixture-secret")
        .update(`${order.orderId}|${payment.id}`)
        .digest("hex"),
    }),
  );
  expect(response.status).toBe(202);
  expect((await response.json()).verified).toBe(false);
  expect((await db.findSession(cookie.slice(13)))?.status).toBe(
    "awaiting_payment",
  );
});

test("definitive provider rejection releases the checkout for another attempt", async () => {
  await start();
  rejectOrder = true;
  expect(
    (await orderRoute.POST(request("/api/razorpay/order", "POST", {}))).status,
  ).toBe(503);
  expect((await db.ordersFor(bookingId))[0].status).toBe("cancelled");
  rejectOrder = false;
  await createOrder();
  expect(orderCount).toBe(1);
});
test("expired sessions cannot read old contact details or overwrite that registration", async () => {
  await start();
  const previousId = bookingId;
  await database.exec(
    "UPDATE posh_registrations SET created_at=now()-interval '31 days'",
  );
  expect(
    (await (await registration.GET(request("/api/posh/registration"))).json())
      .booking,
  ).toBeNull();
  const response = await registration.POST(
    request("/api/posh/registration", "POST", contact),
  );
  expect(response.status).toBe(200);
  expect((await response.json()).id).not.toBe(previousId);
});
