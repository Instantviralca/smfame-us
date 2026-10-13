import Link from "next/link";
import { platformMeta } from "@/lib/services";

export default function ServiceCard({ service }) {
  const platform = platformMeta[service.platform];
  return (
    <article className={`service-card ${service.platform}`}>
      <div className="service-card-top">
        <span className="platform-chip"><b>{platform.mark}</b>{platform.name}</span>
        <span className="starting">From {service.start}</span>
      </div>
      <h3>{service.name}</h3>
      <p>{service.summary}</p>
      <div className="service-card-meta"><span>✓ No password</span><span>✓ Clear pricing</span></div>
      <Link href={`/${service.slug}`} className="text-link">Explore packages <span>↗</span></Link>
    </article>
  );
}
