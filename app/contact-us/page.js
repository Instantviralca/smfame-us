import ContactForm from "@/components/ContactForm";
import { business, cityLine, organizationSchema } from "@/lib/business";

export const metadata = {
  title: "Contact SmFame Support",
  description: `Contact SmFame support at ${business.email} for help choosing a service, tracking an order, requesting a refill or resolving a billing question.`,
  alternates: { canonical: "/contact-us/" },
};

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: "https://smfame.us/contact-us/",
    name: "Contact SmFame Support",
    mainEntity: organizationSchema(),
  };
  return (
    <section className="page-hero contact-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="shell">
        <div className="contact-heading">
          <span className="eyebrow"><span>✦</span> Human support</span>
          <h1>Let’s sort it out.</h1>
          <p>Tell us what you need and include your order ID when possible. We will route your message to the right person.</p>
        </div>
        <div className="contact-direct">
          <a href={`mailto:${business.email}`}><span>Email</span><b>{business.email}</b></a>
          {business.phone && <a href={`tel:${business.phoneE164}`}><span>Phone</span><b>{business.phone}</b></a>}
          <div><span>Based in</span><b>{cityLine()}, USA</b></div>
        </div>
        <div className="contact-grid">
          <ContactForm email={business.email} />
          <aside>
            <div><span>Order support</span><h2>Already placed an order?</h2><p>Include the order ID, destination username and email used at checkout.</p></div>
            <div><span>Response time</span><h2>{business.supportResponse}</h2><p>Urgent delivery questions are prioritized when a valid order ID is included.</p></div>
            <div><span>Refunds &amp; refills</span><h2>{business.refundIfNotStartedHours}h start guarantee</h2><p>Full refund if delivery has not started within {business.refundIfNotStartedHours} hours. Dropped followers are replaced for {business.refillDays} days.</p></div>
            <div><span>Account safety</span><h2>Never send your password</h2><p>SmFame support will never ask for passwords, recovery codes or two-factor authentication codes.</p></div>
          </aside>
        </div>
      </div>
    </section>
  );
}
