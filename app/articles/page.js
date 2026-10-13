import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { articles } from "@/lib/articles";
import { services, platformMeta } from "@/lib/services";

export const metadata = {
  title: "Social Media Growth Articles and Campaign Playbooks",
  description: "Browse 100 practical TikTok, Instagram and Facebook articles covering package selection, campaign planning, measurement, account safety and common mistakes.",
  alternates: { canonical: "/articles/" },
  openGraph: {
    title: "100 Social Media Campaign Articles | SmFame",
    description: "Practical articles connected to every SmFame TikTok, Instagram and Facebook service.",
    url: "https://smfame.us/articles/",
    type: "website",
    images: [{ url: "/guides/social-media-campaign-checklist.webp", width: 1672, height: 941, alt: "SmFame social media campaign article library" }],
  },
};

export default function ArticlesPage() {
  permanentRedirect("/guides");
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "SmFame social media growth articles",
    url: "https://smfame.us/articles/",
    description: "A library of practical social media campaign articles connected to SmFame services.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({ "@type": "ListItem", position: index + 1, name: article.title, url: `https://smfame.us/articles/${article.slug}/` })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <section className="article-hub-hero">
        <div className="shell article-hub-hero-grid">
          <div>
            <span className="eyebrow"><span>✦</span> SmFame article library</span>
            <h1>100 focused articles.<br/><em>20 connected service clusters.</em></h1>
            <p>Direct answers, buying checklists, campaign playbooks and measurement frameworks for every TikTok, Instagram and Facebook service on SmFame.</p>
            <div className="guides-hero-actions"><a className="button" href="#article-library">Browse the library <span>↓</span></a><Link className="button button-ghost-dark" href="/guides">Read editorial guides</Link></div>
          </div>
          <div className="article-hub-proof">
            <span>CONTENT ARCHITECTURE</span>
            <strong>{articles.length} crawlable articles</strong>
            <div><b>20</b><p>money pages supported</p></div>
            <div><b>05</b><p>search intents per service</p></div>
            <div><b>03</b><p>platform silos</p></div>
            <div><b>01</b><p>clear internal-link path</p></div>
          </div>
        </div>
      </section>

      <section className="section shell article-hub-intro">
        <div className="section-head split-head"><div><span className="kicker">Built for useful decisions</span><h2>Every article answers a different campaign question</h2></div><p>The library avoids city-page duplication and keyword stuffing. Each cluster covers package fit, pre-order checks, planning, measurement and preventable mistakes.</p></div>
        <div className="article-intent-grid">
          {["Package planning", "Buying checklist", "Campaign playbook", "Measurement", "Campaign mistakes"].map((intent, index) => <div key={intent}><span>0{index + 1}</span><strong>{intent}</strong></div>)}
        </div>
      </section>

      <section className="section article-library" id="article-library">
        <div className="shell">
          {Object.keys(platformMeta).map((platformKey) => {
            const platform = platformMeta[platformKey];
            const platformServices = services.filter((service) => service.platform === platformKey);
            return (
              <section className="article-platform-group" id={`${platformKey}-articles`} key={platformKey}>
                <div className="article-platform-head"><span className={`guide-platform ${platformKey}`}>{platform.mark}</span><div><small>{platformServices.length * 5} articles</small><h2>{platform.name} campaign library</h2></div><Link href={platform.href}>View services ↗</Link></div>
                <div className="article-service-clusters">
                  {platformServices.map((service) => {
                    const serviceArticles = articles.filter((article) => article.serviceSlug === service.slug);
                    return (
                      <article className="article-service-cluster" key={service.slug}>
                        <div><span>5-article cluster</span><h3>{service.name}</h3><p>Supports <Link href={`/${service.slug}`}>/{service.slug}</Link></p></div>
                        <ol>{serviceArticles.map((article) => <li key={article.slug}><Link href={`/articles/${article.slug}`}><span>{article.category}</span><strong>{article.title}</strong><b>↗</b></Link></li>)}</ol>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </>
  );
}
