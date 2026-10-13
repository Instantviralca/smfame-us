import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { services, getService, platformMeta, buildFaqs, getServicesByPlatform } from "@/lib/services";
import { getServiceContent } from "@/lib/service-content";
import { guides } from "@/lib/guides";
import { tools } from "@/lib/tools";
import { business, guaranteeItems, packageIncludes, hasRefill } from "@/lib/business";
import SmartPlanner from "@/components/SmartPlanner";
import PackagePicker from "@/components/PackagePicker";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const image = { url: service.ogImage, width: 1200, height: 630, alt: `Buy ${service.name} — SmFame` };
  return {
    title: service.seoTitle,
    description: service.metaDescription,
    alternates: { canonical: `/${service.slug}/` },
    openGraph: {
      title: service.seoTitle,
      description: service.metaDescription,
      url: `https://smfame.us/${service.slug}/`,
      type: "website",
      images: [image],
    },
    twitter: { card: "summary_large_image", title: service.seoTitle, description: service.metaDescription, images: [service.ogImage] },
  };
}

function relatedGuides(service) {
  const sameplatform = guides.filter((guide) => guide.platform === service.platform);
  const general = guides.filter((guide) => guide.platform !== service.platform && !["tiktok", "instagram", "facebook"].includes(guide.platform));
  return [...sameplatform, ...general].slice(0, 3);
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const platform = platformMeta[service.platform];
  const faqs = buildFaqs(service);
  const related = getServicesByPlatform(service.platform).filter((item) => item.slug !== service.slug).slice(0, 4);
  const content = getServiceContent(service.slug);
  const guarantees = guaranteeItems(service);
  const readGuides = relatedGuides(service);
  const pageUrl = `https://smfame.us/${service.slug}/`;
  const prices = service.packages.map((pack) => Number(pack.price.replace("$", "")));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        name: `${service.name} (USA)`,
        description: service.summary,
        brand: { "@type": "Brand", name: "SmFame" },
        image: [`https://smfame.us${service.ogImage}`, `https://smfame.us${service.heroImage}`],
        category: `${platform.name} marketing service`,
        url: pageUrl,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: Math.min(...prices).toFixed(2),
          highPrice: Math.max(...prices).toFixed(2),
          offerCount: service.packages.length,
          availability: "https://schema.org/InStock",
          url: pageUrl,
          seller: { "@id": "https://smfame.us/#organization" },
          offers: service.packages.map((pack) => ({
            "@type": "Offer",
            name: `${pack.quantity} ${service.name}`,
            priceCurrency: "USD",
            price: pack.price.replace("$", ""),
            availability: "https://schema.org/InStock",
            url: pageUrl,
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://smfame.us/" },
          { "@type": "ListItem", position: 2, name: `${platform.name} services`, item: `https://smfame.us${platform.href}/` },
          { "@type": "ListItem", position: 3, name: service.name, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className={`service-hero ${service.platform}`}>
        <div className="service-orb"></div>
        <div className="shell">
          <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href={platform.href}>{platform.name}</Link><span>/</span><b>{service.name}</b></div>
          <div className="service-hero-grid">
            <div className="service-hero-copy">
              <span className="eyebrow"><span>{platform.mark}</span> {platform.name} growth · United States</span>
              <h1>{service.title}</h1>
              <p className="service-tagline"><strong>{service.headline}.</strong> {service.summary}</p>
              <div className="hero-actions"><a className="button" href="#packages">See {service.packages.length} packages <span>↓</span></a><Link className="button button-ghost-dark" href="/contact-us">Ask a question</Link></div>
              <div className="service-assurances">
                <span>✓ No password</span>
                {hasRefill(service) && <span>✓ {business.refillDays}-day drop replacement</span>}
                <span>✓ Refund if not started in {business.refundIfNotStartedHours}h</span>
              </div>
            </div>
            <div className="service-preview">
              <div className="preview-top"><span className={`platform-badge ${service.platform}`}>{platform.mark}</span><div><small>Selected service</small><b>{service.name}</b></div><i>● Available</i></div>
              <div className="preview-metric"><small>Packages from</small><strong>{service.start}</strong><span>USD</span></div>
              <div className="preview-progress"><span></span></div>
              <div className="preview-list"><span><i>01</i> Choose from {service.packages.length} sizes <b>{service.quantities[0]}–{service.quantities[service.quantities.length - 1]}</b></span><span><i>02</i> Add {service.target.replace("your ", "")} <b>Public</b></span><span><i>03</i> Check out in USD <b>Secure</b></span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell packages-section" id="packages">
        <div className="section-head centered"><span className="kicker">Simple, transparent pricing</span><h2>Choose your {service.label} package</h2><p>{service.packages.length} sizes from {service.quantities[0]} to {service.quantities[service.quantities.length - 1]}. Every price is the full total in US dollars.</p></div>
        <PackagePicker
          slug={service.slug}
          name={service.name}
          platformMark={platform.mark}
          platformName={platform.name}
          packages={service.packages}
          popular={service.popular}
          includes={packageIncludes(service)}
        />
        <p className="pricing-note">Use only public profiles and content that you own or are authorized to promote. Larger packages are delivered gradually.</p>
      </section>

      <section className="shell guarantee-section" aria-labelledby="guarantee-title">
        <div className="guarantee-panel">
          <div className="guarantee-intro"><span className="kicker light">Delivery &amp; guarantee</span><h2 id="guarantee-title">What happens after you order</h2><p>Clear terms, written down before you pay. Full details are in our <Link href="/refund-policy">refund policy</Link>.</p></div>
          <div className="guarantee-grid">
            {guarantees.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section shell service-overview">
        <div className="service-overview-grid">
          <div className="service-overview-copy">
            <span className="kicker">What you get</span>
            <h2>{content ? content.heading : `What you get with ${service.label}`}</h2>
            {(content ? content.paragraphs : [service.summary, service.limits]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <h3 className="overview-subhead">Who it is for</h3>
            <ul className="who-list">{(content ? content.who : service.bestFor).map((item) => <li key={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</li>)}</ul>
          </div>
          <figure className="service-overview-image">
            <Image src={service.heroImage} alt={service.heroImageAlt} width={1672} height={941} sizes="(max-width: 900px) 100vw, 560px" />
          </figure>
        </div>
      </section>

      <section className="section shell package-guide-section">
        <div className="section-head split-head">
          <div><span className="kicker">Compare every option</span><h2>{service.name} package guide</h2></div>
          <p>Use price and quantity together with the current size of the account. A larger package is not automatically a better campaign.</p>
        </div>
        <div className="package-guide-table">
          <div className="package-guide-row package-guide-head"><span>Quantity</span><span>Price</span><span>Best fit</span><span>Action</span></div>
          {service.packageGuide.map((pack) => (
            <div className="package-guide-row" key={pack.quantity}>
              <strong>{pack.quantity} <small>{service.name}</small></strong>
              <b>{pack.price} <small>USD</small></b>
              <p>{pack.fit}</p>
              <Link className="text-link" href={`/cart?service=${service.slug}&package=${encodeURIComponent(pack.quantity)}`}>Add <span>↗</span></Link>
            </div>
          ))}
        </div>
      </section>

      <section className="shell planner-wrap">
        <SmartPlanner service={{ slug: service.slug, packages: service.packages }} />
      </section>

      <section className="section depth-section">
        <div className="shell">
          <div className="section-head split-head">
            <div><span className="kicker">Buying guide</span><h2>Get more from your {service.label}</h2></div>
            <p>How the signal works on {platform.name}, how to size the package, how to prepare the account and what to measure afterwards.</p>
          </div>
          <div className="depth-accordion">
            {service.deepDiveSections.map((section, index) => (
              <details key={section.title} open={index === 0}>
                <summary><span>{String(index + 1).padStart(2, "0")} · {section.eyebrow}</span><h3>{section.title}</h3><i>+</i></summary>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell order-checklist-section">
        <div className="checklist-panel">
          <div className="checklist-copy"><span className="kicker light">Pre-order checklist</span><h2>Six checks before buying {service.label}</h2><p>A correct public destination and a proportionate package prevent the most common order delays.</p><a className="button button-white" href="#packages">Review packages <span>↑</span></a></div>
          <ol className="order-checklist">{service.orderChecklist.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>
        </div>
      </section>

      <section className="section faq-section">
        <div className="shell faq-grid"><div className="faq-intro"><span className="kicker">Questions, answered</span><h2>{service.name} FAQ</h2><p>Delivery, guarantees, package size and safety — answered before you order.</p><Link className="text-link" href="/contact-us">Still need help? Contact us <span>↗</span></Link></div><div className="faq-list">{faqs.map((faq, index) => <details key={faq.q} open={index === 0}><summary>{faq.q}<span>+</span></summary><p>{faq.a}</p></details>)}</div></div>
      </section>

      <section className="section money-page-articles">
        <div className="shell">
          <div className="section-head split-head"><div><span className="kicker">Learn before you order</span><h2>Guides and free tools</h2></div><p>Short reads and free tools that help you choose the right package and get more from it.</p></div>
          <div className="money-page-article-grid">
            {readGuides.map((guide) => (
              <Link href={`/guides/${guide.slug}`} key={guide.slug}>
                <span>Guide</span>
                <strong>{guide.title}</strong>
                <p>{guide.description}</p>
                <b>Read guide ↗</b>
              </Link>
            ))}
            {service.platform === "tiktok" && tools.slice(0, 1).map((tool) => (
              <Link href={`/free-tools/${tool.slug}`} key={tool.slug}>
                <span>Free tool</span>
                <strong>{tool.name}</strong>
                <p>{tool.short}</p>
                <b>Use free tool ↗</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell related-section"><div className="section-head split-head"><div><span className="kicker">Complete the campaign</span><h2>Related {platform.name} services</h2></div><Link className="text-link" href={platform.href}>View every {platform.name} service <span>↗</span></Link></div><div className="related-grid">{related.map((item) => <Link href={`/${item.slug}`} key={item.slug}><span>{platform.mark}</span><div><h3>{item.name}</h3><p>From {item.start}</p></div><b>↗</b></Link>)}</div></section>
    </>
  );
}
