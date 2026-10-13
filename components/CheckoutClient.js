"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CART_EVENT, cartTotal, money, readCart } from "@/lib/cart";

export default function CheckoutClient() {
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const refresh = () => {
      setCart(readCart());
      setReady(true);
    };
    refresh();
    window.addEventListener(CART_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(CART_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  if (!ready) return <div className="cart-loading">Loading checkout…</div>;
  if (!cart.length) {
    return (
      <div className="empty-cart">
        <span>◇</span><h2>Your cart is empty</h2><p>Add a package before opening checkout.</p>
        <Link className="button" href="/services">Choose a service <span>↗</span></Link>
      </div>
    );
  }

  return (
    <div className="checkout-layout">
      <form className="checkout-form" onSubmit={(event) => event.preventDefault()}>
        <div className="checkout-section-head"><span>01</span><div><h2>Contact information</h2><p>Used for the future order confirmation and support.</p></div></div>
        <div className="form-grid">
          <label><span>Full name</span><input required autoComplete="name" placeholder="Your name" /></label>
          <label><span>Email address</span><input required type="email" autoComplete="email" placeholder="you@example.com" /></label>
        </div>

        <div className="checkout-section-head"><span>02</span><div><h2>Public destinations</h2><p>Enter one exact public profile or content destination for each package.</p></div></div>
        <div className="destination-list">
          {cart.map((item) => (
            <label key={item.key}>
              <span>{item.name} · {item.package}</span>
              <input required placeholder={item.target.charAt(0).toUpperCase() + item.target.slice(1)} />
              <small>Never enter a password, recovery code or private login detail.</small>
            </label>
          ))}
        </div>

        <label className="form-check"><input required type="checkbox"/><span>I confirm these destinations are public and I am authorized to promote them.</span></label>

        <div className="checkout-section-head"><span>03</span><div><h2>Payment</h2><p>The checkout layout is ready for gateway integration.</p></div></div>
        <div className="payment-placeholder">
          <div>!</div>
          <strong>Payment gateway abhi add nahi kiya gaya</strong>
          <p>Card, wallet or other payment fields will appear here after the gateway is connected. This preview cannot charge or submit an order.</p>
        </div>
        <button className="button checkout-disabled" type="button" disabled>Payment unavailable</button>
      </form>

      <aside className="checkout-summary">
        <span className="kicker">Your order</span>
        {cart.map((item) => <div className="checkout-line" key={item.key}><span>{item.name}<small>{item.package} × {item.count}</small></span><b>{money(Number(item.price.replace("$", "")) * item.count)}</b></div>)}
        <div className="checkout-total"><span>Total</span><strong>{money(cartTotal(cart))} <small>USD</small></strong></div>
        <Link className="text-link" href="/cart">← Edit cart</Link>
      </aside>
    </div>
  );
}

