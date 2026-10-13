import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getRelatedArticles } from "@/lib/articles";
import { getService, platformMeta } from "@/lib/services";

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/guides/${article.slug}/` },
    openGraph: {
      title: `${article.title} | SmFame`,
      description: article.description,
      url: `https://smfame.us/guides/${article.slug}/`,
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: ["SmFame Editorial Team"],
      images: [{ url: article.image, width: 1672, height: 941, alt: article.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.image],
    },
  };
}

function ArticleInlineVisual({ visual }) {
  return (
    <figure className="article-inline-visual">
      <Image
        src={visual.image}
        alt={visual.alt}
        width={1672}
        height={941}
        sizes="(max-width: 760px) calc(100vw - 56px), 760px"
      />
      <figcaption>{visual.caption}</figcaption>
    </figure>
  );
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const service = getService(article.serviceSlug);
  const platform = platformMeta[article.platform];
  const related = getRelatedArticles(article);
  const inlineVisuals = article.images.slice(1).map((image, index) => ({
    image,
    alt: index === 0
      ? `${service.name} campaign planning and package selection illustration`
      : `${service.name} campaign measurement and account safety illustration`,
    caption: index === 0
      ? `Match the ${service.label} package and public destination to one documented campaign goal.`
      : "Keep the destination stable, protect account access and review delivery separately from organic results.",
  }));
  const pageUrl = `https://smfame.us/guides/${article.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: article.title,
        description: article.description,
        image: article.images.map((image) => `https://smfame.us${image}`),
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        wordCount: article.wordCount,
        mainEntityOfPage: pageUrl,
        about: [{ "@type": "Thing", name: service.name }, { "@type": "Thing", name: `${platform.name} marketing` }],
        author: { "@type": "Organization", name: "SmFame Editorial Team", url: "https://smfame.us/about-us/" },
        publisher: { "@id": "https://smfame.us/#organization" },
        isPartOf: { "@id": "https://smfame.us/#website" },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://smfame.us" },
          { "@type": "ListItem", position: 2, name: "Guides", item: "https://smfame.us/guides/" },
          { "@type": "ListItem", position: 3, name: article.title, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: article.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <article className="guide-article seo-article">
        <header className={`guide-article-hero ${article.platform}`}>
          <div className="shell">
            <div className="breadcrumbs guide-breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/guides">Guides</Link><span>/</span><b>{platform.name}</b></div>
            <div className="guide-article-hero-grid">
              <div>
                <span className="eyebrow"><span>{platform.mark}</span> {article.category}</span>
                <h1>{article.title}</h1>
                <p>{article.description}</p>
                <div className="guide-byline"><span>SmFame Editorial Team</span><time dateTime={article.dateModified}>Updated {article.publishedLabel}</time><span>{article.readingTime}</span></div>
              </div>
              <aside className="guide-quick-answer"><span>DIRECT ANSWER</span><p>{article.directAnswer}</p><Link href={`/${service.slug}`}>View {service.name} packages <b>↗</b></Link></aside>
            </div>
          </div>
        </header>

        <div className="shell guide-cover-shell">
          <figure className="guide-cover">
            <Image src={article.image} alt={article.imageAlt} width={1672} height={941} sizes="(max-width: 760px) calc(100vw - 28px), 1180px" priority />
          </figure>
        </div>

        <div className="section shell guide-article-layout">
          <aside className="guide-toc">
            <span>In this article</span>
            {article.sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.title}><b>{String(index + 1).padStart(2, "0")}</b>{section.title}</a>)}
            <a href="#frequently-asked-questions"><b>FAQ</b>Questions answered</a>
          </aside>

          <div className="guide-article-body">
            <div className="article-key-facts">
              <span>Campaign facts</span>
              <div><b>Destination</b><p>{service.target}</p></div>
              <div><b>Starting price</b><p>{service.start} USD</p></div>
              <div><b>Account access</b><p>No password required</p></div>
              <div><b>Primary scope</b><p>{service.outcome}</p></div>
            </div>

            {article.sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.title}>
                <span className="guide-section-number">{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                {section.link && <Link className="guide-inline-link" href={section.link.href}>{section.link.label} <span>↗</span></Link>}
                {index === 1 && <ArticleInlineVisual visual={inlineVisuals[0]} />}
                {index === 3 && <ArticleInlineVisual visual={inlineVisuals[1]} />}
              </section>
            ))}

            <section className="article-money-page-cta">
              <span className="guide-section-number">NEXT STEP</span>
              <h2>Review the service before choosing a package</h2>
              <p>The {service.name} page shows every quantity, current USD price, destination requirement and the full pre-order checklist in one place.</p>
              <Link className="button" href={`/${service.slug}`}>View {service.name} <span>↗</span></Link>
            </section>

            <section className="guide-faq" id="frequently-asked-questions">
              <span className="guide-section-number">FAQ</span>
              <h2>Questions about {service.label}</h2>
              <div className="faq-list">{article.faqs.map((faq, index) => <details key={faq.q} open={index === 0}><summary>{faq.q}<span>+</span></summary><p>{faq.a}</p></details>)}</div>
            </section>

            <aside className="article-source-note">
              <span>Source and scope note</span>
              <p>Platform features and policies can change. Check the <a href={article.source.href} target="_blank" rel="noreferrer">{article.source.label}</a> for current platform guidance. This article separates package delivery from organic outcomes and does not promise ranking, recommendation or revenue.</p>
            </aside>
          </div>
        </div>
      </article>

      <section className="section guide-related-section">
        <div className="shell">
          <div className="section-head split-head"><div><span className="kicker">Continue researching</span><h2>Related campaign guides</h2></div><Link className="text-link" href="/guides">View the complete library <span>↗</span></Link></div>
          <div className="article-related-grid">{related.map((item) => <Link href={`/guides/${item.slug}`} key={item.slug}><small>{item.category}</small><strong>{item.title}</strong><p>{item.description}</p><b>Read guide ↗</b></Link>)}</div>
        </div>
      </section>
    </>
  );
}
