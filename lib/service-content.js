// Hand-written, page-specific copy for the highest-value service pages.
// Services without an entry fall back to the shared template copy.

export const serviceContent = {
  "buy-tiktok-followers": {
    heading: "What you get when you buy TikTok followers from SmFame",
    paragraphs: [
      "A TikTok follower package adds followers to one public profile. You give us the username, choose a quantity and pay in US dollars — there is no login step, no app to install and no password to hand over. Larger orders are delivered gradually instead of in a single jump, so the profile does not go from 300 to 10,000 overnight.",
      "Followers matter most at the moment someone lands on your profile from a video. A creator with a strong clip and 40 followers often loses that visitor; the same clip on a profile with a believable audience is more likely to earn the follow. That is the job a follower package does: it closes the gap between how good the content is and how established the profile looks.",
      "It does not replace the content. TikTok still distributes each video based on how viewers respond to it, so the accounts that get the most from a follower package are the ones that already post on a consistent topic, have a clear bio and pin two or three videos that show what a new follower can expect.",
    ],
    who: [
      "New creators whose videos are getting views but whose profile still looks empty",
      "Small businesses and shops opening a TikTok account for a launch",
      "Musicians, coaches and freelancers who send their TikTok to clients or brands",
    ],
  },
  "buy-tiktok-likes": {
    heading: "What you get when you buy TikTok likes",
    paragraphs: [
      "TikTok likes are added to one public video. Paste the video link, pick a quantity and check out — the likes appear on that clip only, not across your profile. That makes likes the most targeted TikTok package: you decide exactly which video gets the extra social proof.",
      "The best candidates are videos you are actively promoting — a product drop, a trend you joined early, a collaboration or a clip you pinned to the top of your profile. Viewers scroll past videos that look ignored; a like count that matches the view count gives them a reason to stop and watch.",
      "Keep the numbers in proportion. A video with 2,000 views and 9,000 likes looks wrong to anyone who checks, so choose a like package that fits the views the video already has, or pair it with a views package for a new upload.",
    ],
    who: [
      "Launch and product videos that need visible engagement on day one",
      "Pinned videos that represent your account to new visitors",
      "Clips with good watch time but a low like count",
    ],
  },
  "buy-tiktok-views": {
    heading: "What you get when you buy TikTok views",
    paragraphs: [
      "TikTok views are added to one public video and are the lowest-cost TikTok package we offer — our packages start at 2,500 views and go up to one million. Paste the video link, choose a quantity and the view count on that clip increases while the rest of your profile stays untouched.",
      "Views work well for new uploads that would otherwise sit at a very low count, for videos you are sending to clients or brands, and for older clips that are part of a current campaign. A believable play count makes people more willing to give the video their first few seconds — which is where TikTok's own distribution decisions start.",
      "Views are not watch time. TikTok still measures how long people stay, rewatch and share, so open TikTok analytics after the order and look at average watch time and retention. If those are weak, improve the hook before buying more views on the next video.",
    ],
    who: [
      "Fresh uploads that need a starting baseline",
      "Music, product and event videos used in pitches or reports",
      "Creators testing hooks and formats who want comparable starting points",
    ],
  },
  "buy-instagram-followers": {
    heading: "What you get when you buy Instagram followers from SmFame",
    paragraphs: [
      "An Instagram follower package adds followers to one public Instagram profile. You only provide the username — never the password — and choose from nine sizes between 100 and 50,000 followers, priced in US dollars. Bigger packages are spread out over time so the growth reads as steady rather than sudden.",
      "On Instagram the follower count is part of the first impression: a visitor sees it next to your bio, Highlights and grid before deciding whether to follow, message or click your link. Businesses use follower packages before a launch or ad campaign; creators use them to reach the audience levels brands look for in partnership pitches.",
      "Follower packages are covered by our 30-day drop replacement: if followers drop within 30 days of delivery, we replace them free (up to 10,000 per order). Keep the profile public, keep posting and make sure the bio and first nine grid posts explain what the account is about — that is what turns the extra attention into real followers.",
    ],
    who: [
      "Local businesses and online shops building trust before a campaign",
      "Creators approaching brand-partnership follower thresholds",
      "New or rebranded accounts that need a credible starting point",
    ],
  },
  "buy-instagram-likes": {
    heading: "What you get when you buy Instagram likes",
    paragraphs: [
      "Instagram likes are delivered to one public post or Reel. Send us the post link, choose one of eight packages from 100 to 25,000 likes and pay in US dollars. The likes go only to that post, so you can put them behind the content that matters: a product announcement, a portfolio piece or a Reel you are promoting.",
      "Likes are the quickest social-proof signal on Instagram. People decide whether a post is worth their time in a glance, and a post with visible engagement earns more of that attention than an identical post that looks overlooked. For businesses, likes on campaign posts also make the profile look active to new visitors checking the grid.",
      "Match likes to reach. A post that reached 800 accounts with 6,000 likes looks inconsistent, so choose a package in proportion to the post's views and your follower count, and keep answering real comments while the post is fresh.",
    ],
    who: [
      "Product launches, announcements and promotions",
      "Portfolio posts and Reels you send to clients or brands",
      "Accounts whose best posts have good reach but low visible engagement",
    ],
  },
  "buy-instagram-views": {
    heading: "What you get when you buy Instagram views",
    paragraphs: [
      "Instagram views are added to one public Reel or video. Choose from eight packages between 500 and 100,000 views, paste the link and check out in US dollars. Views are the most affordable Instagram package and the easiest one to keep in proportion with the rest of the account.",
      "Reels are where most Instagram discovery happens, and the play count is shown right on the Reel. A new Reel sitting at a few dozen plays rarely gets a second look; a believable starting count helps it compete for attention while you test hooks, sounds and formats.",
      "Views are a starting point, not the result. After delivery, check Insights for average watch time, shares and saves — those show whether the Reel itself is holding attention and are the numbers to improve on the next upload.",
    ],
    who: [
      "New Reels that need a credible starting play count",
      "Video ads and product demos you also share organically",
      "Creators comparing Reel formats from the same baseline",
    ],
  },
};

export function getServiceContent(slug) {
  return serviceContent[slug] || null;
}
