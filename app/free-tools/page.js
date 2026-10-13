import Link from "next/link";
import { tools } from "@/lib/tools";

const title = "Free TikTok Tools — Hashtags, Bios, Captions";
const description = "Free TikTok tools from SmFame: hashtag generator, bio generator, caption generator and engagement rate calculator. No sign-up required.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/free-tools/" },
  openGraph: { title: `${title} | SmFame`, description, url: "https://smfame.us/free-tools/", images: [{ url: "/og/free-tools.webp", width: 1200, height: 630, alt: "Free TikTok tools — SmFame" }] },
  twitter: { card: "summary_large_image", images: ["/og/free-tools.webp"] },
};

export default function FreeToolsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free TikTok tools",
    url: "https://smfame.us/free-tools/",
    description,
    hasPart: tools.map((tool) => ({ "@type": "WebApplication", name: tool.name, url: `https://smfame.us/free-tools/${tool.slug}/` })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="page-hero tool-hero">
        <div className="shell">
          <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><b>Free tools</b></div>
          <span className="eyebrow"><span>♪</span> Free · No sign-up</span>
          <h1>Free TikTok tools</h1>
          <p>Small, fast tools for planning TikTok posts: find hashtags, write a bio that fits the 80-character limit, draft captions with a hook and check a video's engagement rate. Everything runs in your browser and nothing is stored.</p>
        </div>
      </section>
      <section className="section shell">
        <div className="tools-grid">
          {tools.map((tool) => (
            <Link className="tool-card" href={`/free-tools/${tool.slug}`} key={tool.slug}>
              <span className="tool-icon">{tool.icon}</span>
              <h2>{tool.name}</h2>
              <p>{tool.short}</p>
              <b>Use free tool ↗</b>
            </Link>
          ))}
        </div>
      </section>
      <section className="section shell">
        <div className="cta-panel">
          <div><span className="kicker light">Planning a launch?</span><h2>Pair a good post with a visible start</h2><p>TikTok followers, likes and views with clear USD pricing and no password required.</p></div>
          <Link className="button button-white" href="/tiktok-services">See TikTok services <span>↗</span></Link>
        </div>
      </section>
    </>
  );
}
