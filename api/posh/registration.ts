import { z } from "zod";
import {
  audienceSchema,
  contactSchema,
  selectionSchema,
  type BookingView,
} from "../../shared/posh";
import {
  allowRequest,
  attendeesFor,
  findSession,
  ordersFor,
  requireSession,
  saveAudience,
  saveContact,
  saveSelection,
} from "../../server/posh/db";
import {
  cookie,
  errorResponse,
  HttpError,
  json,
  newToken,
  readBody,
  sameOrigin,
  sessionToken,
} from "../../server/posh/http";
import { reconcileBooking } from "../../server/posh/payments";
import {
  scheduleSync,
  scheduleConfirmation,
} from "../../server/posh/maintenance";

const communityUrl = () => {
  try {
    const u = new URL(process.env.POSH_COMMUNITY_URL ?? "");
    return u.protocol === "https:" && u.hostname === "chat.whatsapp.com"
      ? u.href
      : null;
  } catch {
    return null;
  }
};
export async function GET(request: Request) {
  try {
    let booking = await findSession(sessionToken(request));
    if (!booking) return json({ booking: null });
    if (booking.status === "awaiting_payment") {
      await reconcileBooking(booking.id).catch(() => {});
      booking = await requireSession(sessionToken(request));
    }
    const attendees = await attendeesFor(booking.id);
    scheduleConfirmation(booking);
    const orders = await ordersFor(booking.id);
    const view: BookingView = {
      id: booking.id,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      audience: booking.audience,
      seats: booking.seats,
      status: booking.status,
      amount: booking.expected_amount,
      paymentId: booking.razorpay_payment_id,
      attendees: attendees.map((a) => ({
        name: a.name,
        email: a.email,
        phone: a.phone,
        audience: a.audience,
      })),
      communityUrl: booking.status === "paid" ? communityUrl() : null,
      hasPendingOrder: orders.some(
        (o) =>
          ["creating", "unknown", "created"].includes(o.status) &&
          new Date(o.expires_at) > new Date(),
      ),
    };
    scheduleSync();
    return json({ booking: view });
  } catch (error) {
    return errorResponse(error);
  }
}
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    await allowRequest(request, "registration");
    const parsed = contactSchema.safeParse(await readBody(request));
    if (!parsed.success)
      throw new HttpError(400, parsed.error.issues[0].message);
    const previous = sessionToken(request);
    const token =
      previous && (await findSession(previous)) ? previous : newToken();
    const booking = await saveContact(token, parsed.data);
    scheduleSync();
    return json({ id: booking.id }, 200, {
      "Set-Cookie": cookie(request, token),
    });
  } catch (error) {
    return errorResponse(error);
  }
}
const patchSchema = z.union([
  z.object({ step: z.literal("audience"), audience: audienceSchema }).strict(),
  z
    .object({ step: z.literal("selection"), selection: selectionSchema })
    .strict(),
]);
export async function PATCH(request: Request) {
  try {
    sameOrigin(request);
    await allowRequest(request, "registration");
    const booking = await requireSession(sessionToken(request));
    const parsed = patchSchema.safeParse(await readBody(request));
    if (!parsed.success)
      throw new HttpError(
        400,
        "Please complete all required attendee details and select a valid classification.",
      );
    if (parsed.data.step === "audience")
      await saveAudience(booking.id, parsed.data.audience);
    else await saveSelection(booking.id, parsed.data.selection);
    scheduleSync();
    return json({ saved: true });
  } catch (error) {
    return errorResponse(error);
  }
}
