import { test, expect, type Page } from "@playwright/test";
import type { BookingView } from "../../shared/posh";

test("frontend-only server explains that registration is unavailable", async ({
  page,
}) => {
  await page.goto("/posh?booking=resume");
  await expect(page.getByRole("alert")).toContainText(
    "Registration isn’t available on this server.",
  );
  await expect(page.getByRole("alert")).not.toContainText(
    "saved details are safe",
  );
});

const setup = async (
  page: Page,
  options: { dismiss?: boolean; pending?: boolean; offline?: boolean } = {},
) => {
  let booking: BookingView | null = null;
  let saves = 0;
  const amounts: number[] = [];
  await page.route("**/api/posh/registration", async (route) => {
    const request = route.request();
    if (request.method() === "GET") return route.fulfill({ json: { booking } });
    if (options.offline && saves++ === 0)
      return route.fulfill({
        status: 503,
        json: { error: "Please try again. Your details are saved." },
      });
    const data = request.postDataJSON();
    if (request.method() === "POST")
      booking = {
        ...data,
        id: "test-booking",
        audience: null,
        seats: null,
        status: "draft",
        amount: null,
        paymentId: null,
        attendees: [],
        communityUrl: null,
        hasPendingOrder: false,
      };
    else if (booking && data.step === "audience")
      booking.audience = data.audience;
    else if (booking && data.step === "selection") {
      booking.seats = data.selection.seats;
      booking.amount = booking.seats === 1 ? 79900 : 149900;
      booking.attendees = [
        {
          name: booking.name,
          email: booking.email,
          phone: booking.phone,
          audience: booking.audience,
        },
        ...(data.selection.secondAttendee
          ? [data.selection.secondAttendee]
          : []),
      ];
    }
    return route.fulfill({ json: { saved: true, id: booking?.id } });
  });
  await page.route("**/api/razorpay/order", async (route) => {
    if (!booking) throw new Error("No saved registration");
    amounts.push(booking.amount!);
    booking.status = "awaiting_payment";
    booking.hasPendingOrder = true;
    await route.fulfill({
      json: {
        keyId: "fixture",
        orderId: "order_Test",
        amount: booking.amount,
        currency: "INR",
        seats: booking.seats,
        prefill: {
          name: booking.name,
          email: booking.email,
          contact: booking.phone,
        },
      },
    });
  });
  await page.route("**/api/razorpay/verify", async (route) => {
    if (!booking) throw new Error("No registration");
    if (!options.pending) {
      booking.status = "paid";
      booking.paymentId = "pay_Test";
      booking.hasPendingOrder = false;
      booking.communityUrl = "https://chat.whatsapp.com/fixture";
    }
    await route.fulfill({
      status: options.pending ? 202 : 200,
      json: { verified: !options.pending },
    });
  });
  await page.route("https://checkout.razorpay.com/v1/checkout.js", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: `window.Razorpay=class {constructor(options){this.options=options;}open(){setTimeout(()=>${options.dismiss ? "this.options.modal.ondismiss()" : "this.options.handler({razorpay_order_id:'order_Test',razorpay_payment_id:'pay_Test',razorpay_signature:'fixture'})"},50);}};`,
    }),
  );
  return { amounts };
};
const details = async (page: Page) => {
  await page.locator("#primary-name").fill("Anne Test");
  await page.locator("#primary-email").fill("anne@example.test");
  await page.locator("#primary-phone").fill("+919876543210");
  await page.getByRole("button", { name: "Save and continue" }).click();
  await page.getByRole("radio", { name: "Team leaders", exact: true }).check();
  await page.getByRole("button", { name: "Save and continue" }).click();
};

test("registration saves details, captures two attendees, charges the fixed total and survives refresh", async ({
  page,
}, info) => {
  const { amounts } = await setup(page);
  await page.goto("/posh");
  await page
    .getByRole("link", { name: "Secure your seat", exact: true })
    .filter({ visible: true })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await details(page);
  await page.getByRole("radio", { name: "Two people" }).check();
  await page.locator("#second-name").fill("Second Attendee");
  await page.locator("#second-email").fill("second@example.test");
  await page.locator("#second-phone").fill("+919876543211");
  await page.getByRole("radio", { name: "Students", exact: true }).check();
  await expect(page.getByRole("button", { name: "Pay ₹1,499" })).toBeVisible();
  await page.screenshot({
    path: `test-results/${info.project.name}-booking.png`,
  });
  await page.getByRole("button", { name: "Pay ₹1,499" }).click();
  await expect(page).toHaveURL(/\/posh\/thank-you$/);
  await expect(
    page.getByRole("heading", {
      name: "Thank you, your registration was successful",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Join community" }),
  ).toHaveAttribute("href", "https://chat.whatsapp.com/fixture");
  expect(amounts).toEqual([149900]);
  await page.reload();
  await expect(page.getByText("Anne Test, Second Attendee")).toBeVisible();
  await page.screenshot({
    path: `test-results/${info.project.name}-thank-you.png`,
  });
});
test("one-person booking charges ₹799 and shows confirmation", async ({
  page,
}) => {
  const { amounts } = await setup(page);
  await page.goto("/posh?booking=resume");
  await details(page);
  await page.getByRole("button", { name: "Pay ₹799" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Thank you, your registration was successful",
    }),
  ).toBeVisible();
  expect(amounts).toEqual([79900]);
});
test("contact save failure preserves inputs and allows retry", async ({
  page,
}) => {
  await setup(page, { offline: true });
  await page.goto("/posh?booking=resume");
  await page.locator("#primary-name").fill("Anne Test");
  await page.locator("#primary-email").fill("anne@example.test");
  await page.locator("#primary-phone").fill("+919876543210");
  await page.getByRole("button", { name: "Save and continue" }).click();
  await expect(page.getByRole("alert")).toContainText("Please try again");
  await expect(page.locator("#primary-email")).toHaveValue("anne@example.test");
  await page.getByRole("button", { name: "Save and continue" }).click();
  await expect(
    page.getByRole("radio", { name: "Top management" }),
  ).toBeVisible();
});
test("dismissing checkout preserves the booking and offers a resume", async ({
  page,
}) => {
  await setup(page, { dismiss: true });
  await page.goto("/posh?booking=resume");
  await details(page);
  await page.getByRole("button", { name: "Pay ₹799" }).click();
  await expect(
    page.getByRole("button", { name: "Resume payment · ₹799" }),
  ).toBeVisible();
  await expect(page.getByRole("alert")).toContainText("Payment window closed");
});
test("unverified payment shows pending rather than success", async ({
  page,
}) => {
  await setup(page, { pending: true });
  await page.goto("/posh?booking=resume");
  await details(page);
  await page.getByRole("button", { name: "Pay ₹799" }).click();
  await expect(
    page.getByRole("heading", { name: "We’re confirming your payment" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Join community" })).toHaveCount(
    0,
  );
});
test("visiting thank-you directly without a session cannot show success", async ({
  page,
}) => {
  await setup(page);
  await page.goto("/posh/thank-you");
  await expect(
    page.getByRole("heading", { name: "No registration found" }),
  ).toBeVisible();
});
