"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CART_EVENT, readCart } from "@/lib/cart";

export default function CartLink({ compact = false, onClick }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const refresh = () => setCount(readCart().reduce((total, item) => total + item.count, 0));
    refresh();
    window.addEventListener(CART_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(CART_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <Link className={`cart-link ${compact ? "cart-link-compact" : ""}`} href="/cart" onClick={onClick} aria-label={`Cart with ${count} item${count === 1 ? "" : "s"}`}>
      <span aria-hidden="true">◇</span>
      {!compact && <b>Cart</b>}
      <em>{count}</em>
    </Link>
  );
}

