"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { addPackageToCart, cartTotal, money, readCart, writeCart } from "@/lib/cart";

export default function CartClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const service = searchParams.get("service");
    const packageName = searchParams.get("package");
    const next = service && packageName ? addPackageToCart(service, packageName) : readCart();
    setCart(next);
    setReady(true);
    if (service || packageName) router.replace("/cart", { scroll: false });
  }, [router, searchParams]);

  function updateCount(key, count) {
    const next = writeCart(cart.map((item) => item.key === key ? { ...item, count } : item));
    setCart(next);
  }

  function removeItem(key) {
    setCart(writeCart(cart.filter((item) => item.key !== key)));
  }

  if (!ready) return <div className="cart-loading">Loading your cart…</div>;

  if (!cart.length) {
    return (
      <div className="empty-cart">
        <span>◇</span>
        <h2>Your cart is empty</h2>
        <p>Choose a package from any TikTok, Instagram or Facebook service page.</p>
        <Link className="button" href="/services">Browse services <span>↗</span></Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div className="cart-items">
        {cart.map((item) => (
          <article className="cart-item" key={item.key}>
            <div className={`cart-platform ${item.platform}`}>{item.platform === "tiktok" ? "♪" : item.platform === "instagram" ? "◎" : "f"}</div>
            <div className="cart-item-copy">
              <span>{item.platform} service</span>
              <h2>{item.name}</h2>
              <p>{item.package} · {item.price} USD per package</p>
            </div>
            <div className="cart-quantity" aria-label={`Quantity for ${item.name}`}>
              <button type="button" onClick={() => updateCount(item.key, Math.max(1, item.count - 1))} aria-label="Decrease quantity">−</button>
              <strong>{item.count}</strong>
              <button type="button" onClick={() => updateCount(item.key, Math.min(10, item.count + 1))} aria-label="Increase quantity">+</button>
            </div>
            <strong className="cart-line-total">{money(Number(item.price.replace("$", "")) * item.count)}</strong>
            <button className="cart-remove" type="button" onClick={() => removeItem(item.key)}>Remove</button>
          </article>
        ))}
        <Link className="text-link" href="/services">← Continue shopping</Link>
      </div>
      <aside className="cart-summary">
        <span className="kicker">Order summary</span>
        <div><span>Packages</span><b>{cart.reduce((total, item) => total + item.count, 0)}</b></div>
        <div><span>Subtotal</span><b>{money(cartTotal(cart))} USD</b></div>
        <div><span>Taxes</span><b>Calculated later</b></div>
        <div className="cart-total"><span>Total</span><strong>{money(cartTotal(cart))} <small>USD</small></strong></div>
        <Link className="button" href="/checkout">Continue to checkout <span>↗</span></Link>
        <p>No social media password is required. You will review each public destination at checkout.</p>
      </aside>
    </div>
  );
}

