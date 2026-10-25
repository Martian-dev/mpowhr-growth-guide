import { z } from "zod";
import { allowRequest, requireSession } from "../../server/posh/db.js";
import {
  errorResponse,
  HttpError,
  json,
  readBody,
  sameOrigin,
  sessionToken,
} from "../../server/posh/http.js";
import { verifyCheckout } from "../../server/posh/payments.js";
import {
  scheduleSync,
  scheduleConfirmation,
} from "../../server/posh/maintenance.js";
const schema = z
  .object({
    razorpay_order_id: z.string().regex(/^order_[a-zA-Z0-9]+$/),
    razorpay_payment_id: z.string().regex(/^pay_[a-zA-Z0-9]+$/),
    razorpay_signature: z.string().regex(/^[a-fA-F0-9]{64}$/),
  })
  .strict();
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    await allowRequest(request, "verification", 30);
    const booking = await requireSession(sessionToken(request));
    const parsed = schema.safeParse(await readBody(request));
    if (!parsed.success) throw new HttpError(400, "Invalid payment response.");
    const confirmed = await verifyCheckout(booking, parsed.data);
    if (confirmed) scheduleConfirmation(confirmed);
    scheduleSync();
    return json(
      {
        verified: confirmed?.status === "paid",
        status: confirmed?.status ?? "pending",
      },
      confirmed ? 200 : 202,
    );
  } catch (error) {
    return errorResponse(error);
  }
}
