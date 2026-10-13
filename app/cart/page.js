import { Suspense } from "react";
import CartClient from "@/components/CartClient";

export const metadata = {
  title: "Your Cart",
  description: "Review the social media growth packages in your SmFame cart.",
  alternates: { canonical: "/cart/" },
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <section className="commerce-page">
      <div className="shell">
        <div className="commerce-heading"><span className="eyebrow"><span>◇</span> Your cart</span><h1>Review your <em>packages.</em></h1><p>Adjust package quantities, check the USD total and continue when everything looks right.</p></div>
        <Suspense fallback={<div className="cart-loading">Loading your cart…</div>}><CartClient /></Suspense>
      </div>
    </section>
  );
}

