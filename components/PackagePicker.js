"use client";

import Link from "next/link";
import { useState } from "react";

export default function PackagePicker({ slug, name, platformMark, platformName, packages, popular, includes }) {
  const initial = packages.find((pack) => pack.quantity === popular) || packages[0];
  const [selected, setSelected] = useState(initial.quantity);
  const current = packages.find((pack) => pack.quantity === selected) || initial;

  return (
    <div className="package-picker">
      <div className="package-options" role="radiogroup" aria-label={`${name} packages`}>
        {packages.map((pack) => {
          const active = pack.quantity === current.quantity;
          return (
            <button
              type="button"
              role="radio"
              aria-checked={active}
              className={active ? "package-option active" : "package-option"}
              key={pack.quantity}
              onClick={() => setSelected(pack.quantity)}
            >
              {pack.quantity === popular && <em>Most chosen</em>}
              <strong>{pack.quantity}</strong>
              <small>{name}</small>
              <b>{pack.price}</b>
            </button>
          );
        })}
      </div>
      <aside className="package-summary" aria-live="polite">
        <span className="package-summary-label">{platformMark} {platformName} · Selected package</span>
        <div className="package-summary-main">
          <strong>{current.quantity}</strong>
          <span>{name}</span>
        </div>
        <div className="package-summary-price">{current.price}<small> USD</small></div>
        <ul>{includes.map((item) => <li key={item}>{item}</li>)}</ul>
        <Link className="button" href={`/cart?service=${slug}&package=${encodeURIComponent(current.quantity)}`}>
          Add to cart <span>↗</span>
        </Link>
      </aside>
    </div>
  );
}
