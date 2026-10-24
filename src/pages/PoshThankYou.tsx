import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBooking } from "@/lib/razorpay";
import { bodyFont, headingFont } from "@/components/posh/constants";
import Logo from "@/components/Logo";

const PoshThankYou = () => {
  const [started] = useState(Date.now);
  const [polling, setPolling] = useState(true);
  const query = useQuery({
    queryKey: ["posh-booking"],
    queryFn: ({ signal }) => getBooking(signal),
    retry: 2,
    staleTime: 0,
    refetchInterval: (q) =>
      polling && q.state.data?.booking?.status === "awaiting_payment"
        ? 3000
        : false,
  });
  useEffect(() => {
    const timer = setTimeout(() => setPolling(false), 60000);
    return () => clearTimeout(timer);
  }, [started]);
  useEffect(() => {
    const previous = document.title;
    document.title = "Your POSH registration | MpowHR";
    return () => {
      document.title = previous;
    };
  }, []);
  const booking = query.data?.booking;
  const paid = booking?.status === "paid";
  const title = query.isPending
    ? "Checking your registration…"
    : query.isError
      ? "We couldn’t check your registration"
      : !booking
        ? "No registration found"
        : paid
          ? "Thank you, your registration was successful"
          : booking.status === "refunded"
            ? "Your payment has been refunded"
            : booking.status === "payment_review"
              ? "Your payment needs a review"
              : "We’re confirming your payment";
  return (
    <div
      className="theme-corporate min-h-screen bg-secondary/30 px-5 py-8 text-foreground sm:py-14"
      style={bodyFont}
    >
      <div className="mx-auto max-w-2xl">
        <Link to="/posh" aria-label="MpowHR workshop">
          <Logo />
        </Link>
        <main className="mt-10 border-t-4 border-[#D4AF37] bg-white p-6 shadow-lg sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6914]">
            POSH live workshop
          </p>
          {paid ? (
            <CheckCircle2
              className="mt-7 h-12 w-12 text-primary"
              aria-hidden="true"
            />
          ) : query.isFetching ? (
            <Loader2
              className="mt-7 h-10 w-10 animate-spin text-primary motion-reduce:animate-none"
              aria-hidden="true"
            />
          ) : null}
          <h1
            aria-live="polite"
            className="mt-5 text-3xl font-bold leading-tight sm:text-4xl"
            style={headingFont}
          >
            {title}
          </h1>
          {paid ? (
            <>
              <p className="mt-4 leading-relaxed text-slate-600">
                Your {booking.seats === 1 ? "seat is" : "seats are"} confirmed.
                Join our WhatsApp community for workshop joining details and
                updates.
              </p>
              <dl className="my-7 space-y-4 border-y border-slate-200 py-5 text-sm">
                <div>
                  <dt className="text-slate-500">Booking reference</dt>
                  <dd className="mt-1 break-all font-medium">{booking.id}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">People registered</dt>
                  <dd>{booking.seats}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Amount paid</dt>
                  <dd>
                    ₹{((booking.amount ?? 0) / 100).toLocaleString("en-IN")}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Attendees</dt>
                  <dd className="mt-1">
                    {booking.attendees.map((a) => a.name).join(", ")}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Payment ID</dt>
                  <dd className="mt-1 break-all">{booking.paymentId}</dd>
                </div>
              </dl>
              {booking.communityUrl ? (
                <Button
                  asChild
                  className="min-h-12 w-full bg-primary text-primary-foreground"
                >
                  <a
                    href={booking.communityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Join community
                  </a>
                </Button>
              ) : (
                <>
                  <Button disabled className="min-h-12 w-full">
                    <MessageCircle className="h-5 w-5" />
                    Join community
                  </Button>
                  <p className="mt-3 text-sm text-slate-600">
                    The community invite will be available here soon. We’ll
                    share joining details with you separately.
                  </p>
                </>
              )}
            </>
          ) : (
            <>
              <p className="mt-4 leading-relaxed text-slate-600">
                {query.isError
                  ? "Please check your connection and try again."
                  : !booking
                    ? "Return to the workshop page to start your registration."
                    : booking.status === "payment_review"
                      ? "We have recorded your payment. Please contact compliance@empire.com with your booking reference so we can resolve it."
                      : booking.status === "refunded"
                        ? "Please contact compliance@empire.com if you have questions about this booking."
                        : "Your details are saved. If payment was deducted, allow a moment for confirmation before attempting another payment."}
              </p>
              {booking && (
                <p className="mt-4 break-all text-sm">
                  Booking reference: {booking.id}
                </p>
              )}
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  onClick={() => query.refetch()}
                  disabled={query.isFetching}
                >
                  Check again
                </Button>
                <Button asChild variant="outline">
                  <Link to="/posh?booking=resume">Return to workshop</Link>
                </Button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};
export default PoshThankYou;
