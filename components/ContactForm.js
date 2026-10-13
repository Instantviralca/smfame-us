"use client";
import { useState } from "react";

// No backend is connected yet, so the form prepares an email in the visitor's
// own mail app instead of pretending the message was sent.
export default function ContactForm({ email }) {
  const [opened, setOpened] = useState(false);

  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const topic = data.get("topic") || "Support request";
    const orderId = data.get("order");
    const subject = `${topic}${orderId ? ` — ${orderId}` : ""}`;
    const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nTopic: ${topic}\nOrder ID: ${orderId || "-"}\n\n${data.get("message")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-grid">
        <label><span>Name</span><input name="name" required placeholder="Your name" autoComplete="name" /></label>
        <label><span>Email</span><input name="email" required type="email" placeholder="you@example.com" autoComplete="email" /></label>
      </div>
      <label><span>What can we help with?</span><select name="topic" defaultValue=""><option value="" disabled>Select a topic</option><option>Choosing a service</option><option>Existing order</option><option>Refill request</option><option>Refund request</option><option>Billing question</option><option>Agency partnership</option></select></label>
      <label><span>Order ID <small>(optional)</small></span><input name="order" placeholder="SMF-000000" /></label>
      <label><span>Message</span><textarea name="message" required rows="6" placeholder="Tell us what happened or what you are trying to achieve."></textarea></label>
      <button className="button button-dark" type="submit">Send message <span>↗</span></button>
      {opened && <p className="contact-note" role="status">Your email app should open with the message ready to send. If it doesn’t, email us at <a href={`mailto:${email}`}>{email}</a>.</p>}
    </form>
  );
}
