import { services, platformMeta } from "@/lib/services";

const published = "2026-10-06";
const publishedLabel = "October 6, 2026";

const platformResources = {
  tiktok: { label: "TikTok Help Center", href: "https://support.tiktok.com/en/" },
  instagram: { label: "Instagram Help Center", href: "https://help.instagram.com/" },
  facebook: { label: "Facebook Help Center", href: "https://www.facebook.com/help/" },
};

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function indefiniteArticle(value) {
  return /^[aeiou]/i.test(value) ? "an" : "a";
}

function cleanTarget(service) {
  return service.target.replace(/^your /, "");
}

function destinationContext(service) {
  if (service.slug.includes("live-views")) return "an active public broadcast";
  if (service.slug.includes("story-views")) return "an active public Story and the correct public profile";
  if (service.slug.includes("comment-likes")) return "the exact public comment and its parent video";
  if (service.slug.includes("auto-")) return "a public profile whose eligible new uploads will receive recurring support";
  if (service.target.includes("link") || service.target.includes("post") || service.target.includes("Reel")) return "the exact public content URL";
  return "the exact public profile or Page";
}

function timingContext(service) {
  if (service.slug.includes("live-views")) return "The broadcast must already be live, public and reachable when the order is submitted. Live delivery is time-sensitive and cannot be moved to a replay.";
  if (service.slug.includes("story-views")) return "A Story has a limited availability window, so the destination should be live and public before checkout. Ordering late leaves less time for eligible delivery.";
  if (service.slug.includes("auto-")) return "Automatic support applies to eligible new public uploads during the selected campaign window. Review the post allowance, per-post amount and stop conditions before checkout.";
  return "Keep the submitted destination public and unchanged while delivery is active. Renaming a profile, deleting content or switching privacy settings can interrupt verification.";
}

function organicMetrics(service) {
  if (service.slug.includes("live-views")) return ["peak and average live viewers", "watch duration", "comments or questions", "profile visits after the broadcast"];
  if (service.outcome.toLowerCase().includes("profile") || service.name.includes("Followers") || service.name.includes("Page Likes")) return ["profile or Page visits", "organic follows", "link clicks", "messages or inquiries"];
  if (service.name.includes("Views")) return ["watch time", "completion rate", "rewatches", "profile visits"];
  if (service.name.includes("Comments")) return ["genuine replies", "creator responses", "profile visits", "conversation quality"];
  if (service.name.includes("Shares")) return ["organic reach", "saves", "profile visits", "follow-on engagement"];
  return ["content views", "organic engagement", "profile visits", "link or message actions"];
}

function imageFor(service, type) {
  if (type === "before" || type === "mistakes") return "/guides/are-social-media-growth-services-safe.webp";
  if (type === "measurement") return "/guides/measure-tiktok-growth-campaign.webp";
  if (type === "campaign") return "/guides/social-media-campaign-checklist.webp";
  if (service.platform === "instagram") return "/guides/instagram-followers-vs-likes-vs-views.webp";
  if (service.platform === "facebook") return "/guides/facebook-page-likes-vs-followers.webp";
  return "/guides/choose-right-tiktok-follower-package.webp";
}

const platformImages = {
  tiktok: [
    "/guides/tiktok-followers-vs-views-vs-likes.webp",
    "/guides/choose-right-tiktok-follower-package.webp",
  ],
  instagram: [
    "/guides/instagram-followers-vs-likes-vs-views.webp",
    "/guides/instagram-story-views-vs-reel-views.webp",
  ],
  facebook: [
    "/guides/facebook-page-likes-vs-followers.webp",
    "/guides/social-media-campaign-checklist.webp",
  ],
};

const supportingImages = [
  "/guides/measure-tiktok-growth-campaign.webp",
  "/guides/social-media-campaign-checklist.webp",
  "/guides/are-social-media-growth-services-safe.webp",
];

function imagesFor(service, type) {
  return [imageFor(service, type), ...platformImages[service.platform], ...supportingImages]
    .filter((image, index, images) => images.indexOf(image) === index)
    .slice(0, 3);
}

function sharedFaqs(service) {
  const platform = platformMeta[service.platform].name;
  return [
    { q: `Do I need to share my ${platform} password for ${service.label}?`, a: `No. A SmFame order uses ${service.target}; passwords, recovery codes and two-factor authentication codes are not required.` },
    { q: `How many ${service.label} should I choose?`, a: `There is no universal quantity. Compare the package with the destination's current count, recent performance and one documented campaign goal. A measured starting package is easier to evaluate than an unexplained jump.` },
    { q: `Does ${service.label} guarantee organic reach or sales?`, a: `No. ${service.limits} Organic reach, recommendation, audience behavior and commercial results remain outside the package.` },
    { q: `What destination should stay public?`, a: `Keep ${destinationContext(service)} public, correctly spelled and unchanged while the order is active.` },
    { q: `Can I run overlapping orders on the same destination?`, a: `Avoid overlapping campaigns from multiple providers. Overlap makes delivery, troubleshooting and attribution difficult to verify.` },
  ];
}

function packageSections(service) {
  const platform = platformMeta[service.platform].name;
  return [
    {
      title: "Start with the campaign job, not the biggest number",
      paragraphs: [
        `A useful ${service.label} package has one job: support ${service.intent}. Write that job in one sentence before comparing quantities. The sentence should identify the destination, the visible signal and the date when the result will be reviewed. This keeps the decision connected to a real campaign instead of a number chosen only because it looks impressive.`,
        `${capitalize(service.bestFor[0])}, ${service.bestFor[1]} and ${service.bestFor[2]} can all use the same service for different reasons. The quantity should follow the reason. If the destination is new or lightly active, a smaller baseline usually creates a cleaner test than a large change with no supporting content plan.`,
      ],
    },
    {
      title: "Record the current destination baseline",
      paragraphs: [
        `Open ${destinationContext(service)} and record the visible count before checkout. Add the date, recent ${platform} posting activity and the normal range of comparable content. This baseline gives the final number context and prevents later organic activity from being confused with package delivery.`,
        `For profile-level services, review the bio, public posts and profile links. For post-level services, save the current views, likes, comments or shares visible on that content. The purpose is not to calculate a universal ratio; it is to understand what would look proportionate beside this specific destination.`,
      ],
      bullets: ["Exact public destination", "Starting visible count", "Recent comparable performance", "Campaign start and review dates", "Other promotions running at the same time"],
    },
    {
      title: `Compare every ${service.name} package level`,
      paragraphs: [
        `SmFame lists ${service.packages.length} ${service.label} quantities with the full USD price visible before checkout. The entry option is useful for a first measured test, while the middle options fit more established destinations or defined launch periods. The largest option needs the clearest explanation and the strongest content foundation.`,
        `Price per unit should not be the only decision. Also compare the quantity with the current account size, the destination's recent performance and the campaign duration. A lower unit cost does not make a larger package appropriate when the surrounding profile or content is not ready for the change.`,
      ],
      bullets: service.packageGuide.map((pack) => `${pack.quantity} for ${pack.price} USD — ${pack.fit}`),
      link: { href: `/${service.slug}#packages`, label: `Compare ${service.name} packages` },
    },
    {
      title: "Match quantity to content readiness",
      paragraphs: [
        `${service.playbook} This recommendation matters because the package changes one visible signal while visitors still judge the bio, creative, offer and recent activity. Prepare those elements before delivery rather than expecting the number to repair an unclear destination.`,
        `Build a short content sequence around the same audience promise. A profile campaign should have representative public posts ready. A post campaign should use a complete caption, useful creative and a clear next action. Consistency makes the supported signal easier to understand when someone visits the destination.`,
      ],
    },
    {
      title: "Check timing and destination eligibility",
      paragraphs: [
        `${timingContext(service)} Copy ${cleanTarget(service)} directly instead of typing it from memory, then open it while signed out when possible. If the destination cannot be seen publicly, delivery and support review may be delayed.`,
        `Do not change the username, replace the URL or remove the content during an active campaign. If the campaign involves a team, document who owns the destination and who will monitor delivery so routine profile edits do not create an avoidable interruption.`,
      ],
    },
    {
      title: "Scale only after a reviewable first test",
      paragraphs: [
        `After delivery, compare the selected visible signal with its starting baseline. Then review ${organicMetrics(service).join(", ")} separately. These indicators explain the wider response, but they should not be presented as outcomes guaranteed by the package.`,
        `If the destination stayed stable, the quantity was delivered and the surrounding content performed coherently, another measured campaign may make sense. If the profile, creative or offer produced weak organic actions, improve that layer before increasing the next package.`,
      ],
      link: { href: "/guides/social-media-campaign-checklist", label: "Use the complete campaign checklist" },
    },
  ];
}

function beforeSections(service) {
  const platform = platformMeta[service.platform].name;
  return [
    {
      title: "Confirm exactly what the service changes",
      paragraphs: [
        `${service.name} supports ${service.outcome} on ${cleanTarget(service)}. It does not change every metric on the account and it should not be described as a complete growth strategy. Naming the exact signal protects the buyer from assuming that one visible count automatically creates followers, reach, leads or sales.`,
        `${service.limits} Keep that limitation in the campaign brief and in any client-facing report. Clear scope is more useful than a broad promise because the selected signal can be checked against the exact public destination after delivery.`,
      ],
    },
    {
      title: "Verify the public destination before checkout",
      paragraphs: [
        `The order should point to ${destinationContext(service)}. Copy the final ${cleanTarget(service)} and open it in a private browser window or while signed out. Confirm the name, profile image and content match the campaign before submitting anything.`,
        `${timingContext(service)} A private, deleted, region-restricted or misspelled destination can delay the order. Save the submitted value with the order reference so support can compare the same destination if a review becomes necessary.`,
      ],
      bullets: service.orderChecklist,
    },
    {
      title: "Keep account credentials private",
      paragraphs: [
        `A ${service.label} order does not require a ${platform} password, email password, recovery code, backup code or two-factor authentication code. The service uses only public destination information. A request for login credentials should be treated as a security warning.`,
        `Keep two-factor authentication enabled and review connected applications through the platform's official settings. Do not disable security controls for a provider. Password-free ordering protects account ownership while still giving the delivery team the public information needed to identify the destination.`,
      ],
      link: { href: "/guides/are-social-media-growth-services-safe", label: "Review the account safety checklist" },
    },
    {
      title: "Choose a proportionate package",
      paragraphs: [
        `Compare the available quantities with the destination's current size and recent performance. SmFame packages begin at ${service.packages[0].quantity} for ${service.packages[0].price} USD, but the entry package is a baseline rather than a universal recommendation. The right option depends on the account, content and campaign goal.`,
        `${service.playbook} Avoid choosing solely by the lowest price per unit. The package should make sense beside the existing public signal and the amount of original content available to support the campaign.`,
      ],
      link: { href: `/${service.slug}#packages`, label: `See current ${service.name} pricing` },
    },
    {
      title: "Set realistic outcome boundaries",
      paragraphs: [
        `No provider can guarantee ${platform} recommendation, permanent audience behavior, creator-program eligibility, sponsorship approval, leads or revenue. The platform and its users control those outcomes. Treat the package as support for one visible signal, not proof that a business result will happen.`,
        `Use cautious language such as delivered count, observed change and organic follow-on activity. This separates what can be verified from what may have been influenced by content quality, timing, advertising, trend participation or audience interest.`,
      ],
    },
    {
      title: "Save the order and measurement record",
      paragraphs: [
        `Before checkout, save the destination, starting count, package quantity, USD total and campaign goal. After ordering, keep the receipt and order reference. These details give support a reliable timeline and make it easier to distinguish delivery from unrelated organic changes.`,
        `At the review date, record the final public count and ${organicMetrics(service).join(", ")}. Write one next action based on the content and profile response. A documented decision is more valuable than assuming every later change came from the order.`,
      ],
      link: { href: "/contact-us", label: "Contact SmFame support" },
    },
  ];
}

function campaignSections(service) {
  const platform = platformMeta[service.platform].name;
  return [
    {
      title: "Define the audience and campaign promise",
      paragraphs: [
        `This playbook is built around ${service.bestFor[0]}. Start by naming the audience, the problem or interest that brings them to the destination and the action they should take next. A visible ${service.label} count is easier to support when the profile or content already communicates a focused promise.`,
        `Write one primary objective connected to ${service.intent}. Do not combine virality, follower growth, sales and community response into one target. The campaign can observe several metrics, but one primary question keeps package selection and reporting understandable.`,
      ],
    },
    {
      title: "Prepare the destination before adding support",
      paragraphs: [
        `Review ${destinationContext(service)} as a first-time visitor would. Confirm the name, image, description, caption, public visibility and any link or call to action. Remove broken links and make sure the surrounding content represents the topic promised by the campaign.`,
        `${timingContext(service)} The destination should be complete before the order begins. Editing the core creative or changing the profile identity during delivery makes the campaign harder to evaluate and may interrupt destination matching.`,
      ],
      bullets: ["Public and reachable destination", "Clear audience promise", "Complete creative or profile", "Working next-step link", "No planned destination change"],
    },
    {
      title: `Build the ${platform} content sequence`,
      paragraphs: [
        `${service.playbook} Prepare content for before, during and after the campaign rather than treating the supported destination as an isolated post. The opening piece explains the topic, the middle pieces add proof or examples and the final piece answers questions or directs visitors toward the next action.`,
        `Keep the format and audience consistent enough to learn from the result. Sudden changes in niche, visual style or offer can make it difficult to understand whether a follow-on action came from the campaign or from a completely different message.`,
      ],
    },
    {
      title: "Select a measured package and review window",
      paragraphs: [
        `Use the starting public count and recent comparable performance to choose among ${service.packages.map((pack) => pack.quantity).join(", ")}. A measured first package creates a clearer baseline, while larger quantities should be tied to a documented launch or established destination.`,
        `Choose a review date that fits the service. Time-sensitive formats should be checked while they are active, while profile and post campaigns can use a consistent multi-day window. Keep other promotions in the report so they are not mistakenly attributed to the package.`,
      ],
      link: { href: `/${service.slug}#packages`, label: `Choose a ${service.name} package` },
    },
    {
      title: "Monitor delivery without changing the test",
      paragraphs: [
        `During delivery, keep the destination public and avoid overlapping orders on the same URL or profile. Save support messages and use the order reference when asking a question. These habits make troubleshooting faster because the destination and timeline remain stable.`,
        `Continue normal community work: publish original content, answer genuine questions and moderate the account. Do not claim that the package created organic comments, sales or recommendation. Those outcomes require separate evidence and remain dependent on the audience and platform.`,
      ],
    },
    {
      title: "Turn the result into the next content decision",
      paragraphs: [
        `Compare the delivered signal with the baseline, then review ${organicMetrics(service).join(", ")}. Identify one element to keep and one element to change. The next test might refine the opening creative, profile bio, posting time, offer or call to action rather than simply increasing quantity.`,
        `${service.limits} A campaign becomes more useful when it produces a decision log, not just a screenshot. Keep the scope honest and use the observed response to improve the next piece of original content.`,
      ],
      link: { href: "/guides/measure-tiktok-growth-campaign", label: "Use the measurement framework" },
    },
  ];
}

function measurementSections(service) {
  const metrics = organicMetrics(service);
  return [
    {
      title: "Write one measurable objective",
      paragraphs: [
        `A ${service.label} report should begin with one question tied to ${service.intent}. Name the public destination, selected quantity and review date. An objective such as support a specific launch post is easier to evaluate than a broad request to grow the entire account.`,
        `Keep the visible service signal separate from business outcomes. Revenue, leads, sponsorships and platform recommendation may matter to the wider campaign, but they are not delivered or guaranteed by the package and should not be merged with the order quantity.`,
      ],
    },
    {
      title: "Capture a timestamped baseline",
      paragraphs: [
        `Before checkout, record ${destinationContext(service)}, the visible count, the date and the normal performance of comparable content. Save the submitted ${cleanTarget(service)} exactly as entered. A screenshot can help, but a written record makes the numbers easier to compare in a report.`,
        `Also note paid ads, creator collaborations, email campaigns, launches or trend activity running at the same time. These factors may influence the same metrics and should be visible when the final result is interpreted.`,
      ],
      bullets: ["Destination and starting count", "Package quantity and USD price", "Campaign start and review dates", "Recent organic range", "Other active promotions"],
    },
    {
      title: "Separate delivery from organic performance",
      paragraphs: [
        `Delivery asks whether the selected ${service.label} quantity reached the correct public destination. Organic performance asks what real visitors did around that destination. The two observations can be shown together, but they should use separate labels so a client or team does not confuse correlation with guaranteed causation.`,
        `${service.limits} Confirm the package scope first, then use native analytics for the wider response. This creates a report that is both useful and honest about what the service can and cannot explain.`,
      ],
      link: { href: `/${service.slug}`, label: `Review the ${service.name} service scope` },
    },
    {
      title: "Review the closest organic indicators",
      paragraphs: [
        `The most useful supporting indicators for this campaign are ${metrics.join(", ")}. Use the same reporting window for every comparison. A single day should not be casually compared with a full week unless the difference is clearly labelled.`,
        `Look for patterns rather than one dramatic point. If the visible signal changed but visitors did not take the intended next action, the creative, profile positioning, audience fit or offer may need improvement before another package is considered.`,
      ],
      bullets: metrics.map((metric) => `Track ${metric} in native platform analytics when available`),
    },
    {
      title: "Avoid attribution errors",
      paragraphs: [
        `Do not claim that the package caused every later follow, comment, sale or recommendation. New content, paid ads, outside mentions and seasonal demand can affect the same destination. Use language such as delivered count, observed change and possible contributing factor.`,
        `If the campaign uses tracking links, unique offers or a controlled time window, include that evidence without overstating it. Strong reporting explains the limits of the data instead of turning a visible count into a promise the platform never made.`,
      ],
    },
    {
      title: "Create a repeatable decision log",
      paragraphs: [
        `Finish the report with the baseline, delivered quantity, organic indicators, notable outside events and one next test. Save the order reference and destination so future campaigns can be compared against the same type of record.`,
        `The next action might be to improve the profile, rewrite the content opening, change the offer, select a smaller package or pause until the destination is stronger. Measurement is valuable when it changes the next decision, not when it merely confirms that a public number moved.`,
      ],
      link: { href: "/guides/social-media-campaign-checklist", label: "Open the pre-campaign checklist" },
    },
  ];
}

function mistakeSections(service) {
  const mistakes = [
    ["Choosing a quantity before defining the goal", `A package should support ${service.intent}. Write the destination, signal and review date first; otherwise the largest number can become the plan even when it does not fit the account.`],
    ["Submitting the wrong or private destination", `Verify ${destinationContext(service)} while signed out and copy ${cleanTarget(service)} directly. Misspellings, private settings or deleted content can interrupt delivery.`],
    ["Ignoring the current account baseline", `Compare the quantity with the existing public count and recent performance. Proportionality creates a cleaner test than a change with no connection to the destination's history.`],
    ["Running overlapping orders", "Do not place several orders or use multiple providers on the same destination at the same time. Overlap makes fulfillment and support review difficult to separate."],
    ["Changing the destination during delivery", timingContext(service)],
    ["Treating the package as a guarantee", `${service.limits} Do not promise recommendation, virality, leads or revenue on the basis of one visible signal.`],
    ["Skipping the final campaign record", `Save the starting count, order reference, final count and ${organicMetrics(service).join(", ")}. Without a record, the team cannot reliably explain what changed or plan the next test.`],
  ];
  return mistakes.map(([title, detail], index) => ({
    title: `${index + 1}. ${title}`,
    paragraphs: [
      detail,
      index === 0
        ? `${service.playbook} The correction is to connect every quantity to a specific public destination and a realistic purpose.`
        : index === 5
          ? "The correction is clear scope: verify package delivery separately and describe organic or commercial activity only as observed data."
          : "The correction is simple documentation: keep the destination stable, record the decision and review the result against the same baseline.",
    ],
    link: index === 2 ? { href: `/${service.slug}#packages`, label: `Review ${service.name} package options` } : undefined,
  }));
}

const blueprints = [
  {
    key: "package",
    slug: "package-size-guide",
    category: "Package planning",
    title: (service) => `How Many ${service.name} Should You Choose? A Package Framework`,
    description: (service) => `Choose a proportionate ${service.label} package using the destination baseline, campaign goal, content readiness and a reviewable measurement plan.`,
    answer: (service) => `Choose ${service.label} by comparing the package with the destination's current count, recent performance and one specific campaign goal. Start with a measured option when you need a baseline, keep the destination public and scale only after reviewing delivery separately from organic results.`,
    sections: packageSections,
  },
  {
    key: "before",
    slug: "before-you-buy-checklist",
    category: "Buying checklist",
    title: (service) => `${service.name}: What to Check Before You Order`,
    description: (service) => `Check destination eligibility, package fit, password safety, timing and realistic outcomes before ordering ${service.label}.`,
    answer: (service) => `Before ordering ${service.label}, confirm the exact public destination, record its baseline, choose a proportionate quantity and keep all account credentials private. Save the order record and do not expect the package to guarantee recommendation, sales or other organic outcomes.`,
    sections: beforeSections,
  },
  {
    key: "campaign",
    slug: "campaign-plan",
    category: "Campaign playbook",
    title: (service) => `${service.name} Campaign Plan`,
    description: (service) => `Plan ${indefiniteArticle(service.name)} ${service.name} campaign for ${service.bestFor[0].toLowerCase()} with destination preparation, content timing, package selection and follow-up measurement.`,
    answer: (service) => `A useful ${service.label} campaign starts with a prepared public destination and one measurable goal. Build supporting content, select a quantity that fits the baseline, avoid changing the destination during delivery and use the final result to decide what content or profile element to improve next.`,
    sections: campaignSections,
  },
  {
    key: "measurement",
    slug: "measurement-guide",
    category: "Measurement",
    title: (service) => `How to Measure ${indefiniteArticle(service.name)} ${service.name} Campaign`,
    description: (service) => `Measure ${service.label} with a timestamped baseline, separate delivery and organic indicators, careful attribution and a repeatable campaign report.`,
    answer: (service) => `Measure a ${service.label} campaign in two layers: first verify the selected visible signal against its baseline, then review organic indicators in native analytics. Keep other promotions in the timeline and avoid claiming that the package caused every later audience or business action.`,
    sections: measurementSections,
  },
  {
    key: "mistakes",
    slug: "mistakes-to-avoid",
    category: "Campaign mistakes",
    title: (service) => `7 ${service.name} Campaign Mistakes to Avoid`,
    description: (service) => `Avoid the most common ${service.label} campaign mistakes involving goals, destinations, package size, overlapping orders and unrealistic expectations.`,
    answer: (service) => `The biggest ${service.label} mistakes are ordering without a goal, using the wrong destination, ignoring the current baseline, overlapping campaigns, changing visibility during delivery, expecting guaranteed organic outcomes and failing to save a before-and-after record.`,
    sections: mistakeSections,
  },
];

function buildArticle(service, blueprint) {
  const sections = blueprint.sections(service);
  const faqs = sharedFaqs(service);
  const images = imagesFor(service, blueprint.key);
  const text = [blueprint.answer(service), ...sections.flatMap((section) => section.paragraphs), ...faqs.flatMap((faq) => [faq.q, faq.a])].join(" ");
  const wordCount = text.trim().split(/\s+/).length;
  return {
    slug: `${service.slug.replace(/^buy-/, "")}-${blueprint.slug}`,
    serviceSlug: service.slug,
    platform: service.platform,
    platformName: platformMeta[service.platform].name,
    category: blueprint.category,
    type: blueprint.key,
    title: blueprint.title(service),
    description: blueprint.description(service),
    directAnswer: blueprint.answer(service),
    image: images[0],
    images,
    imageAlt: `${service.name} ${blueprint.category.toLowerCase()} editorial illustration`,
    datePublished: published,
    dateModified: published,
    publishedLabel,
    readingTime: `${Math.max(7, Math.ceil(wordCount / 190))} min read`,
    wordCount,
    sections,
    faqs,
    source: platformResources[service.platform],
  };
}

export const articles = services.flatMap((service) => blueprints.map((blueprint) => buildArticle(service, blueprint)));

export function getArticle(slug) {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesForService(serviceSlug) {
  return articles.filter((article) => article.serviceSlug === serviceSlug);
}

export function getRelatedArticles(article, limit = 4) {
  return articles
    .filter((item) => item.slug !== article.slug)
    .sort((a, b) => {
      const aScore = (a.serviceSlug === article.serviceSlug ? 4 : 0) + (a.platform === article.platform ? 2 : 0) + (a.type === article.type ? 1 : 0);
      const bScore = (b.serviceSlug === article.serviceSlug ? 4 : 0) + (b.platform === article.platform ? 2 : 0) + (b.type === article.type ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, limit);
}
