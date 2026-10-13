import Link from "next/link";
import Logo from "./Logo";
import { business, cityLine } from "@/lib/business";

const columns = [
  {
    title: "TikTok",
    links: [
      ["Followers", "/buy-tiktok-followers"],
      ["Likes", "/buy-tiktok-likes"],
      ["Views", "/buy-tiktok-views"],
      ["Comments", "/buy-tiktok-comments"],
      ["All TikTok", "/tiktok-services"],
      ["Free TikTok tools", "/free-tools"],
    ],
  },
  {
    title: "Instagram",
    links: [
      ["Followers", "/buy-instagram-followers"],
      ["Likes", "/buy-instagram-likes"],
      ["Views", "/buy-instagram-views"],
      ["Story Views", "/buy-instagram-story-views"],
      ["All Instagram", "/instagram-services"],
    ],
  },
  {
    title: "Facebook",
    links: [
      ["Followers", "/buy-facebook-followers"],
      ["Page Likes", "/buy-facebook-page-likes"],
      ["Post Likes", "/buy-facebook-post-likes"],
      ["All Facebook", "/facebook-services"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Guides", "/guides"],
      ["About us", "/about-us"],
      ["Contact", "/contact-us"],
      ["Refund policy", "/refund-policy"],
      ["Privacy", "/privacy-policy"],
      ["Terms", "/terms-of-service"],
      ["Cookie policy", "/cookie-policy"],
      ["DMCA policy", "/dmca-policy"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-lead">
          <Logo footer />
          <p>Simple, transparent social growth services for creators, brands and agencies across the United States.</p>
          <div className="footer-contact"><a href={`mailto:${business.email}`}>{business.email}</a>{business.phone && <a href={`tel:${business.phoneE164}`}>{business.phone}</a>}<span>{cityLine()}, USA</span></div>
          <div className="footer-trust"><span>USD pricing</span><span>No password</span><span>{business.refillDays}-day follower refill</span></div>
        </div>
        {columns.map((column) => (
          <div className="footer-column" key={column.title}>
            <h3>{column.title}</h3>
            {column.links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
          </div>
        ))}
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} SmFame. All rights reserved.</span>
        <span>United States · English · USD</span>
      </div>
    </footer>
  );
}
