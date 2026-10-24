import { allowRequest, requireSession } from "../../server/posh/db";
import {
  errorResponse,
  HttpError,
  json,
  readBody,
  sameOrigin,
  sessionToken,
} from "../../server/posh/http";
import { createCheckout } from "../../server/posh/payments";
import { scheduleSync } from "../../server/posh/maintenance";

export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const body = await readBody(request);
    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body) ||
      Object.keys(body).length
    )
      throw new HttpError(
        400,
        "Payment amounts and details are set from your saved registration.",
      );
    const booking = await requireSession(sessionToken(request));
    await allowRequest(
      request,
      "checkout",
      Number(process.env.POSH_ORDER_RATE_LIMIT) || 5,
    );
    const order = await createCheckout(booking.id);
    scheduleSync();
    return json(order);
  } catch (error) {
    return errorResponse(error);
  }
}
