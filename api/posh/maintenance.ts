import { timingSafeEqual } from "node:crypto";
import { runMaintenance } from "../../server/posh/maintenance";
import { errorResponse, json } from "../../server/posh/http";
export const maxDuration = 120;
export async function GET(request: Request) {
  const expected = process.env.CRON_SECRET
    ? `Bearer ${process.env.CRON_SECRET}`
    : "";
  const received = request.headers.get("authorization") ?? "";
  if (
    !expected ||
    Buffer.byteLength(expected) !== Buffer.byteLength(received) ||
    !timingSafeEqual(Buffer.from(expected), Buffer.from(received))
  )
    return json({ error: "Unauthorized" }, 401);
  try {
    return json(await runMaintenance());
  } catch (error) {
    return errorResponse(error);
  }
}
