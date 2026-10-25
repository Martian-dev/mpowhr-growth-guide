import { GoogleAuth } from "google-auth-library";
import { attendeesFor, type Registration, type Attendee } from "./db.js";

export const BOOKING_HEADERS = [
  "Booking ID",
  "Name",
  "Email",
  "Phone",
  "Classification",
  "Seats",
  "Booking amount (INR)",
  "Status",
  "Payment ID",
  "Registered at",
  "Paid at",
  "Refunded amount (INR)",
  "Updated at",
];
export const ATTENDEE_HEADERS = [
  "Attendee ID",
  "Booking ID",
  "Name",
  "Email",
  "Phone",
  "Classification",
  "Booking status",
  "Active",
];
export const sheetsConfigured = () =>
  Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON &&
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  );
let auth: GoogleAuth | undefined;
const request = async <T>(
  path: string,
  method = "GET",
  data?: unknown,
): Promise<T> => {
  auth ??= new GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON ?? "{}"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const client = await auth.getClient();
  const result = await client.request<T>({
    url: `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEETS_SPREADSHEET_ID}${path}`,
    method: method as "GET" | "POST",
    data,
    timeout: 10000,
    retry: false,
  });
  return result.data;
};
type Sheet = {
  sheetId: number;
  title: string;
  gridProperties: { rowCount: number; columnCount: number };
};
export const initializeSheets = async () => {
  let metadata = await request<{ sheets: { properties: Sheet }[] }>(
    "?fields=sheets.properties",
  );
  const requests: unknown[] = [];
  for (const title of ["Bookings", "Attendees"])
    if (!metadata.sheets.some((s) => s.properties.title === title))
      requests.push({
        addSheet: {
          properties: {
            title,
            gridProperties: {
              rowCount: 1000,
              columnCount: 20,
              frozenRowCount: 1,
            },
          },
        },
      });
  if (requests.length) {
    await request(":batchUpdate", "POST", { requests });
    metadata = await request<{ sheets: { properties: Sheet }[] }>(
      "?fields=sheets.properties",
    );
  }
  const values = await request<{ valueRanges: { values?: string[][] }[] }>(
    "/values:batchGet?ranges=Bookings!A1:M1&ranges=Attendees!A1:H1",
  );
  for (const [index, headers] of [
    BOOKING_HEADERS,
    ATTENDEE_HEADERS,
  ].entries()) {
    const existing = values.valueRanges[index]?.values?.[0];
    if (
      existing?.length &&
      JSON.stringify(existing) !== JSON.stringify(headers)
    )
      throw new Error(
        "Managed sheet headers have changed. Restore the documented headers before syncing.",
      );
  }
  await request("/values:batchUpdate", "POST", {
    valueInputOption: "RAW",
    data: [
      { range: "Bookings!A1:M1", values: [BOOKING_HEADERS] },
      { range: "Attendees!A1:H1", values: [ATTENDEE_HEADERS] },
    ],
  });
  return metadata;
};
export const bookingValues = (b: Registration & { updated_at?: string }) => [
  b.id,
  b.name,
  b.email,
  b.phone,
  b.audience ?? "",
  b.seats ?? "",
  b.expected_amount === null ? "" : b.expected_amount / 100,
  b.status,
  b.razorpay_payment_id ?? "",
  b.created_at,
  b.paid_at ?? "",
  b.refunded_amount / 100,
  b.updated_at ?? "",
];
export const attendeeValues = (b: Registration, a: Attendee) => [
  a.id,
  b.id,
  a.name,
  a.email,
  a.phone,
  a.audience ?? "",
  b.status,
  a.active ? "Yes" : "No",
];
export const syncRegistration = async (
  booking: Registration,
  cachedMetadata?: { sheets: { properties: Sheet }[] },
) => {
  const attendees = await attendeesFor(booking.id, true);
  const targets = [
    {
      tab: "Bookings",
      row: Number(booking.sheet_row),
      id: booking.id,
      values: bookingValues(booking),
    },
    ...attendees.map((a) => ({
      tab: "Attendees",
      row: Number(a.sheet_row),
      id: a.id,
      values: attendeeValues(booking, a),
    })),
  ];
  const metadata =
    cachedMetadata ??
    (await request<{ sheets: { properties: Sheet }[] }>(
      "?fields=sheets.properties",
    ));
  const resize = metadata.sheets.flatMap(({ properties: p }) => {
    const max = Math.max(
      0,
      ...targets.filter((t) => t.tab === p.title).map((t) => t.row),
    );
    return max > p.gridProperties.rowCount
      ? [
          {
            appendDimension: {
              sheetId: p.sheetId,
              dimension: "ROWS",
              length: max - p.gridProperties.rowCount + 100,
            },
          },
        ]
      : [];
  });
  if (resize.length)
    await request(":batchUpdate", "POST", { requests: resize });
  const ranges = targets
    .map((t) => `ranges=${encodeURIComponent(`${t.tab}!A${t.row}`)}`)
    .join("&");
  const current = await request<{ valueRanges: { values?: string[][] }[] }>(
    `/values:batchGet?${ranges}`,
  );
  for (const [i, t] of targets.entries()) {
    const existing = current.valueRanges[i]?.values?.[0]?.[0];
    if (existing && existing !== t.id)
      throw new Error(
        "Managed rows were moved. Restore row order; use filter views instead of sorting managed rows.",
      );
  }
  // Fixed database-allocated row slots make retries safe even after a write timeout.
  // RAW preserves phone prefixes and prevents attendee input becoming a formula.
  await request("/values:batchUpdate", "POST", {
    valueInputOption: "RAW",
    data: targets.map((t) => ({
      range: `${t.tab}!A${t.row}`,
      values: [t.values],
    })),
  });
};
