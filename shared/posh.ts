import { z } from "zod";

export const AUDIENCES = [
  "Top management",
  "Corporate professionals",
  "Business owners",
  "Team leaders",
  "Students",
] as const;
export const PLANS = [
  { seats: 1, amount: 79900, price: "₹799", label: "for 1" },
  { seats: 2, amount: 149900, price: "₹1,499", label: "for 2" },
] as const;
export const contactSchema = z
  .object({
    name: z.string().trim().min(1, "Enter your name").max(100),
    email: z
      .string()
      .trim()
      .email("Enter a valid email")
      .max(254)
      .transform((v) => v.toLowerCase()),
    phone: z
      .string()
      .trim()
      .max(25)
      .transform((v) => v.replace(/[\s()-]/g, ""))
      .pipe(
        z
          .string()
          .regex(
            /^\+?[1-9]\d{9,14}$/,
            "Enter a valid phone number with country code",
          ),
      ),
  })
  .strict();
export const audienceSchema = z.enum(AUDIENCES);
export const attendeeSchema = contactSchema.extend({
  audience: audienceSchema,
});
export const selectionSchema = z
  .object({
    seats: z.union([z.literal(1), z.literal(2)]),
    secondAttendee: attendeeSchema.optional(),
  })
  .strict()
  .superRefine((v, ctx) => {
    if (v.seats === 2 && !v.secondAttendee)
      ctx.addIssue({
        code: "custom",
        message: "Enter the second attendee’s details",
        path: ["secondAttendee"],
      });
    if (v.seats === 1 && v.secondAttendee)
      ctx.addIssue({
        code: "custom",
        message: "Select two seats for a second attendee",
        path: ["secondAttendee"],
      });
  });
export type ContactDetails = z.infer<typeof contactSchema>;
export type AttendeeDetails = z.infer<typeof attendeeSchema>;
export type Selection = z.infer<typeof selectionSchema>;
export type BookingStatus =
  | "draft"
  | "awaiting_payment"
  | "paid"
  | "refunded"
  | "payment_review"
  | "created"
  | "failed"
  | "cancelled";
export type BookingView = ContactDetails & {
  id: string;
  audience: (typeof AUDIENCES)[number] | null;
  seats: 1 | 2 | null;
  status: BookingStatus;
  amount: number | null;
  paymentId: string | null;
  attendees: (ContactDetails & {
    audience: (typeof AUDIENCES)[number] | null;
  })[];
  communityUrl: string | null;
  hasPendingOrder: boolean;
};
