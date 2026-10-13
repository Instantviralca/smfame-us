// Single source of truth for business facts shown across the site.
// Values below were taken from the current live smfame.us pages
// (Contact Us + Terms & Conditions) on 2026-10-07. Edit here and every
// page, policy, FAQ and schema block updates automatically.
// Set any value to null to hide it from the site.

export const business = {
  name: "SmFame",
  url: "https://smfame.us",
  legalName: null, // e.g. "SmFame LLC" — add once confirmed
  email: "support@smfame.us",
  phone: "(520) 563-6320",
  phoneE164: "+15205636320",
  address: {
    locality: "Syracuse",
    region: "NY",
    postalCode: "13204",
    country: "US",
  },
  supportResponse: "Usually within one business day",

  // Guarantees (from live Terms & Conditions)
  refundIfNotStartedHours: 72, // full refund if delivery has not started within this window
  refillDays: 30, // replacement window for dropped followers
  refillMaxQuantity: 10000, // replacement cap per order

  // Optional — shown only when filled in
  typicalStart: null, // e.g. "Usually within 1–6 hours"
  reviewsUrl: null, // e.g. Trustpilot profile URL once live
  reviewsRating: null, // e.g. 4.8 — only from a real, verifiable review source
  reviewsCount: null,
};

export function cityLine() {
  const { locality, region, postalCode } = business.address;
  return [locality, [region, postalCode].filter(Boolean).join(" ")].filter(Boolean).join(", ");
}

// Followers-type services are covered by the drop replacement guarantee.
export function hasRefill(service) {
  return /followers/.test(service.slug);
}

export function guaranteeItems(service) {
  const items = [];
  items.push({
    title: "Order start",
    text: business.typicalStart
      ? `${business.typicalStart}. If delivery has not started within ${business.refundIfNotStartedHours} hours, you can request a full refund.`
      : `If delivery has not started within ${business.refundIfNotStartedHours} hours of purchase, you can request a full refund.`,
  });
  if (hasRefill(service)) {
    items.push({
      title: `${business.refillDays}-day drop replacement`,
      text: `Followers that drop within ${business.refillDays} days are replaced free, up to ${business.refillMaxQuantity.toLocaleString("en-US")} per order. Contact support with your order ID.`,
    });
  } else {
    items.push({
      title: "Delivery shortfalls",
      text: "If a verified part of your order is not delivered, support completes the remaining quantity or refunds the undelivered part.",
    });
  }
  items.push({
    title: "No password, ever",
    text: `We only need ${service.target}. SmFame never asks for passwords, login codes or account access.`,
  });
  items.push({
    title: "US support",
    text: `Email ${business.email}${business.phone ? ` or call ${business.phone}` : ""}. ${business.supportResponse}.`,
  });
  return items;
}

export function guaranteeFaqs(service) {
  const faqs = [
    {
      q: "What happens if my order does not start?",
      a: `If delivery has not started within ${business.refundIfNotStartedHours} hours of purchase and support has not contacted you about the order, you can request a full refund at ${business.email}.`,
    },
  ];
  if (hasRefill(service)) {
    faqs.push({
      q: "What if some followers drop?",
      a: `SmFame replaces dropped followers for ${business.refillDays} days after delivery, up to ${business.refillMaxQuantity.toLocaleString("en-US")} followers per order. Send your order ID to ${business.email} and keep the profile public so the replacement can be delivered.`,
    });
  }
  return faqs;
}

export function organizationSchema() {
  const { address } = business;
  return {
    "@type": "Organization",
    "@id": "https://smfame.us/#organization",
    name: business.name,
    ...(business.legalName ? { legalName: business.legalName } : {}),
    url: "https://smfame.us/",
    logo: "https://smfame.us/logo-smfame.webp",
    ...(business.email ? { email: business.email } : {}),
    ...(business.phoneE164 ? { telephone: business.phoneE164 } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    areaServed: { "@type": "Country", name: "United States" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      ...(business.email ? { email: business.email } : {}),
      ...(business.phoneE164 ? { telephone: business.phoneE164 } : {}),
      areaServed: "US",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.facebook.com/smfameus",
      "https://www.instagram.com/smfameus/",
      "https://www.pinterest.com/smfame078/",
    ],
  };
}

export function packageIncludes(service) {
  const destination = /username/i.test(service.target) ? "username" : /profile/i.test(service.target) ? "profile" : "link";
  return [
    `Public ${destination} only — no password`,
    hasRefill(service) ? `${business.refillDays}-day drop replacement` : "Shortfalls completed or refunded",
    `Full refund if not started within ${business.refundIfNotStartedHours}h`,
    "Total shown in USD before checkout",
  ];
}
