import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export const tokenHash = (token: string) =>
  createHash("sha256").update(token).digest("hex");
export const sessionToken = (request: Request) => {
  const value = request.headers
    .get("cookie")
    ?.split(";")
    .map((v) => v.trim())
    .find((v) => v.startsWith("posh_session="))
    ?.slice(13);
  return value && /^[a-f0-9]{64}$/.test(value) ? value : null;
};
export const newToken = () => randomBytes(32).toString("hex");
export const cookie = (request: Request, token: string) =>
  `posh_session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=2592000${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`;
export const sameOrigin = (request: Request) => {
  if (request.headers.get("origin") !== new URL(request.url).origin)
    throw new HttpError(403, "Please submit your booking from this website.");
};
export const readBody = async (request: Request) => {
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    throw new HttpError(415, "Send JSON data.");
  const raw = await request.text();
  if (raw.length > 10000) throw new HttpError(413, "Form data is too large.");
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    throw new HttpError(400, "Invalid form data.");
  }
};
export const json = (
  body: unknown,
  status = 200,
  headers: Record<string, string> = {},
) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
export const errorResponse = (error: unknown) => {
  if (error instanceof HttpError)
    return json({ error: error.message }, error.status);
  console.error(
    "POSH request failed",
    error instanceof Error ? error.name : "Unknown error",
  );
  return json(
    { error: "We couldn’t save your booking. Please try again." },
    503,
  );
};
export const signaturesMatch = (expected: string, actual: string) =>
  /^[a-f0-9]{64}$/i.test(actual) &&
  timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(actual, "hex"));
