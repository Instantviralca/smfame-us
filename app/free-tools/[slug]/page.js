import Link from "next/link";
import { notFound } from "next/navigation";
import { tools, getTool } from "@/lib/tools";
import { getService } from "@/lib/services";
import { HashtagGenerator, BioGenerator, CaptionGenerator, EngagementCalculator } from "@/components/ToolWidgets";

const widgets = {
  "tiktok-hashtag-generator": HashtagGenerator,
  "tiktok-bio-generator": BioGenerator,
  "tiktok-caption-generator": CaptionGenerator,
  "tiktok-engagement-rate-calculator": EngagementCalculator,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return {
    title: tool.seoTitle,
    description: tool.metaDescription,
    alternates: { canonical: `/free-tools/${tool.slug}/` },
    openGraph: {
      title: `${tool.seoTitle} | SmFame`,
      description: tool.metaDescription,
      url: `https://smfame.us/free-tools/${tool.slug}/`,
      type: "website",
      images: [{ url: "/og/free-tools.webp", width: 1200, height: 630, alt: `${tool.name} — SmFame` }],
    },
    twitter: { card: "summary_large_image", images: ["/og/free-tools.webp"] },
  };
}

export default async function ToolPage({ params }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  const Widget = widgets[tool.slug];
  const service = getService(tool.relatedService);
  const otherTools = tools.filter((item) => item.slug !== tool.slug);
  const url = `https://smfame.us/free-tools/${tool.slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: tool.name,
        url,
        description: tool.metaDescription,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any (web browser)",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@id": "https://smfame.us/#organization" },
      },
      {
        "@type": "HowTo",
        name: `How to use the ${tool.name}`,
        step: tool.howTo.map((text, index) => ({ "@type": "HowToStep", position: index + 1, text })),
      },
      {
        "@type": "FAQPage",
        mainEntity: tool.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://smfame.us/" },
          { "@type": "ListItem", position: 2, name: "Free TikTok tools", item: "https://smfame.us/free-tools/" },
          { "@type": "ListItem", position: 3, name: tool.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="page-hero tool-hero">
        <div className="shell">
          <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/free-tools">Free tools</Link><span>/</span><b>{tool.name}</b></div>
          <span className="eyebrow"><span>{tool.icon}</span> Free · No sign-up</span>
          <h1>{tool.h1}</h1>
          <p>{tool.lead}</p>
        </div>
      </section>

      <section className="shell tool-shell">
        <Widget />
      </section>

      <section className="section shell tool-howto">
        <div className="section-head split-head">
          <div><span className="kicker">How to use it</span><h2>Use the {tool.name.replace("TikTok ", "").toLowerCase()} in three steps</h2></div>
          <ol className="tool-steps">{tool.howTo.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol>
        </div>
      </section>

      <section className="section shell seo-content">
        <div className="editorial-grid">
          {tool.sections.map((section, index) => (
            <article key={section.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2 className="tool-section-title">{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell">
        <div className="cta-panel">
          <div><span className="kicker light">Ready to post?</span><h2>Give the video a stronger start</h2><p>{service.name} start at {service.start}. Order with a public link — no password required.</p></div>
          <Link className="button button-white" href={`/${service.slug}`}>Buy {service.label} <span>↗</span></Link>
        </div>
      </section>

      <section className="section faq-section">
        <div className="shell faq-grid">
          <div className="faq-intro"><span className="kicker">Questions, answered</span><h2>{tool.name} FAQ</h2><p>Quick answers about using the tool and getting more from TikTok.</p></div>
          <div className="faq-list">{tool.faqs.map((faq, index) => <details key={faq.q} open={index === 0}><summary>{faq.q}<span>+</span></summary><p>{faq.a}</p></details>)}</div>
        </div>
      </section>

      <section className="section shell related-section">
        <div className="section-head split-head"><div><span className="kicker">More free tools</span><h2>Other free TikTok tools</h2></div><Link className="text-link" href="/free-tools">All free tools <span>↗</span></Link></div>
        <div className="tools-grid">
          {otherTools.map((item) => (
            <Link className="tool-card" href={`/free-tools/${item.slug}`} key={item.slug}>
              <span className="tool-icon">{item.icon}</span>
              <h3>{item.name}</h3>
              <p>{item.short}</p>
              <b>Use free tool ↗</b>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
