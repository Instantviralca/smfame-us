"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { services, getService } from "@/lib/services";

export default function OrderForm() {
  const searchParams = useSearchParams();
  const initialService = getService(searchParams.get("service")) || services[0];
  const [serviceSlug, setServiceSlug] = useState(initialService.slug);
  const [packageValue, setPackageValue] = useState(searchParams.get("package") || initialService.packages[0].quantity);
  const [sent, setSent] = useState(false);
  const service = useMemo(() => getService(serviceSlug), [serviceSlug]);

  function onServiceChange(value) {
    const next = getService(value);
    setServiceSlug(value);
    setPackageValue(next.packages[0].quantity);
  }

  function submit(event) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return <div className="order-success"><div>✓</div><span>Request received</span><h2>Your {service.name} order is ready for checkout integration.</h2><p>This preview currently captures the full order journey. Connect your payment gateway and order API before production launch.</p><button className="button" onClick={() => setSent(false)}>Place another order</button></div>;
  }

  const selected = service.packages.find((pack) => pack.quantity === packageValue) || service.packages[0];
  return (
    <form className="order-form" onSubmit={submit}>
      <div className="form-grid">
        <label><span>Service</span><select value={serviceSlug} onChange={(e) => onServiceChange(e.target.value)}>{services.map((item) => <option value={item.slug} key={item.slug}>{item.name}</option>)}</select></label>
        <label><span>Package</span><select value={packageValue} onChange={(e) => setPackageValue(e.target.value)}>{service.packages.map((pack) => <option value={pack.quantity} key={pack.quantity}>{pack.quantity} — {pack.price}</option>)}</select></label>
      </div>
      <label><span>{service.target.charAt(0).toUpperCase() + service.target.slice(1)}</span><input required placeholder={service.platform === "tiktok" ? "https://tiktok.com/@yourname" : `https://${service.platform}.com/yourname`} /></label>
      <div className="form-grid">
        <label><span>Email address</span><input required type="email" placeholder="you@example.com" /></label>
        <label><span>Full name</span><input required placeholder="Your name" /></label>
      </div>
      <label className="form-check"><input required type="checkbox"/><span>I confirm that the profile or content is public and I am authorized to promote it.</span></label>
      <div className="order-total"><div><span>Order total</span><strong>{selected.price} <small>USD</small></strong></div><button className="button" type="submit">Continue securely <span>↗</span></button></div>
    </form>
  );
}
