import Image from "next/image";
import { naturalCase } from "@/lib/services";
import Link from "next/link";
import ServiceCard from "./ServiceCard";
import { platformMeta, getServicesByPlatform } from "@/lib/services";
import { platformContent } from "@/lib/platform-content";

export default function PlatformPage({ platformKey }) {
  const platform = platformMeta[platformKey];
  const items = getServicesByPlatform(platformKey);
  const guide = platformContent[platformKey];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${platform.name} growth services USA`,
        url: `https://smfame.us${platform.href}/`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: items.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.name,
            url: `https://smfame.us/${service.slug}/`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://smfame.us" },
          { "@type": "ListItem", position: 2, name: `${platform.name} services`, item: `https://smfame.us${platform.href}/` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((faq) => ({
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
      <section className={`page-hero platform-hero ${platformKey}`}>
        <div className="shell platform-hero-grid">
          <div><span className="eyebrow"><span>{platform.mark}</span> {platform.eyebrow}</span><h1>{platform.title}<br/><em>for the USA.</em></h1><p>{platform.description}</p><Link className="button" href={`/${items[0].slug}`}>View popular packages <span>↗</span></Link></div>
          <div className="platform-art"><div className="platform-art-mark">{platform.mark}</div><span className="ping ping-one"></span><span className="ping ping-two"></span><span className="ping ping-three"></span></div>
        </div>
      </section>
      <section className="section shell">
        <div className="section-head split-head"><div><span className="kicker">Choose your goal</span><h2>Every {platform.name} service</h2></div><p>Use one service for a focused campaign or combine complementary signals around your best content.</p></div>
        <div className="service-grid">{items.map((service) => <ServiceCard key={service.slug} service={service} />)}</div>
      </section>
      <section className="section platform-guide-section">
        <div className="shell">
          <div className="section-head split-head">
            <div><span className="kicker">USA buyer guide</span><h2>How to compare {naturalCase(guide.keyword)}</h2></div>
            <div className="platform-guide-intro">{guide.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>
          <figure className="platform-guide-figure">
            <Image src={{ tiktok: "/guides/tiktok-followers-vs-views-vs-likes.webp", instagram: "/guides/instagram-followers-vs-likes-vs-views.webp", facebook: "/guides/facebook-page-likes-vs-followers.webp" }[platformKey]} alt={`${platform.name} followers, likes and views compared — how SmFame ${platform.name} services fit together`} width={1672} height={941} sizes="(max-width: 900px) 100vw, 1100px" />
          </figure>
          <div className="platform-guide-grid">
            {guide.topics.map((topic, index) => (
              <article key={topic.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{topic.title}</h3>
                {topic.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section shell platform-checklist-section">
        <div className="platform-checklist-copy">
          <span className="kicker light">Before checkout</span>
          <h2>A clearer campaign starts with five checks</h2>
          <p>Use this list before selecting a package. It helps prevent wrong-link problems and gives you a useful baseline for measuring the campaign.</p>
          <Link className="button button-white" href={`/${items[0].slug}`}>Compare packages <span>↗</span></Link>
        </div>
        <ol className="platform-checklist">
          {guide.checklist.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}
        </ol>
      </section>
      <section className="section platform-faq-section">
        <div className="shell faq-grid">
          <div className="faq-intro"><span className="kicker">{platform.name} questions</span><h2>Useful answers before you order</h2><p>Direct guidance for choosing and measuring a {platform.name} package.</p></div>
          <div className="faq-list">{guide.faqs.map((faq, index) => <details key={faq.q} open={index === 0}><summary>{faq.q}<span>+</span></summary><p>{faq.a}</p></details>)}</div>
        </div>
      </section>
      <section className="section shell"><div className="info-banner"><div className="shield">✓</div><div><span className="kicker">Built around your security</span><h2>Your password is never part of the order.</h2><p>SmFame services use public usernames or content URLs. Keep your login, two-factor codes and recovery details private.</p></div><Link href="/contact-us" className="text-link">Talk to support <span>↗</span></Link></div></section>
    </>
  );
}
