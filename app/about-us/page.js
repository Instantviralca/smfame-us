import Image from "next/image";
import { business, cityLine } from "@/lib/business";
import Link from "next/link";
import TrustStrip from "@/components/TrustStrip";

export const metadata = { title: { absolute: "About SmFame | Social Media Growth for US Creators" }, description: "Learn how SmFame is building simpler, more transparent social media growth services for the United States.", alternates: { canonical: "/about-us/" } };

const audiences = [
  { number: "01", title: "Creators building a recognizable profile", text: "A clearer way to support important posts, profile milestones, launches and live sessions without handing over private account access." },
  { number: "02", title: "Businesses promoting specific campaigns", text: "Straightforward packages for product content, announcements and public Pages—with prices shown in USD before checkout." },
  { number: "03", title: "Agencies managing repeatable workflows", text: "Focused service pages, predictable order details and public-link requirements that are easier to explain to a team or client." },
];

const principles = [
  { number: "01", title: "Clarity over hype", text: "Plain-language packages and realistic expectations. We explain what a service changes and what it cannot promise." },
  { number: "02", title: "Privacy by default", text: "A public username or content URL is enough. Passwords, recovery codes and private account access stay with you." },
  { number: "03", title: "Fit before size", text: "The largest quantity is not automatically the right choice. We encourage packages that make sense beside the current baseline." },
  { number: "04", title: "Support with context", text: "Useful help should continue after checkout. Clear destinations and order references make questions easier to resolve." },
];

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About SmFame",
    url: "https://smfame.us/about-us/",
    description: "How SmFame approaches transparent social media growth services for US creators, businesses and agencies.",
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

    <section className="about-hero-v2">
      <div className="about-hero-glow"></div>
      <div className="shell about-hero-layout">
        <div className="about-hero-copy">
          <span className="eyebrow"><span>✦</span> About SmFame</span>
          <h1>A clearer way to plan <em>social growth.</em></h1>
          <p>SmFame helps US creators, businesses and agencies compare focused TikTok, Instagram and Facebook packages without confusing pricing or private account access.</p>
          <div className="hero-actions"><Link href="/services" className="button">Explore services <span>↗</span></Link><Link href="/contact-us" className="button button-ghost-dark">Talk to support</Link></div>
          <div className="about-hero-proof"><span><b>20</b> focused services</span><span><b>3</b> social platforms</span><span><b>0</b> passwords requested</span></div>
        </div>
        <div className="about-workflow-card">
          <div className="about-workflow-head"><span>How the experience works</span><b>Clear by design</b></div>
          <h2>From campaign idea to a reviewable order.</h2>
          <div className="about-workflow-steps">
            <div><span>01</span><p><b>Choose the signal</b><small>Followers, views, likes, comments or another focused option.</small></p></div>
            <div><span>02</span><p><b>Check the public destination</b><small>Use the correct username, Page, post, Reel or video URL.</small></p></div>
            <div><span>03</span><p><b>Select a measured package</b><small>Compare the quantity with the account's current baseline.</small></p></div>
          </div>
          <div className="about-workflow-foot"><span>USD pricing</span><span>Public links only</span><span>Support available</span></div>
        </div>
      </div>
    </section>

    <TrustStrip />

    <section className="section shell about-story-v2">
      <div className="about-story-heading"><span className="kicker">Why we built SmFame</span><h2>Social growth is noisy. The buying experience does not have to be.</h2></div>
      <div className="about-story-body"><p>Too many growth sites make simple decisions feel uncertain. Services are mixed together, package differences are unexplained and important limits appear only after checkout. SmFame was designed around a more useful starting point: show the customer exactly what the service supports, where it goes and how much it costs.</p><p>Our catalog is organized by platform and outcome. Each detail page explains the required public destination, package options, practical preparation and realistic expectations. That structure helps a first-time creator and a busy agency evaluate the same service without needing to decode a generic dashboard.</p><div className="about-quote"><span>Our standard</span><strong>Make the next step obvious, and keep private credentials out of it.</strong></div></div>
    </section>

    <section className="section about-audience-section">
      <div className="shell">
        <div className="section-head split-head"><div><span className="kicker">Who we built it for</span><h2>Different campaigns, one clearer workflow</h2></div><p>SmFame is designed for people who know the content or profile they want to support and need an easier way to compare the available options.</p></div>
        <div className="about-audience-grid">{audiences.map((audience) => <article key={audience.number}><span>{audience.number}</span><h3>{audience.title}</h3><p>{audience.text}</p></article>)}</div>
      </div>
    </section>

    <section className="section values-section about-values-v2">
      <div className="shell">
        <div className="section-head split-head"><div><span className="kicker light">What guides us</span><h2>Principles that shape every service page</h2></div><p>Useful social growth support begins with honest scope, understandable choices and responsible account handling.</p></div>
        <div className="about-principles-grid">{principles.map((principle) => <article key={principle.number}><span>{principle.number}</span><h3>{principle.title}</h3><p>{principle.text}</p></article>)}</div>
      </div>
    </section>

    <section className="section shell about-expectations">
      <div className="section-head centered"><span className="kicker">Clear expectations</span><h2>What SmFame supports—and what still depends on your content</h2><p>Visible signals can support a campaign, but they are only one part of the result.</p></div>
      <div className="about-expectation-grid">
        <article><span className="about-expectation-icon">✓</span><h3>What the package provides</h3><ul><li>The selected public signal and listed quantity</li><li>A clear destination requirement</li><li>USD pricing before checkout</li><li>Order context for support</li></ul></article>
        <article className="organic"><span className="about-expectation-icon">↗</span><h3>What remains organic</h3><ul><li>Watch time and audience retention</li><li>Platform recommendation or search position</li><li>Real comments, messages and community trust</li><li>Leads, customers and revenue</li></ul></article>
      </div>
    </section>

    <section className="section shell about-company">
      <div className="section-head split-head"><div><span className="kicker">Company details</span><h2>Who you are buying from</h2></div><p>SmFame has run smfame.us for US creators and businesses for several years. These are the details we stand behind on every order.</p></div>
      <figure className="platform-guide-figure">
        <Image src="/guides/are-social-media-growth-services-safe.webp" alt="SmFame orders use a public link only — no password or account access" width={1672} height={941} sizes="(max-width: 900px) 100vw, 1100px" />
      </figure>
      <div className="about-company-grid">
        <div><span>Business</span><b>{business.legalName || business.name}</b><p>Based in {cityLine()}, United States</p></div>
        <div><span>Support</span><b><a href={`mailto:${business.email}`}>{business.email}</a></b><p>{business.phone ? <>Phone <a href={`tel:${business.phoneE164}`}>{business.phone}</a> · </> : null}{business.supportResponse}</p></div>
        <div><span>Start guarantee</span><b>{business.refundIfNotStartedHours} hours</b><p>Full refund if delivery has not started within {business.refundIfNotStartedHours} hours of purchase.</p></div>
        <div><span>Follower replacement</span><b>{business.refillDays} days</b><p>Dropped followers replaced free, up to {business.refillMaxQuantity.toLocaleString("en-US")} per order.</p></div>
      </div>
    </section>

    <section className="section shell">
      <div className="cta-panel about-cta"><div><span className="kicker light">Start with the right fit</span><h2>Choose the platform and signal closest to your next goal.</h2><p>Compare all 20 services or ask a question before you decide.</p></div><div className="about-cta-actions"><Link className="button button-white" href="/services">Browse services <span>↗</span></Link><Link className="about-cta-link" href="/contact-us">Contact support</Link></div></div>
    </section>
  </>;
}
