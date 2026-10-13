import Link from "next/link";

const internalReferences = [
  { text: "linked privacy and refund policies", content: <><Link href="/privacy-policy">privacy policy</Link> and <Link href="/refund-policy">refund policy</Link></> },
  { text: "refund policy.", content: <><Link href="/refund-policy">refund policy</Link>.</> },
  { text: "SmFame contact page", content: <Link href="/contact-us">SmFame contact page</Link> },
  { text: "contact page", content: <Link href="/contact-us">contact page</Link> },
];

function renderInternalLinks(text) {
  let parts = [text];

  internalReferences.forEach((reference) => {
    parts = parts.flatMap((part, partIndex) => {
      if (typeof part !== "string") return part;
      const segments = part.split(reference.text);
      if (segments.length === 1) return part;
      return segments.flatMap((segment, segmentIndex) => [
        segment,
        segmentIndex < segments.length - 1
          ? <span className="legal-inline-links" key={`${reference.text}-${partIndex}-${segmentIndex}`}>{reference.content}</span>
          : null,
      ]).filter(Boolean);
    });
  });

  return parts;
}

export default function LegalPage({ eyebrow, title, updated = "September 28, 2026", sections }) {
  return (
    <>
      <section className="page-hero legal-hero compact"><div className="shell"><span className="eyebrow"><span>§</span> {eyebrow}</span><h1>{title}</h1><p>Last updated {updated}</p></div></section>
      <section className="section shell legal-layout">
        <aside><span>On this page</span>{sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.title}>{section.title}</a>)}</aside>
        <article>{sections.map((section, index) => <section id={`section-${index + 1}`} key={section.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{section.title}</h2>{section.body.map((paragraph) => <p key={paragraph}>{renderInternalLinks(paragraph)}</p>)}</section>)}</article>
      </section>
    </>
  );
}
