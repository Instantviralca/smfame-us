import { business, guaranteeFaqs } from "@/lib/business";

export const platformMeta = {
  tiktok: {
    name: "TikTok",
    eyebrow: "Built for the For You feed",
    title: "TikTok growth services",
    description: "Flexible TikTok packages for creators, artists, shops and brands that want stronger visibility across every campaign.",
    href: "/tiktok-services",
    mark: "♪",
  },
  instagram: {
    name: "Instagram",
    eyebrow: "Make every first impression count",
    title: "Instagram growth services",
    description: "Followers, engagement and view packages for profiles, Reels, Stories and live broadcasts.",
    href: "/instagram-services",
    mark: "◎",
  },
  facebook: {
    name: "Facebook",
    eyebrow: "Social proof for established brands",
    title: "Facebook growth services",
    description: "Audience and engagement packages for pages, posts and businesses serving customers across the United States.",
    href: "/facebook-services",
    mark: "f",
  },
};

const rawServices = [
  {
    slug: "buy-tiktok-followers",
    platform: "tiktok",
    name: "TikTok Followers",
    singular: "follower",
    headline: "Build a TikTok audience people notice",
    summary: "Strengthen your profile with high-retention follower packages delivered without passwords or complicated setup.",
    outcome: "profile authority",
    target: "your public TikTok username",
    quantities: ["100", "250", "500", "1,000", "2,500", "5,000", "10,000", "15,000", "50,000"],
    prices: ["$3.90", "$9.50", "$16.90", "$31.00", "$47.00", "$95.00", "$185.00", "$249.00", "$898.00"],
    popular: "1,000",
    catalog: "live",
  },
  {
    slug: "buy-tiktok-likes",
    platform: "tiktok",
    name: "TikTok Likes",
    singular: "like",
    headline: "Give standout TikToks stronger social proof",
    summary: "Add visible momentum to launches, trending clips and everyday posts with clearly priced TikTok likes.",
    outcome: "post engagement",
    target: "your public TikTok video link",
    quantities: ["100", "250", "500", "1,000", "3,000", "5,000", "10,000", "15,000"],
    prices: ["$2.65", "$4.45", "$8.99", "$11.65", "$26.05", "$44.95", "$80.05", "$99.99"],
    popular: "1,000",
    catalog: "live",
  },
  {
    slug: "buy-tiktok-views",
    platform: "tiktok",
    name: "TikTok Views",
    singular: "view",
    headline: "Put more momentum behind every TikTok",
    summary: "Increase visible play counts on priority videos with affordable packages built for quick campaign support.",
    outcome: "video visibility",
    target: "your public TikTok video link",
    quantities: ["2,500", "5,000", "10,000", "25,000", "50,000", "100,000", "500,000", "1,000,000"],
    prices: ["$2.65", "$5.15", "$6.85", "$15.75", "$29.50", "$49.00", "$175.00", "$347.00"],
    popular: "10,000",
    catalog: "live",
  },
  {
    slug: "buy-tiktok-comments",
    platform: "tiktok",
    name: "TikTok Comments",
    singular: "comment",
    headline: "Turn quiet posts into active conversations",
    summary: "Create more visible discussion around the TikToks that matter with natural-looking comment packages.",
    outcome: "conversation depth",
    target: "your public TikTok video link",
    quantities: ["10", "25", "50", "100"],
    prices: ["$2.99", "$6.49", "$11.99", "$21.99"],
  },
  {
    slug: "buy-tiktok-shares",
    platform: "tiktok",
    name: "TikTok Shares",
    singular: "share",
    headline: "Give great content a wider push",
    summary: "Add share momentum to launches, announcements and highly useful clips designed to travel beyond the first feed.",
    outcome: "distribution signals",
    target: "your public TikTok video link",
    quantities: ["100", "500", "1,000", "5,000"],
    prices: ["$1.79", "$5.49", "$9.49", "$34.99"],
  },
  {
    slug: "buy-tiktok-auto-likes",
    platform: "tiktok",
    name: "TikTok Auto Likes",
    singular: "auto like",
    headline: "Keep every new upload launch-ready",
    summary: "Automatically support eligible new posts with a consistent level of visible engagement—without placing a new order each time.",
    outcome: "always-on engagement",
    target: "your public TikTok username",
    quantities: ["100/post", "250/post", "500/post", "1,000/post"],
    prices: ["$5.99", "$11.99", "$19.99", "$34.99"],
  },
  {
    slug: "buy-tiktok-auto-views",
    platform: "tiktok",
    name: "TikTok Auto Views",
    singular: "auto view",
    headline: "Start new TikToks with visible momentum",
    summary: "Set a dependable view baseline for eligible new uploads and keep a busy content calendar moving.",
    outcome: "consistent video visibility",
    target: "your public TikTok username",
    quantities: ["1K/post", "2.5K/post", "5K/post", "10K/post"],
    prices: ["$4.99", "$8.99", "$14.99", "$24.99"],
  },
  {
    slug: "buy-tiktok-auto-comments",
    platform: "tiktok",
    name: "TikTok Auto Comments",
    singular: "auto comment",
    headline: "Open every post with a livelier thread",
    summary: "Add recurring conversation support to eligible new uploads for creator schedules that never slow down.",
    outcome: "recurring conversation",
    target: "your public TikTok username",
    quantities: ["10/post", "20/post", "30/post", "50/post"],
    prices: ["$7.99", "$13.99", "$19.99", "$29.99"],
  },
  {
    slug: "buy-tiktok-auto-shares",
    platform: "tiktok",
    name: "TikTok Auto Shares",
    singular: "auto share",
    headline: "Support distribution on every fresh upload",
    summary: "Keep a consistent share signal across eligible new TikToks with recurring, dashboard-tracked delivery.",
    outcome: "recurring distribution",
    target: "your public TikTok username",
    quantities: ["100/post", "250/post", "500/post", "1K/post"],
    prices: ["$6.49", "$11.49", "$17.99", "$29.99"],
  },
  {
    slug: "buy-tiktok-live-views",
    platform: "tiktok",
    name: "TikTok LIVE Views",
    singular: "live viewer",
    headline: "Make your next LIVE feel worth joining",
    summary: "Increase visible audience presence during launches, performances, Q&As and live shopping broadcasts.",
    outcome: "live audience presence",
    target: "your public TikTok LIVE link",
    quantities: ["100", "250", "500", "1,000"],
    prices: ["$3.99", "$7.99", "$13.99", "$24.99"],
  },
  {
    slug: "buy-tiktok-comment-likes",
    platform: "tiktok",
    name: "TikTok Comment Likes",
    singular: "comment like",
    headline: "Move the right comment to the top",
    summary: "Highlight important replies, punchlines and brand messages by adding likes to a specific TikTok comment.",
    outcome: "comment visibility",
    target: "your public TikTok comment link",
    quantities: ["100", "250", "500", "1,000"],
    prices: ["$1.99", "$3.99", "$6.99", "$11.99"],
  },
  {
    slug: "buy-instagram-followers",
    platform: "instagram",
    name: "Instagram Followers",
    singular: "follower",
    headline: "Build a profile that looks established",
    summary: "Strengthen first impressions for customers, partners and collaborators with high-retention Instagram follower packages.",
    outcome: "profile credibility",
    target: "your public Instagram username",
    quantities: ["100", "250", "500", "1,000", "2,500", "5,000", "10,000", "25,000", "50,000"],
    prices: ["$1.75", "$3.50", "$6.25", "$11.70", "$28.50", "$54.50", "$98.00", "$245.00", "$485.00"],
    popular: "1,000",
    catalog: "live",
  },
  {
    slug: "buy-instagram-likes",
    platform: "instagram",
    name: "Instagram Likes",
    singular: "like",
    headline: "Give your best posts stronger proof",
    summary: "Support Reels, photos and campaign posts with visible engagement delivered to the exact content you choose.",
    outcome: "post engagement",
    target: "your public Instagram post or Reel link",
    quantities: ["100", "250", "500", "1,000", "2,500", "5,000", "10,000", "25,000"],
    prices: ["$2.10", "$4.15", "$6.80", "$11.70", "$24.00", "$43.25", "$85.00", "$160.00"],
    popular: "1,000",
    catalog: "live",
  },
  {
    slug: "buy-instagram-views",
    platform: "instagram",
    name: "Instagram Views",
    singular: "view",
    headline: "Put your Reels in motion",
    summary: "Add visible plays to Reels and video posts with flexible packages built for everyday creators and larger campaigns.",
    outcome: "Reel visibility",
    target: "your public Instagram Reel or video link",
    quantities: ["500", "1,000", "2,500", "5,000", "10,000", "25,000", "50,000", "100,000"],
    prices: ["$1.80", "$3.00", "$6.30", "$13.50", "$22.09", "$45.00", "$67.50", "$130.00"],
    popular: "5,000",
    catalog: "live",
  },
  {
    slug: "buy-instagram-comments",
    platform: "instagram",
    name: "Instagram Comments",
    singular: "comment",
    headline: "Make campaign posts feel active",
    summary: "Add relevant conversation to posts and Reels where visible discussion helps shoppers and collaborators engage.",
    outcome: "community activity",
    target: "your public Instagram post or Reel link",
    quantities: ["10", "25", "50", "100"],
    prices: ["$11.99", "$27.99", "$51.99", "$97.99"],
    popular: "25",
    catalog: "live",
  },
  {
    slug: "buy-instagram-story-views",
    platform: "instagram",
    name: "Instagram Story Views",
    singular: "story view",
    headline: "Give every Story a bigger opening audience",
    summary: "Support launches, daily updates and limited-time offers with visible Story reach while the content is still live.",
    outcome: "Story reach",
    target: "your public Instagram username",
    quantities: ["500", "1,000", "2,500", "5,000"],
    prices: ["$1.99", "$3.49", "$6.99", "$11.99"],
  },
  {
    slug: "buy-instagram-live-views",
    platform: "instagram",
    name: "Instagram Live Views",
    singular: "live viewer",
    headline: "Bring more presence to Instagram Live",
    summary: "Create a stronger room for product reveals, interviews, tutorials and community broadcasts with live audience packages.",
    outcome: "live audience presence",
    target: "your public Instagram Live profile",
    quantities: ["100", "250", "500", "1,000"],
    prices: ["$4.49", "$8.49", "$14.99", "$26.99"],
  },
  {
    slug: "buy-facebook-followers",
    platform: "facebook",
    name: "Facebook Followers",
    singular: "follower",
    headline: "Build a larger audience around your Page",
    summary: "Strengthen the public footprint of a business, creator or organization with straightforward follower packages.",
    outcome: "Page credibility",
    target: "your public Facebook Page URL",
    quantities: ["250", "500", "1,000", "2,500", "5,000", "10,000", "15,000"],
    prices: ["$2.49", "$4.90", "$8.90", "$21.90", "$43.90", "$83.90", "$109.00"],
    popular: "1,000",
    catalog: "live",
  },
  {
    slug: "buy-facebook-page-likes",
    platform: "facebook",
    name: "Facebook Page Likes",
    singular: "Page like",
    headline: "Make your Facebook Page look established",
    summary: "Add visible Page support for businesses, public figures and community brands with secure, password-free ordering.",
    outcome: "Page social proof",
    target: "your public Facebook Page URL",
    quantities: ["100", "250", "500", "1,000", "2,500", "5,000", "10,000", "15,000"],
    prices: ["$1.70", "$4.10", "$8.00", "$14.00", "$25.00", "$43.00", "$80.00", "$99.00"],
    popular: "1,000",
    catalog: "live",
  },
  {
    slug: "buy-facebook-post-likes",
    platform: "facebook",
    name: "Facebook Post Likes",
    singular: "post like",
    headline: "Give important Facebook posts more proof",
    summary: "Support offers, announcements and campaign content with visible reactions on the exact post you select.",
    outcome: "post engagement",
    target: "your public Facebook post URL",
    quantities: ["100", "250", "500", "1,000", "2,500", "5,000", "10,000", "15,000"],
    prices: ["$1.70", "$4.10", "$8.00", "$14.00", "$25.00", "$42.00", "$80.00", "$99.00"],
    popular: "1,000",
    catalog: "live",
  },
];

const seoProfiles = {
  "buy-tiktok-followers": {
    primary: "buy TikTok followers",
    secondary: ["TikTok followers USA", "TikTok follower service", "increase TikTok followers", "TikTok profile growth"],
    intent: "a stronger profile-level first impression",
    bestFor: ["new creators building visible credibility", "artists and shops preparing a launch", "established accounts closing the gap between reach and follower count"],
    playbook: "Choose a total that fits your recent views and posting history, then keep publishing on the same topic so new visitors understand why they should follow.",
    limits: "A follower package changes the visible audience count; it does not replace watch time, posting consistency or a clear content niche.",
  },
  "buy-tiktok-likes": {
    primary: "buy TikTok likes",
    secondary: ["TikTok likes service", "increase TikTok likes", "TikTok engagement", "likes for TikTok videos"],
    intent: "visible engagement on priority videos",
    bestFor: ["product drops and campaign launches", "creator collaborations that need a stronger first glance", "proven videos with healthy watch time but light engagement"],
    playbook: "Put likes behind a small group of priority videos instead of every upload. Match the amount to the video's play count so the campaign reads consistently.",
    limits: "Likes can support social proof, but TikTok still evaluates content signals such as retention, rewatches and audience response independently.",
  },
  "buy-tiktok-views": {
    primary: "buy TikTok views",
    secondary: ["TikTok views service", "increase TikTok views", "TikTok video promotion", "boost TikTok video reach"],
    intent: "a more competitive visible play count",
    bestFor: ["new videos that need an initial visibility baseline", "older clips that still match an active campaign", "music, product and event videos used in reporting"],
    playbook: "Start with the videos that already have a strong opening hook. Views create a visible baseline, while the creative itself must earn retention and organic interaction.",
    limits: "Purchased views do not guarantee For You distribution, virality, sales or creator-program eligibility.",
  },
  "buy-tiktok-comments": {
    primary: "buy TikTok comments",
    secondary: ["TikTok comments service", "custom TikTok comments", "increase TikTok comments", "comments for TikTok videos"],
    intent: "a more active and useful conversation",
    bestFor: ["Q&A videos that invite opinions", "product demonstrations that benefit from buyer questions", "story-led posts where discussion adds context"],
    playbook: "Use comments that fit the video, brand voice and audience. A smaller relevant thread is more useful than a large set of repetitive reactions.",
    limits: "Comments work best when the creator stays involved. Reply, pin helpful questions and moderate anything that does not fit the conversation.",
  },
  "buy-tiktok-shares": {
    primary: "buy TikTok shares",
    secondary: ["TikTok shares service", "increase TikTok shares", "viral TikTok shares", "boost TikTok reach"],
    intent: "stronger visible distribution signals",
    bestFor: ["how-to clips people naturally pass along", "announcements, offers and event content", "emotion-led or highly relatable videos"],
    playbook: "Prioritize content with a clear reason to share: save time, make someone laugh, explain a problem or announce something timely.",
    limits: "Share counts can reinforce visible momentum, but they do not guarantee organic reach or a specific recommendation outcome.",
  },
  "buy-tiktok-auto-likes": {
    primary: "buy TikTok auto likes",
    secondary: ["automatic TikTok likes", "TikTok auto engagement", "likes on new TikTok posts", "recurring TikTok likes"],
    intent: "consistent like support on eligible new posts",
    bestFor: ["daily creators with a predictable upload schedule", "shops running recurring product content", "agencies maintaining repeatable client campaigns"],
    playbook: "Set a per-post amount that looks consistent with your normal reach. Review performance weekly and pause the campaign if your posting style or volume changes.",
    limits: "Auto likes cover eligible future posts during the selected campaign window; they are not a substitute for manual creative review.",
  },
  "buy-tiktok-auto-views": {
    primary: "buy TikTok auto views",
    secondary: ["automatic TikTok views", "views on new TikTok videos", "recurring TikTok views", "TikTok auto view service"],
    intent: "a repeatable view baseline for new uploads",
    bestFor: ["high-frequency content calendars", "series-based creators who publish on schedule", "brands that want consistent campaign reporting"],
    playbook: "Choose a baseline below your stronger organic posts, then use retention and completion data to decide which videos deserve additional promotion.",
    limits: "Auto views support eligible new public videos only and cannot predict how TikTok will distribute an individual upload.",
  },
  "buy-tiktok-auto-comments": {
    primary: "buy TikTok auto comments",
    secondary: ["automatic TikTok comments", "comments on new TikTok posts", "recurring TikTok comments", "TikTok comment automation"],
    intent: "an active opening thread on new posts",
    bestFor: ["creators who publish discussion-led series", "brands using every upload as a customer touchpoint", "campaign teams with an active moderation process"],
    playbook: "Plan recurring comment themes around common questions, reactions and calls to conversation, then review each thread as part of normal community management.",
    limits: "Automatic comments still need brand oversight. Keep your account public, moderate regularly and avoid prompts that could mislead viewers.",
  },
  "buy-tiktok-auto-shares": {
    primary: "buy TikTok auto shares",
    secondary: ["automatic TikTok shares", "shares on new TikTok videos", "recurring TikTok shares", "TikTok auto share service"],
    intent: "consistent share support across new uploads",
    bestFor: ["educational series built for repeat distribution", "music and entertainment accounts publishing frequently", "campaigns with a steady release calendar"],
    playbook: "Use a stable per-post share level and build each upload around a concrete takeaway, reveal or emotional beat worth sending to someone else.",
    limits: "Auto shares add a recurring delivery layer; actual reach and audience response remain dependent on the content and platform systems.",
  },
  "buy-tiktok-live-views": {
    primary: "buy TikTok LIVE views",
    secondary: ["TikTok live viewers", "increase TikTok live views", "TikTok LIVE audience", "live stream views"],
    intent: "a stronger visible audience while a broadcast is active",
    bestFor: ["live shopping and product demonstrations", "performances, interviews and Q&A sessions", "launches where the opening minutes matter"],
    playbook: "Schedule delivery for an active public LIVE, open with a clear promise and repeat the topic for people who join after the first few minutes.",
    limits: "LIVE delivery is time-sensitive. It requires an active public broadcast and cannot be applied to a replay after the session ends.",
  },
  "buy-tiktok-comment-likes": {
    primary: "buy TikTok comment likes",
    secondary: ["likes on TikTok comments", "boost TikTok comment visibility", "TikTok comment like service", "top comment engagement"],
    intent: "more visibility for one important comment",
    bestFor: ["pinned answers to common questions", "useful customer context or testimonials", "strong punchlines and creator replies"],
    playbook: "Select a comment that adds real value to the video. Pair it with a creator reply or pin it when available so the thread remains easy to follow.",
    limits: "Comment likes apply to the selected comment, not to the video itself, and visibility can vary as TikTok reorders conversations.",
  },
  "buy-instagram-followers": {
    primary: "buy Instagram followers",
    secondary: ["Instagram followers USA", "Instagram follower service", "increase Instagram followers", "Instagram profile growth"],
    intent: "a stronger profile impression for visitors and partners",
    bestFor: ["small businesses improving profile credibility", "creators preparing brand outreach", "artists and public figures growing a visible audience"],
    playbook: "Build gradually and keep your bio, Highlights and recent grid aligned. The profile should explain who it serves before the follower count supports that message.",
    limits: "Follower count can strengthen visible social proof, but it does not guarantee reach, sales, verification or partnership approval.",
  },
  "buy-instagram-likes": {
    primary: "buy Instagram likes",
    secondary: ["Instagram likes service", "likes for Instagram Reels", "increase Instagram likes", "Instagram post engagement"],
    intent: "stronger visible engagement on selected posts and Reels",
    bestFor: ["launch posts and product reveals", "Reels used in paid or partner campaigns", "portfolio content that represents the brand"],
    playbook: "Promote the posts that visitors are most likely to see first. Keep likes proportional to current views and follower count for a coherent profile.",
    limits: "Likes add visible engagement but do not replace saves, shares, watch time or comments from an interested audience.",
  },
  "buy-instagram-views": {
    primary: "buy Instagram views",
    secondary: ["buy Instagram Reel views", "Instagram views service", "increase Reel views", "Instagram video reach"],
    intent: "a stronger visible play count on Reels and videos",
    bestFor: ["Reels with a tested hook and clear topic", "campaign videos used as public proof", "older evergreen videos that still support the profile"],
    playbook: "Use views on Reels that deliver value in the first seconds, then compare retention, likes and profile visits before scaling the next package.",
    limits: "View delivery does not guarantee Explore placement, viral reach, sales or monetization eligibility.",
  },
  "buy-instagram-comments": {
    primary: "buy Instagram comments",
    secondary: ["Instagram comments service", "comments for Instagram Reels", "increase Instagram comments", "custom Instagram comments"],
    intent: "visible conversation around a post or Reel",
    bestFor: ["product launches that invite questions", "community prompts and opinion-led posts", "campaign assets where context improves buyer confidence"],
    playbook: "Choose relevant prompts, questions and reactions, then reply from the brand account so the thread becomes useful to later visitors.",
    limits: "Comments should be accurate, appropriate and moderated. They do not guarantee conversion or organic distribution.",
  },
  "buy-instagram-story-views": {
    primary: "buy Instagram Story views",
    secondary: ["Instagram Story views service", "increase Story views", "Instagram Story reach", "views for active Instagram Stories"],
    intent: "more visible reach while a Story is live",
    bestFor: ["24-hour launches and flash offers", "countdowns, link stickers and announcements", "daily behind-the-scenes Story sequences"],
    playbook: "Lead the Story sequence with the strongest frame, keep the message concise and place the action before viewers begin to drop off.",
    limits: "Story views require active public Stories. Expired Stories and Highlights follow different rules and may not be eligible.",
  },
  "buy-instagram-live-views": {
    primary: "buy Instagram Live views",
    secondary: ["Instagram live viewers", "increase Instagram Live views", "Instagram live audience", "live broadcast views"],
    intent: "a stronger visible room during an active broadcast",
    bestFor: ["live shopping and product walkthroughs", "interviews, tutorials and community Q&As", "time-sensitive reveals and events"],
    playbook: "Start the public broadcast before delivery, welcome late joiners and repeat the call to action at natural intervals.",
    limits: "This service is designed for an active public Live, not a Reel or replay, and cannot guarantee comments, sales or future reach.",
  },
  "buy-facebook-followers": {
    primary: "buy Facebook followers",
    secondary: ["Facebook followers service", "increase Facebook followers", "Facebook Page growth", "followers for a business Page"],
    intent: "a larger visible audience around a public Page",
    bestFor: ["local businesses building a public footprint", "creators expanding beyond short-form platforms", "organizations preparing awareness campaigns"],
    playbook: "Complete the Page details, publish recent updates and scale the follower package in steps that match your active customer base.",
    limits: "Followers support the Page's visible audience count; they do not guarantee post reach, reviews, leads or sales.",
  },
  "buy-facebook-page-likes": {
    primary: "buy Facebook Page likes",
    secondary: ["Facebook Page likes service", "increase Facebook Page likes", "business Page likes", "Facebook Page social proof"],
    intent: "stronger public support for a business or creator Page",
    bestFor: ["new business Pages building credibility", "public figures consolidating an audience", "community brands running local promotions"],
    playbook: "Use Page likes after the profile photo, About section, contact details and recent content are complete, so new visitors see an active destination.",
    limits: "A Page like is a profile-level signal and does not automatically create reactions on individual posts.",
  },
  "buy-facebook-post-likes": {
    primary: "buy Facebook post likes",
    secondary: ["Facebook post likes service", "increase Facebook post likes", "likes for Facebook posts", "Facebook post engagement"],
    intent: "stronger visible reactions on selected posts",
    bestFor: ["offers and product announcements", "event posts with a fixed campaign window", "important brand updates and proof content"],
    playbook: "Apply likes to public posts with a clear message and next step. Use the response as one signal alongside clicks, comments and shares.",
    limits: "Post likes affect the selected post only and do not guarantee wider feed distribution or business results.",
  },
};

const platformEditorial = {
  tiktok: {
    discovery: "TikTok discovery normally starts with an individual video, then moves to the profile when a viewer wants more context. A clear bio, recognizable niche and useful pinned videos help that second step make sense.",
    measurement: "Track profile views, follows generated by individual videos, average watch time and returning viewers together. A visible count is context; retention and repeat viewing show whether the content itself is earning attention.",
    readiness: "Review the profile photo, bio link, pinned clips and recent posting pattern before the campaign begins. A visitor should understand the topic and next action without scrolling through an unrelated archive.",
  },
  instagram: {
    discovery: "Instagram visitors often judge the whole profile: bio, grid, Highlights, recent Reels and the relationship between follower count and visible engagement. One number works best when the rest of the profile tells the same story.",
    measurement: "Use Insights to compare profile visits, follows, Reel retention, saves, shares and website taps before and after a campaign. These indicators separate a stronger first impression from actual audience interest.",
    readiness: "Tighten the bio, contact button, link destination, Highlights and first nine grid posts before sending more attention to the account. Remove expired offers and make the next step obvious for a new visitor.",
  },
  facebook: {
    discovery: "Facebook discovery can begin with a post, local search, recommendation or shared Page link. Visitors then inspect the Page category, About details, recent activity and visible audience signals before taking a business action.",
    measurement: "Compare Page visits, post reach, reactions, link clicks, messages and follows over the same reporting window. Page-level proof and post-level response should be reviewed separately because they answer different questions.",
    readiness: "Complete the Page category, About section, service area, contact details, call-to-action button and recent posts first. A complete public Page gives new visitors enough information to verify the business or creator.",
  },
};

function getSignalEditorial(service) {
  if (service.slug.includes("comment-likes")) return {
    role: "Comment likes are attached to one selected comment. They can make a useful answer, punchline or customer observation easier to notice inside a busy thread, but they do not add likes to the video itself.",
    preparation: "Open the exact comment, confirm it still exists and copy the direct comment destination where available. Choose a comment that adds context rather than one that could mislead viewers.",
    measurement: "Watch the position of the selected comment, creator replies and any genuine follow-up conversation. The useful outcome is visibility for that contribution, not a guaranteed change in video reach.",
    organic: "Pin the comment when the platform allows it, reply from the creator account and turn recurring questions into future videos.",
    avoid: "Avoid boosting an inaccurate claim, an unresolved complaint or a comment that no longer matches the post.",
  };
  if (service.slug.includes("story-views")) return {
    role: "Story views apply to an active, short-lived Instagram Story sequence. They support the visible audience around time-sensitive frames; they do not transfer to a Reel, feed post or expired Highlight.",
    preparation: "Publish the Story first, keep the profile public and place the main message in the opening frames. Check that link stickers, product tags and countdowns lead to the intended destination.",
    measurement: "Review reach, exits, forward taps, back taps, replies and link clicks for each frame. A high first-frame count matters less if viewers leave before the offer or call to action appears.",
    organic: "Use a short sequence with one idea, readable text and a clear action before attention drops near the end.",
    avoid: "Do not wait until the final hours of the Story window or submit an expired frame that can no longer receive delivery.",
  };
  if (service.slug.includes("live-views")) return {
    role: "Live views support the visible room while a public broadcast is active. The service is tied to a live session and cannot be treated like permanent views on a recorded video or replay.",
    preparation: "Schedule the broadcast, test audio and lighting, prepare the opening promise and start the public Live before using the submitted destination. Have a moderator ready for questions when possible.",
    measurement: "Track peak concurrent viewers, average watch time, comments, clicks and the moments when viewers leave. Those signals help improve the structure of the next broadcast.",
    organic: "Repeat the topic for late joiners, use planned interaction points and give viewers a reason to remain through the final segment.",
    avoid: "Do not submit a scheduled placeholder, private test or replay URL when the selected service requires an active Live.",
  };
  if (service.slug.includes("page-likes")) return {
    role: "Facebook Page likes are a Page-level signal of public support. They are different from followers and from reactions on an individual post, so they should be chosen for Page credibility rather than post performance.",
    preparation: "Confirm the Page URL, Page name and public visibility. Complete business details and publish current content so visitors do not land on an empty or outdated Page.",
    measurement: "Review Page likes and followers separately, then compare Page visits, calls, messages and website clicks. This shows whether stronger Page proof is accompanied by useful customer actions.",
    organic: "Invite existing customers to follow updates, publish local proof and use the Page call-to-action button consistently.",
    avoid: "Do not assume a Page like automatically creates reactions, comments or reach on every future post.",
  };
  if (service.slug.includes("post-likes")) return {
    role: "Facebook post likes affect the reaction count on one selected public post. They can reinforce an announcement or proof asset, but they do not increase the Page follower total.",
    preparation: "Choose a public post with a complete message, working link and useful image or video. Check that dates, stock status and event details are still correct before promoting it.",
    measurement: "Compare reactions with post reach, clicks, comments, shares and messages. A stronger reaction count is most useful when the post also gives interested people a clear next step.",
    organic: "Reply to real questions, share the post into relevant owned channels and reuse the winning message in later creative.",
    avoid: "Avoid expired offers, private group posts or content likely to be edited or deleted during the campaign.",
  };
  if (service.slug.includes("followers")) return {
    role: "Followers are a profile-level audience signal. They change the first number visitors see, but they do not directly add watch time, reactions or clicks to an individual piece of content.",
    preparation: "Make the profile worth following before increasing the visible audience count. Clarify the niche, update the bio and pin the content that best explains what a new follower will receive.",
    measurement: "Record the starting follower count, profile visits and follow conversion from recent content. Afterward, compare those same numbers rather than judging the campaign from follower count alone.",
    organic: "Pair the package with a repeatable content series, a clear profile promise and regular replies to real viewers.",
    avoid: "Avoid a package far outside the scale of the current profile if the surrounding views and activity cannot support that first impression.",
  };
  if (service.slug.includes("comments")) return {
    role: "Comments are conversation signals on a selected post or eligible new upload. Their value comes from relevance: useful questions and contextual reactions make a thread easier for later visitors to understand.",
    preparation: "Choose content that naturally invites discussion and decide which topics fit the brand voice. Keep the destination public and be ready to moderate or answer the thread.",
    measurement: "Review creator replies, genuine follow-up comments, profile visits and saves around the conversation. Count alone does not show whether the thread helped the audience.",
    organic: "Reply promptly, pin the most useful exchange and use recurring questions as research for future posts.",
    avoid: "Avoid repetitive, misleading or off-topic wording that conflicts with the content or makes the conversation look disconnected.",
  };
  if (service.slug.includes("shares")) return {
    role: "Shares are distribution signals attached to a video or eligible upload. They make the most sense on content with a concrete reason to send it to another person.",
    preparation: "Select a public post with a useful takeaway, timely announcement, emotional beat or practical reference. The opening should make the value clear before the viewer scrolls away.",
    measurement: "Compare visible shares with reach, watch time, saves and profile visits. This helps distinguish a shareable idea from a number that did not create wider audience response.",
    organic: "Add a natural sharing prompt and create content people use in conversations, planning or entertainment.",
    avoid: "Avoid applying a large share package to content with weak retention or no clear reason for one viewer to send it to another.",
  };
  if (service.slug.includes("likes")) return {
    role: "Likes are visible reactions on a specific post, video or Reel. They strengthen engagement context around that destination, but they do not automatically create comments, saves, follows or sales.",
    preparation: "Use a public piece of content with a clear hook, accurate caption and current offer. Check the exact URL so the reaction package reaches the intended post.",
    measurement: "Compare likes with views, watch time, saves, shares, comments and profile actions. A balanced relationship between signals is more informative than a like count viewed in isolation.",
    organic: "Support the post with replies, cross-promotion and a follow-up piece that continues the same topic.",
    avoid: "Avoid placing a disproportionate like package on a post whose view count and account size create a conflicting story.",
  };
  return {
    role: "Views are a visible consumption signal on a selected video or Reel. They create a clearer play-count baseline, while the content still has to earn attention after playback begins.",
    preparation: "Choose a public video with a strong opening, readable framing and a complete caption. Submit the exact video destination rather than a general profile URL when the service is post-specific.",
    measurement: "Review average watch time, completion rate, rewatches, likes, shares and profile actions next to the visible view count. Retention explains whether the creative held attention.",
    organic: "Improve the first seconds, remove slow introductions and create a related follow-up while the topic is still relevant.",
    avoid: "Avoid treating a larger play count as proof of qualified interest, conversions or future algorithmic distribution.",
  };
}

function buildDeepDiveSections(service, profile) {
  const platform = platformMeta[service.platform].name;
  const platformCopy = platformEditorial[service.platform];
  const signal = getSignalEditorial(service);
  const recurring = service.slug.includes("auto-");
  const label = naturalCase(service.name);
  const first = service.quantities[0];
  const last = service.quantities[service.quantities.length - 1];

  return [
    {
      eyebrow: "Signal and context",
      title: `What ${label} change on ${platform}`,
      paragraphs: [signal.role, platformCopy.discovery],
    },
    {
      eyebrow: "Package decision",
      title: `How to choose a ${label} package`,
      paragraphs: [
        `${profile.playbook} Packages run from ${first} to ${last}, with the full price in US dollars shown before checkout.`,
        `${recurring ? "Automatic packages apply a per-post amount to eligible new uploads, so posting frequency and the campaign window matter as much as the displayed quantity." : "Record the starting count before you order and keep the same destination live until delivery is complete."} ${signal.avoid}`,
      ],
    },
    {
      eyebrow: "Destination readiness",
      title: `Prepare ${service.target.replace("your ", "the ")} first`,
      paragraphs: [
        `${platformCopy.readiness} ${signal.preparation}`,
        `Check every character of the username or link, keep it public during delivery and do not rename, delete or restrict it while the order is active.`,
      ],
    },
    {
      eyebrow: "Measurement plan",
      title: `Measure more than the visible ${service.outcome}`,
      paragraphs: [`${signal.measurement} ${platformCopy.measurement}`, signal.organic],
    },
  ];
}

function buildPackageGuide(service, profile) {
  const n = service.packages.length;
  return service.packages.map((pack, index) => {
    const position = n === 1 ? 0 : index / (n - 1);
    const small = ["A modest step up for smaller accounts that already post consistently.", "Still a small, low-risk order — good for a second test once the first result looks natural."];
    const mid = ["A broader option for growing accounts with steady recent activity.", "Fits accounts that are already growing and want a visible push behind a campaign."];
    const large = ["For established accounts and bigger launches where the surrounding activity supports the increase.", "A large order for well-established profiles, ideally delivered alongside an active posting schedule."];
    let fit;
    if (index === 0) fit = `Entry option for ${profile.bestFor[0]} — useful for checking the destination and setting a baseline.`;
    else if (pack.quantity === service.popular) fit = `Our most chosen size — a balanced start for ${profile.bestFor[1]}.`;
    else if (index === n - 1) fit = `The largest package, best kept for ${profile.bestFor[2]} after smaller orders have been reviewed.`;
    else if (position <= 0.34) fit = small[index % 2];
    else if (position <= 0.67) fit = mid[index % 2];
    else fit = large[index % 2];
    return { ...pack, fit };
  });
}

function buildOrderChecklist(service) {
  const recurring = service.slug.includes("auto-");
  return [
    `Confirm ${service.target} is public and opens without signing in.`,
    "Match the package to the destination's current audience and recent content performance.",
    `Copy the exact ${service.target.replace("your ", "")} and check spelling before checkout.`,
    recurring ? "Review the eligible post count and campaign window for the automatic service." : "Keep the submitted destination unchanged while delivery is in progress.",
    "Save the order email and reference so support can identify the campaign quickly.",
    "Never share a password, recovery code or two-factor authentication code.",
  ];
}

const KEEP_CASE = new Set(["TikTok", "Instagram", "Facebook", "LIVE", "Live", "Story", "Page", "Reel", "Reels", "USA", "US"]);

export function naturalCase(value) {
  return value
    .split(" ")
    .map((word) => (KEEP_CASE.has(word) ? word : word.toLowerCase()))
    .join(" ");
}

function heroImageFor(service) {
  const slug = service.slug;
  if (service.platform === "facebook") return "/images/facebook-growth.webp";
  if (service.platform === "instagram") return "/images/instagram-growth.webp";
  if (slug === "buy-tiktok-followers") return "/images/tiktok-followers-growth.webp";
  if (slug.includes("auto-")) return "/images/tiktok-auto-growth.webp";
  if (slug.includes("live-views")) return "/images/tiktok-live-growth.webp";
  return "/images/tiktok-engagement-growth.webp";
}

export const services = rawServices.map((service) => {
  const seo = seoProfiles[service.slug];
  const popular = service.popular || service.quantities[Math.min(1, service.quantities.length - 1)];
  const packages = service.quantities.map((quantity, index) => ({
    quantity,
    price: service.prices[index],
    popular: quantity === popular,
  }));
  const start = service.prices[0];
  const label = naturalCase(service.name);
  const enriched = { ...service, popular, start, label, packages };
  return {
    ...enriched,
    ...seo,
    title: `Buy ${service.name} in the USA`,
    seoTitle: `Buy ${service.name} USA — From ${start}`,
    metaDescription: `Buy ${label} in the USA from ${start}. ${packages.length} packages up to ${service.quantities[service.quantities.length - 1]}, no password required${/followers/.test(service.slug) ? ", 30-day drop replacement" : ""}.`,
    heroImage: heroImageFor(service),
    heroImageAlt: `${service.name} growth illustration — SmFame packages for US accounts`,
    ogImage: `/og/${service.slug}.webp`,
    deepDiveSections: buildDeepDiveSections(service, seo),
    packageGuide: buildPackageGuide({ ...enriched }, seo),
    orderChecklist: buildOrderChecklist(service),
  };
});

export function getService(slug) {
  return services.find((service) => service.slug === slug);
}

export function getServicesByPlatform(platform) {
  return services.filter((service) => service.platform === platform);
}

export function buildFaqs(service) {
  const platform = platformMeta[service.platform].name;
  const recurring = service.slug.includes("auto-");
  const live = service.slug.includes("live-views");
  const story = service.slug.includes("story-views");
  const contentTarget = service.target.includes("link") || service.target.includes("post") || service.target.includes("Reel");
  const label = service.label;
  return [
    {
      q: `Do I need to share my ${platform} password?`,
      a: `No. SmFame only needs ${service.target}. Never share a password, login code or recovery code with any growth service.`,
    },
    {
      q: `How quickly will my ${label} order start?`,
      a: `Most orders begin after payment is confirmed and ${service.target} has been checked. Larger packages are delivered gradually rather than all at once. If delivery has not started within ${business.refundIfNotStartedHours} hours, you can request a full refund.`,
    },
    ...guaranteeFaqs(service),
    {
      q: `How many ${label} should I buy?`,
      a: `Compare the packages with your current ${platform} audience and the normal performance of recent posts. ${service.packages[0].quantity} is the entry option for a first test; ${service.popular} is the size most customers choose. Move to larger packages only when the result still looks proportionate to the account.`,
    },
    {
      q: `What should I check before ordering ${label}?`,
      a: `${contentTarget ? "Confirm the selected post, video or comment is public and copy its exact URL." : `Make sure the ${platform} profile is public and the username is spelled correctly.`} Private, restricted, deleted or misspelled destinations delay delivery and are not eligible for a refund once fulfillment has started.`,
    },
    {
      q: `Will ${label} guarantee organic reach or sales?`,
      a: `No. ${service.limits} Content quality, timing, audience fit and the offer still decide the wider result.`,
    },
    {
      q: recurring ? "Which new posts are covered by an automatic campaign?" : live ? "Does my broadcast need to be live before I order?" : story ? "Can views be added after a Story expires?" : `Can I split one package across several ${platform} destinations?`,
      a: recurring
        ? "The campaign applies to eligible new public uploads during its active window. The post allowance and per-post amount are shown before payment."
        : live
          ? "Yes. Start the public broadcast first and submit the correct live destination. Live services are time-sensitive and cannot be moved to a replay."
          : story
            ? "No. Story delivery needs an active public Story. Order early enough for delivery while the 24-hour Story is still available."
            : `Each package goes to one ${platform} destination so delivery stays accurate. Place separate orders for different profiles or posts.`,
    },
  ];
}
