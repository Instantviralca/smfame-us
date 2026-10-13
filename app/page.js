import Image from "next/image";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import TrustStrip from "@/components/TrustStrip";
import { getService, getServicesByPlatform } from "@/lib/services";
import { packageIncludes } from "@/lib/business";
import PackagePicker from "@/components/PackagePicker";
import { tools } from "@/lib/tools";

const homeTitle = "Buy TikTok Followers, Likes & Views USA | SmFame";
const homeDescription = `Buy TikTok followers, likes and views in the USA from ${getService("buy-tiktok-likes").start}. Up to 1M views, no password required and a 30-day drop replacement on followers.`;

export const metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "https://smfame.us/",
    images: [{ url: "/og/home.webp", width: 1200, height: 630, alt: "Buy TikTok followers, likes and views — SmFame" }],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: ["/og/home.webp"],
  },
};

const primaryServices = [
  {
    slug: "buy-tiktok-followers",
    anchor: "tiktok-followers",
    kicker: "Profile growth",
    heading: "Buy TikTok followers",
    intro:
      "Followers are the first number people see when they open your profile. A follower package works best for a TikTok account that already posts regularly and wants its profile to match the quality of its videos before a launch, a brand pitch or a new content series.",
    points: [
      "Order with your public TikTok username — never a password",
      "Choose a quantity that fits your current audience size",
      "Keep the profile public and the username unchanged during delivery",
    ],
  },
  {
    slug: "buy-tiktok-likes",
    anchor: "tiktok-likes",
    kicker: "Post engagement",
    heading: "Buy TikTok likes",
    intro:
      "Likes are tied to one video, so they suit a specific moment: a product launch, a trend you joined early or a clip you want to pin. Pick the video first, then choose a like package that looks natural next to its current views.",
    points: [
      "Order with the public link of one TikTok video",
      "Match the like count to the video's existing views",
      "Use it on content you would pin or promote anyway",
    ],
  },
  {
    slug: "buy-tiktok-views",
    anchor: "tiktok-views",
    kicker: "Video reach",
    heading: "Buy TikTok views",
    intro:
      "Views are the lowest-cost TikTok signal and the easiest one to keep in proportion. They help a new upload avoid sitting at a very low count while you test a hook, a format or a paid campaign alongside it.",
    points: [
      "Order with the public link of the video",
      "Start small on new uploads and compare against your usual views",
      "Watch retention and profile visits in TikTok analytics afterwards",
    ],
  },
];

const tiktokGuides = [
  {
    title: "Pick the signal that matches the goal",
    paragraphs: [
      "Followers change how a profile looks. Views and likes change how one video looks. Comments and shares add visible conversation and distribution. Decide which of those you actually need before you look at quantities, and you will rarely overspend.",
      "If you are preparing a profile for a brand pitch, start with followers. If you are launching one video, start with views and likes on that video only.",
    ],
  },
  {
    title: "Use your own numbers as the baseline",
    paragraphs: [
      "Open TikTok analytics and note your follower count, the average views of your last ten videos and your typical like rate. A package that roughly doubles a small number looks believable; one that multiplies it by fifty does not.",
      "Write the baseline down before you order. It is the only way to tell later what the package added and what your content earned on its own.",
    ],
  },
  {
    title: "Fix the profile before adding attention",
    paragraphs: [
      "More visible numbers bring more profile visits, so make the visit count. Use a clear profile photo, a bio that says who the account is for, a working link and two or three pinned videos that represent your best work.",
      "Check the account is public, not age-restricted and not set to private, and that the username will not change while an order is active.",
    ],
  },
  {
    title: "Keep posting — packages do not replace content",
    paragraphs: [
      "TikTok still decides distribution from watch time, rewatches, shares and how people respond to each video. A growth package can support a launch, but consistent posting, strong hooks and searchable captions are what keep an account growing.",
      "No provider can guarantee For You page placement, virality or sales. SmFame packages describe a visible quantity on a public destination, and we say so plainly.",
    ],
  },
];

const homeFaqs = [
  { q: "Is it safe to buy TikTok followers from SmFame?", a: "SmFame only asks for your public TikTok username or video link. We never ask for your password, login code or email access. Keep orders proportionate to your current audience and keep posting original content; no provider can control TikTok's own review systems." },
  { q: "Do you need my TikTok password?", a: "No. Followers need a public username. Likes and views need the public link to one video. Never share a password, verification code or recovery code with any growth service." },
  { q: "How many TikTok followers should I buy first?", a: "Compare packages with your current follower count. Smaller accounts usually start with 100 or 500 followers so the change looks proportionate; larger accounts can choose bigger packages. Review the result before ordering again." },
  { q: "Should I buy TikTok likes or TikTok views?", a: "Views are the lower-cost signal for helping a new upload look active. Likes add stronger social proof to one video you want to push. Many creators start with views on a new video and add likes only to the clips they pin or promote." },
  { q: "Will buying TikTok views make my video go viral?", a: "No. Views add a visible count to one public video. Whether TikTok shows the video to more people depends on watch time, rewatches, shares and audience response, which come from the content itself." },
  { q: "Do you serve customers outside the United States?", a: "SmFame is built for creators and businesses in the United States, with prices in US dollars. Orders use public TikTok destinations, so the account itself must be public and reachable." },
  { q: "Do you also sell Instagram and Facebook services?", a: "Yes. Alongside TikTok, SmFame offers Instagram followers, likes, views, comments, Story views and Live views, plus Facebook followers, Page likes and post likes." },
];

export default function HomePage() {
  const primary = primaryServices.map((item) => ({ ...item, service: getService(item.slug) }));
  const primarySlugs = primaryServices.map((item) => item.slug);
  const moreTiktok = getServicesByPlatform("tiktok").filter((service) => !primarySlugs.includes(service.slug));
  const instagramFollowers = getService("buy-instagram-followers");
  const otherPlatforms = ["buy-instagram-likes", "buy-facebook-page-likes"].map(getService);
  const tiktokFrom = primary.map((item) => item.service.start);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://smfame.us/#webpage",
        url: "https://smfame.us/",
        name: homeTitle,
        description: homeDescription,
        isPartOf: { "@id": "https://smfame.us/#website" },
        about: { "@id": "https://smfame.us/#organization" },
        inLanguage: "en-US",
      },
      {
        "@type": "ItemList",
        name: "TikTok growth services",
        itemListElement: getServicesByPlatform("tiktok").map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `Buy ${service.name}`,
          url: `https://smfame.us/${service.slug}/`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: homeFaqs.map((faq) => ({
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
      <section className="hero">
        <div className="hero-glow hero-glow-one"></div>
        <div className="hero-glow hero-glow-two"></div>
        <div className="shell hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span>♪</span> TikTok growth · United States</div>
            <h1>Buy TikTok followers, likes &amp; views <em>in the USA.</em></h1>
            <p>Clear TikTok packages for US creators, shops and brands. Pay in US dollars, order with a public username or video link, never share your password — and get a 30-day drop replacement on followers.</p>
            <div className="hero-actions">
              <a className="button" href="#tiktok-followers">Buy TikTok followers <span>↓</span></a>
              <Link className="button button-ghost" href="/tiktok-services">All TikTok services</Link>
            </div>
            <div className="micro-proof"><span><b>Followers from {tiktokFrom[0]} · Likes from {tiktokFrom[1]} · Views from {tiktokFrom[2]}</b><br/><small>All prices in USD. No password required.</small></span></div>
          </div>
          <figure className="hero-image-visual">
            <Image
              src="/images/home-social-growth.webp"
              alt="Social media audience and engagement growth illustration for SmFame"
              width={1672}
              height={941}
              sizes="(max-width: 1000px) 100vw, 48vw"
              priority
            />
          </figure>
        </div>
      </section>

      <TrustStrip />

      {primary.map(({ service, anchor, kicker, heading, intro, points }, sectionIndex) => (
        <section className={`section shell home-service-block ${sectionIndex % 2 ? "alt" : ""}`} id={anchor} key={service.slug}>
          <div className="section-head split-head">
            <div><span className="kicker">{kicker} · From {service.start}</span><h2>{heading}</h2></div>
            <div className="home-service-intro">
              <p>{intro}</p>
              <ul>{points.map((point) => <li key={point}>{point}</li>)}</ul>
            </div>
          </div>
          <PackagePicker
            slug={service.slug}
            name={service.name}
            platformMark="♪"
            platformName="TikTok"
            packages={service.packages}
            popular={service.popular}
            includes={packageIncludes(service)}
          />
          <div className="center-action"><Link className="text-link" href={`/${service.slug}`}>Full {service.name} guide, packages &amp; FAQs <span>↗</span></Link></div>
        </section>
      ))}

      <section className="section shell">
        <div className="section-head split-head">
          <div><span className="kicker">More TikTok services</span><h2>Comments, shares, LIVE and automatic campaigns</h2></div>
          <p>Use these when a campaign needs more than followers, likes or views — visible conversation, extra shares, audience presence during a LIVE, or steady support for every new upload.</p>
        </div>
        <div className="service-grid">{moreTiktok.map((service) => <ServiceCard key={service.slug} service={service} />)}</div>
        <div className="center-action"><Link className="button button-dark" href="/tiktok-services">See every TikTok service <span>↗</span></Link></div>
      </section>

      <section className="section shell process-section">
        <div className="process-intro"><span className="kicker">Simple by design</span><h2>Order TikTok growth in three steps.</h2><p>No account access and no complicated dashboard — a package, a public link and a confirmation you can follow up on.</p></div>
        <div className="steps">
          <div className="step"><span>01</span><div className="step-icon">⌁</div><h3>Choose a package</h3><p>Pick followers, likes or views and a quantity that fits your current account.</p></div>
          <div className="step"><span>02</span><div className="step-icon">↗</div><h3>Add your username or link</h3><p>Followers need your public username. Likes and views need one public video link.</p></div>
          <div className="step"><span>03</span><div className="step-icon">✓</div><h3>Check out in USD</h3><p>Confirm the total in US dollars and keep your order email for support.</p></div>
        </div>
      </section>

      <section className="section home-guide-section">
        <div className="shell">
          <div className="section-head home-guide-head">
            <span className="kicker">TikTok buyer guide</span>
            <h2>How to buy TikTok followers, likes and views sensibly</h2>
            <p>A visible number can support a TikTok campaign. These four checks keep the package proportionate and make the result easy to measure.</p>
          </div>
          <div className="home-guide-grid">
            {tiktokGuides.map((guide, index) => (
              <article key={guide.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{guide.title}</h3>
                {guide.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell home-tools-section">
        <div className="section-head split-head">
          <div><span className="kicker">Free TikTok tools</span><h2>Plan your next post for free</h2></div>
          <p>Generate hashtags, captions and bios, or check your engagement rate before choosing a package. No sign-up needed.</p>
        </div>
        <div className="tools-grid">
          {tools.map((tool) => (
            <Link className="tool-card" href={`/free-tools/${tool.slug}`} key={tool.slug}>
              <span className="tool-icon">{tool.icon}</span>
              <h3>{tool.name}</h3>
              <p>{tool.short}</p>
              <b>Use free tool ↗</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="section shell home-crossplatform">
        <div className="section-head split-head">
          <div><span className="kicker">Instagram &amp; Facebook</span><h2>Need Instagram followers too?</h2></div>
          <p>SmFame also offers Instagram followers from {instagramFollowers.start}, plus Instagram and Facebook engagement packages. The same rules apply: public profile, no password and clear US dollar pricing.</p>
        </div>
        <div className="service-grid">
          <ServiceCard service={instagramFollowers} />
          {otherPlatforms.map((service) => <ServiceCard key={service.slug} service={service} />)}
        </div>
        <div className="center-action home-platform-links">
          <Link className="text-link" href="/buy-instagram-followers">Buy Instagram followers <span>↗</span></Link>
          <Link className="text-link" href="/instagram-services">All Instagram services <span>↗</span></Link>
          <Link className="text-link" href="/facebook-services">All Facebook services <span>↗</span></Link>
        </div>
      </section>

      <section className="section home-faq-section">
        <div className="shell faq-grid">
          <div className="faq-intro"><span className="kicker">Start informed</span><h2>TikTok growth questions, answered</h2><p>Straight answers about safety, passwords, package size and what a TikTok package can and cannot do.</p><Link className="text-link" href="/contact-us">Ask SmFame support <span>↗</span></Link></div>
          <div className="faq-list">{homeFaqs.map((faq, index) => <details key={faq.q} open={index === 0}><summary>{faq.q}<span>+</span></summary><p>{faq.a}</p></details>)}</div>
        </div>
      </section>

      <section className="section shell">
        <div className="cta-panel">
          <div><span className="kicker light">Ready when you are</span><h2>Give your next TikTok a stronger start.</h2><p>Choose followers, likes or views and build the package around the content you want people to notice.</p></div>
          <a className="button button-white" href="#tiktok-followers">Choose a TikTok package <span>↑</span></a>
        </div>
      </section>
    </>
  );
}
