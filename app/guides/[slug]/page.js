import { naturalCase } from "@/lib/services";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { guides, getGuide, getRelatedGuides, guidePlatformMeta } from "@/lib/guides";
import { articles, getArticle } from "@/lib/articles";
import SeoArticlePage from "@/app/articles/[slug]/page";

const guideSeoTitles = {
  "tiktok-followers-vs-views-vs-likes": "TikTok Followers vs Views vs Likes: Which Fits Your Goal?",
  "instagram-story-views-vs-reel-views": "Instagram Story Views vs Reel Views: The Difference",
  "facebook-page-likes-vs-followers": "Facebook Page Likes vs Followers: What to Track",
};

export function generateStaticParams() {
  return [...guides.map((guide) => ({ slug: guide.slug })), ...articles.map((article) => ({ slug: article.slug }))];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) {
    const article = getArticle(slug);
    if (!article) return {};
    return {
      title: article.title.length > 51 ? { absolute: article.title } : article.title,
      description: article.description,
      // Template-generated supporting articles: kept for visitors, excluded from Google's index
      // to avoid scaled, near-duplicate content signals.
      robots: { index: false, follow: true },
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
      twitter: { card: "summary_large_image", title: article.title, description: article.description, images: [article.image] },
    };
  }
  const seoTitle = guideSeoTitles[guide.slug] || guide.title;
  return {
    title: `${seoTitle} | SmFame`.length <= 60 ? seoTitle : { absolute: seoTitle },
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}/` },
    openGraph: {
      title: `${guide.title} | SmFame`,
      description: guide.description,
      url: `https://smfame.us/guides/${guide.slug}/`,
      type: "article",
      publishedTime: guide.dateModified,
      modifiedTime: guide.dateModified,
      authors: ["SmFame Editorial Team"],
      images: [{ url: guide.image, width: 1672, height: 941, alt: guide.imageAlt }],
    },
  };
}

export default async function GuidePage({ params }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) {
    if (getArticle(slug)) return <SeoArticlePage params={params} />;
    notFound();
  }
  const platform = guidePlatformMeta[guide.platform];
  const related = getRelatedGuides(guide);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        datePublished: guide.dateModified,
        dateModified: guide.dateModified,
        mainEntityOfPage: `https://smfame.us/guides/${guide.slug}`,
        author: { "@type": "Organization", name: "SmFame Editorial Team", url: "https://smfame.us/about-us/" },
        publisher: { "@id": "https://smfame.us/#organization" },
        image: `https://smfame.us${guide.image}`,
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://smfame.us" },
          { "@type": "ListItem", position: 2, name: "Guides", item: "https://smfame.us/guides/" },
          { "@type": "ListItem", position: 3, name: guide.shortTitle, item: `https://smfame.us/guides/${guide.slug}/` },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <article className="guide-article">
        <header className={`guide-article-hero ${guide.platform}`}>
          <div className="shell">
            <div className="breadcrumbs guide-breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/guides">Guides</Link><span>/</span><b>{platform.label}</b></div>
            <div className="guide-article-hero-grid">
              <div>
                <span className="eyebrow"><span>{platform.mark}</span> {guide.category}</span>
                <h1>{guide.title}</h1>
                <p>{guide.description}</p>
                <div className="guide-byline"><span>SmFame Editorial Team</span><time dateTime={guide.dateModified}>Updated {guide.updated}</time><span>{guide.readTime}</span></div>
              </div>
              <aside className="guide-quick-answer"><span>QUICK ANSWER</span><p>{guide.takeaway}</p><Link href={platform.href}>Explore {platform.label} options <b>↗</b></Link></aside>
            </div>
          </div>
        </header>

        <div className="shell guide-cover-shell">
          <figure className="guide-cover">
            <Image
              src={guide.image}
              alt={guide.imageAlt}
              width={1672}
              height={941}
              sizes="(max-width: 760px) calc(100vw - 28px), 1180px"
              priority
            />
          </figure>
        </div>

        <div className="section shell guide-article-layout">
          <aside className="guide-toc">
            <span>In this guide</span>
            {guide.sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.title}><b>{String(index + 1).padStart(2, "0")}</b>{section.title}</a>)}
            <a href="#frequently-asked-questions"><b>FAQ</b>Questions answered</a>
          </aside>

          <div className="guide-article-body">
            <div className="guide-intro">{guide.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            {guide.sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.title}>
                <span className="guide-section-number">{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                {section.link && <Link className="guide-inline-link" href={section.link.href}>{section.link.label} <span>↗</span></Link>}
              </section>
            ))}

            <section className="guide-faq" id="frequently-asked-questions">
              <span className="guide-section-number">FAQ</span>
              <h2>Questions about {naturalCase(guide.shortTitle)}</h2>
              <div className="faq-list">{guide.faqs.map((faq, index) => <details key={faq.q} open={index === 0}><summary>{faq.q}<span>+</span></summary><p>{faq.a}</p></details>)}</div>
            </section>

            <div className="guide-editorial-note"><span>Editorial note</span><p>This guide separates visible service delivery from organic platform outcomes. SmFame does not guarantee ranking, recommendation, revenue or audience behavior.</p></div>
          </div>
        </div>
      </article>

      <section className="section guide-related-section">
        <div className="shell">
          <div className="section-head split-head"><div><span className="kicker light">Continue planning</span><h2>Related campaign guides</h2></div><Link className="text-link" href="/guides">View all guides <span>↗</span></Link></div>
          <div className="guide-related-grid">{related.map((item) => <Link href={`/guides/${item.slug}`} key={item.slug}><span>{guidePlatformMeta[item.platform].mark}</span><small>{item.category}</small><strong>{item.shortTitle}</strong><p>{item.description}</p><b>Read guide ↗</b></Link>)}</div>
        </div>
      </section>
    </>
  );
}
