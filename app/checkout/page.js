import CheckoutClient from "@/components/CheckoutClient";

export const metadata = {
  title: "Checkout",
  description: "Review your SmFame package destinations and checkout details.",
  alternates: { canonical: "/checkout/" },
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <section className="commerce-page checkout-page">
      <div className="shell">
        <div className="commerce-heading"><span className="eyebrow"><span>✓</span> Checkout</span><h1>Confirm the <em>details.</em></h1><p>Add only public social destinations. Your password is never needed.</p></div>
        <CheckoutClient />
      </div>
    </section>
  );
}

