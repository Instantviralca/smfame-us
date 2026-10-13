import LegalPage from "@/components/LegalPage";
import { business } from "@/lib/business";

const sections = [
  { title: "Orders that do not start", body: [`If delivery of your order has not started within ${business.refundIfNotStartedHours} hours of purchase and SmFame has not contacted you about the order, you can request a full refund.`, "Refunds are issued to the original payment method. Processing time after approval depends on the payment provider."] },
  { title: "Dropped followers", body: [`Follower packages (TikTok, Instagram and Facebook followers) include a ${business.refillDays}-day replacement guarantee. If followers drop within ${business.refillDays} days of delivery, SmFame replaces them free of charge, up to ${business.refillMaxQuantity.toLocaleString("en-US")} followers per order.`, "Keep the profile public and the username unchanged so the replacement can be delivered."] },
  { title: "Delivery shortfalls", body: ["If a verified part of an order is not delivered, SmFame completes the remaining quantity or refunds the undelivered part.", "Delays on an order that has already started are not by themselves eligible for a refund; contact support and the order will be reviewed."] },
  { title: "Incorrect information", body: ["Customers are responsible for submitting the correct, public profile or content URL. Orders sent to an incorrect destination supplied by the customer are not refundable once fulfillment has started.", "Do not make the account private, change the username or delete the content while delivery is in progress."] },
  { title: "Duplicate payments", body: ["Verified duplicate charges for the same order are refunded to the original payment method."] },
  { title: "How to request help", body: [`Email ${business.email} or use the contact page with the email address used at checkout. Include the order ID, service, destination and a short description of the issue.`, `${business.supportResponse}.`] },
];

export const metadata = { title: "Refund Policy", description: `SmFame refund policy: full refund if an order has not started within ${business.refundIfNotStartedHours} hours, ${business.refillDays}-day replacement for dropped followers and shortfall handling.`, alternates: { canonical: "/refund-policy/" } };
export default function Page() { return <LegalPage eyebrow="Customer care" title="Refund policy" updated="October 7, 2026" sections={sections}/>; }
