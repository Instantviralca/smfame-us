import ServiceCard from "@/components/ServiceCard";
import { services, platformMeta, getServicesByPlatform } from "@/lib/services";

const serviceFaqs = [
  { q: "How are SmFame services organized?", a: "Services are grouped first by TikTok, Instagram or Facebook and then by the public signal they support. Every detail page explains the destination, package quantities, USD prices, preparation steps and realistic limits." },
  { q: "Should I choose followers, views or engagement?", a: "Followers relate to a profile or Page, views relate to video consumption, and likes, comments or shares relate to specific forms of visible engagement. Choose the metric tied most directly to your campaign goal." },
  { q: "Can I send a private profile or post?", a: "No. The selected username, profile, video, post, Story or LIVE destination must be publicly accessible for delivery. Check it while signed out before adding a package to the cart." },
  { q: "Is the largest package always best?", a: "No. Compare the quantity with the account's current size and normal content performance. A proportionate package is easier to measure and usually creates a more coherent campaign." },
  { q: "Do packages include a ranking or sales guarantee?", a: "No. A package supplies the selected visible quantity. Platform recommendation, search position, reach, leads and sales depend on many factors outside that delivery." },
];

export const metadata = {
  title: "All Social Media Growth Services",
  description: "Browse every TikTok, Instagram and Facebook growth service available from SmFame in the United States.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "SmFame social media growth services",
        url: "https://smfame.us/services/",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: services.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.name,
            url: `https://smfame.us/${service.slug}/`,
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: serviceFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="page-hero compact">
        <div className="shell"><span className="eyebrow"><span>✦</span> All services</span><h1>One place to build<br/><em>social momentum.</em></h1><p>Browse clear, password-free packages across TikTok, Instagram and Facebook.</p></div>
      </section>
      <section className="section shell catalog">
        {Object.entries(platformMeta).map(([key, platform]) => (
          <div className="catalog-group" key={key}>
            <div className="catalog-title"><span className={`platform-badge ${key}`}>{platform.mark}</span><div><h2>{platform.name}</h2><p>{platform.description}</p></div></div>
            <div className="service-grid">{getServicesByPlatform(key).map((service) => <ServiceCard key={service.slug} service={service} />)}</div>
          </div>
        ))}
      </section>
      <section className="section service-directory-guide">
        <div className="shell">
          <div className="section-head split-head"><div><span className="kicker">Service directory guide</span><h2>Compare the signal before the price</h2></div><p>A useful order begins with the destination and objective. These four checks apply across every SmFame service.</p></div>
          <div className="home-guide-grid">
            <article><span>01</span><h3>Choose the destination</h3><p>Decide whether the campaign supports a whole profile, one post, a video, a Story, a comment or a live broadcast. Each service accepts a specific type of public destination, and the correct link prevents avoidable delays.</p><p>Open the destination in a private browser window before checkout. It should load without a login, invitation or administrator permission.</p></article>
            <article><span>02</span><h3>Connect one metric to one objective</h3><p>Followers can strengthen profile context, views support visible consumption and likes provide quick engagement context. Comments, shares and live viewers have different roles and should not be treated as interchangeable numbers.</p><p>Write down what the campaign is meant to support. A clear objective makes it easier to pick the service and review the outcome later.</p></article>
            <article><span>03</span><h3>Select a proportionate quantity</h3><p>Use the account's current audience and the typical performance of comparable content as a reference. Starting with a measured package creates a clearer test than choosing the largest quantity automatically.</p><p>Record the baseline before ordering and keep the username or content available while delivery is active.</p></article>
            <article><span>04</span><h3>Measure the wider response</h3><p>The delivered count is only one part of the campaign. Where platform analytics allows, compare profile visits, watch time, replies, saves, messages, link clicks and other actions related to the real objective.</p><p>No package guarantees viral reach, platform recommendation or sales. Strong creative work and a useful destination remain essential.</p></article>
          </div>
        </div>
      </section>
      <section className="section service-directory-faq">
        <div className="shell faq-grid"><div className="faq-intro"><span className="kicker">Directory questions</span><h2>Before you select a service</h2><p>Quick answers for comparing platforms, signals and package sizes.</p></div><div className="faq-list">{serviceFaqs.map((faq, index) => <details key={faq.q} open={index === 0}><summary>{faq.q}<span>+</span></summary><p>{faq.a}</p></details>)}</div></div>
      </section>
    </>
  );
}
