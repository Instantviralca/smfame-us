import { services } from "@/lib/services";
import { guides } from "@/lib/guides";
import { tools } from "@/lib/tools";

const baseUrl = "https://smfame.us";
const contentUpdated = new Date("2026-10-07");
const withSlash = (route) => `${baseUrl}${route}/`.replace(/\/\/$/, "/");

export default function sitemap() {
  const staticRoutes = [
    ["", 1],
    ["/services", 0.9],
    ["/tiktok-services", 0.9],
    ["/instagram-services", 0.9],
    ["/facebook-services", 0.8],
    ["/guides", 0.7],
    ["/free-tools", 0.7],
    ["/about-us", 0.5],
    ["/contact-us", 0.5],
    ["/privacy-policy", 0.2],
    ["/terms-of-service", 0.2],
    ["/refund-policy", 0.2],
    ["/cookie-policy", 0.2],
    ["/dmca-policy", 0.2],
  ];

  return [
    ...staticRoutes.map(([route, priority]) => ({
      url: withSlash(route),
      lastModified: contentUpdated,
      changeFrequency: route.includes("policy") || route.includes("terms") ? "yearly" : "monthly",
      priority,
    })),
    ...services.map((service) => ({
      url: withSlash(`/${service.slug}`),
      lastModified: contentUpdated,
      changeFrequency: "weekly",
      priority: service.platform === "tiktok" ? 0.9 : 0.8,
    })),
    ...guides.map((guide) => ({
      url: withSlash(`/guides/${guide.slug}`),
      lastModified: new Date(guide.dateModified),
      changeFrequency: "monthly",
      priority: 0.6,
      images: [`${baseUrl}${guide.image}`],
    })),
    ...tools.map((tool) => ({
      url: withSlash(`/free-tools/${tool.slug}`),
      lastModified: contentUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];
}
