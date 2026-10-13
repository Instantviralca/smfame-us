import Link from "next/link";
import Image from "next/image";
import { guides, guidePlatformMeta } from "@/lib/guides";
import { articles } from "@/lib/articles";
import { services, platformMeta as servicePlatformMeta } from "@/lib/services";

export const metadata = {
  title: "Social Media Growth Guides and Campaign Playbooks",
  description: "Browse practical TikTok, Instagram and Facebook guides covering service selection, campaign planning, safety, measurement and preventable mistakes.",
  alternates: { canonical: "/guides/" },
  openGraph: {
    title: "Social Media Growth Guides | SmFame",
    description: "Practical, honest guidance for planning and measuring TikTok, Instagram and Facebook campaigns across every SmFame service.",
    url: "https://smfame.us/guides/",
    type: "website",
    images: [{ url: "/smfame-social-preview.webp", width: 1200, height: 630, alt: "SmFame social media growth guides" }],
  },
};

function GuideCard({ guide, featured = false }) {
  const platform = guidePlatformMeta[guide.platform];
  return (
    <article className={`guide-card ${featured ? "guide-card-featured" : ""}`}>
      <Link className="guide-card-image" href={`/guides/${guide.slug}`} aria-label={`Read ${guide.title}`}>
        <Image
          src={guide.image}
          alt={guide.imageAlt}
          width={1672}
          height={941}
          sizes={featured ? "(max-width: 760px) calc(100vw - 84px), 1090px" : "(max-width: 760px) calc(100vw - 84px), 540px"}
          priority={featured}
        />
      </Link>
      <div className="guide-card-top"><span className={`guide-platform ${guide.platform}`}>{platform.mark}</span><span>{guide.category}</span><time dateTime={guide.dateModified}>{guide.updated}</time></div>
      <h2>{guide.title}</h2>
      <p>{guide.description}</p>
      <div className="guide-card-foot"><span>{guide.readTime}</span><Link href={`/guides/${guide.slug}`}>Read guide <b>↗</b></Link></div>
    </article>
  );
}

export default function GuidesPage() {
  const [featured, ...remaining] = guides;
  const libraryItems = [...guides, ...articles];
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "SmFame social media growth guides",
    url: "https://smfame.us/guides/",
    description: "Practical TikTok, Instagram and Facebook campaign guides.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: libraryItems.length,
      itemListElement: libraryItems.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.title,
        url: `https://smfame.us/guides/${guide.slug}/`,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <section className="guides-hero">
        <div className="shell guides-hero-grid">
          <div>
            <span className="eyebrow"><span>✦</span> SmFame guides</span>
            <h1>Plan social growth with <em>better context.</em></h1>
            <p>Practical guidance for choosing the right signal, preparing a public destination, protecting account access and measuring what happens next.</p>
            <div className="guides-hero-actions"><a className="button" href="#all-guides">Browse all guides <span>↓</span></a><Link className="button button-ghost-dark" href="/services">Compare services</Link></div>
          </div>
          <div className="guides-map" aria-label="Guide library overview">
            <span>GUIDE LIBRARY</span>
            <strong>Practical answers for every campaign stage</strong>
            <div><b>01</b><p>choose the right service</p></div>
            <div><b>02</b><p>prepare before ordering</p></div>
            <div><b>03</b><p>plan a focused campaign</p></div>
            <div><b>04</b><p>measure the results clearly</p></div>
          </div>
        </div>
      </section>

      <section className="section shell guide-featured-section">
        <div className="section-head split-head"><div><span className="kicker">Start with the signal</span><h2>Featured decision guide</h2></div><p>Understand what followers, views and likes actually support before choosing a TikTok package.</p></div>
        <GuideCard guide={featured} featured />
      </section>

      <section className="section guide-library-section" id="all-guides">
        <div className="shell">
          <div className="section-head split-head"><div><span className="kicker">The complete library</span><h2>Guides for every campaign stage</h2></div><p>Move from service selection to destination checks, account safety and a reviewable measurement plan.</p></div>
          <div className="guide-grid">{remaining.map((guide) => <GuideCard guide={guide} key={guide.slug} />)}</div>
        </div>
      </section>

      <section className="section shell article-hub-intro">
        <div className="section-head split-head"><div><span className="kicker">Learn by campaign stage</span><h2>Find the right guide for your next campaign</h2></div><p>Choose a platform and service, then explore practical guidance for package fit, preparation, planning, measurement and avoidable mistakes.</p></div>
        <div className="article-intent-grid">
          {["Package planning", "Buying checklist", "Campaign playbook", "Measurement", "Campaign mistakes"].map((intent, index) => <div key={intent}><span>0{index + 1}</span><strong>{intent}</strong></div>)}
        </div>
      </section>

      <section className="section article-library" id="supporting-library">
        <div className="shell">
          {Object.keys(servicePlatformMeta).map((platformKey) => {
            const platform = servicePlatformMeta[platformKey];
            const platformServices = services.filter((service) => service.platform === platformKey);
            return (
              <section className="article-platform-group" id={`${platformKey}-guides`} key={platformKey}>
                <div className="article-platform-head"><span className={`guide-platform ${platformKey}`}>{platform.mark}</span><div><small>Step-by-step guidance</small><h2>{platform.name} campaign guides</h2></div><Link href={platform.href}>View services ↗</Link></div>
                <div className="article-service-clusters">
                  {platformServices.map((service) => {
                    const serviceArticles = articles.filter((article) => article.serviceSlug === service.slug);
                    return (
                      <article className="article-service-cluster" key={service.slug}>
                        <div><span>Practical guide series</span><h3>{service.name}</h3><p><Link href={`/${service.slug}`}>View {service.name} packages ↗</Link></p></div>
                        <ol>{serviceArticles.map((article) => <li key={article.slug}><Link href={`/guides/${article.slug}`}><span>{article.category}</span><strong>{article.title}</strong><b>↗</b></Link></li>)}</ol>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="section shell guide-clusters">
        <div className="section-head centered"><span className="kicker">Explore by platform</span><h2>Choose the campaign you are planning</h2><p>Each platform hub includes every available SmFame service and additional buying context.</p></div>
        <div className="guide-cluster-grid">
          {Object.entries(guidePlatformMeta).filter(([key]) => key !== "general").map(([key, platform]) => (
            <Link href={platform.href} className={key} key={key}><span>{platform.mark}</span><div><small>{guides.filter((guide) => guide.platform === key).length} guides</small><strong>{platform.label} services</strong></div><b>↗</b></Link>
          ))}
        </div>
      </section>
    </>
  );
}
