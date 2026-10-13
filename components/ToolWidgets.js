"use client";

import { useState } from "react";

const BIO_LIMIT = 80;

const niches = {
  general: { label: "General / lifestyle", word: "life", tags: ["lifestyle", "dayinmylife", "relatable", "storytime", "vlog", "tiktokusa"] },
  food: { label: "Food & recipes", word: "food", tags: ["foodtok", "recipe", "easyrecipe", "cooking", "homecooking", "foodie", "whatieatinaday"] },
  fitness: { label: "Fitness & health", word: "fitness", tags: ["fitnesstok", "gymtok", "workout", "homeworkout", "fitnessmotivation", "fitnesstips"] },
  beauty: { label: "Beauty & skincare", word: "beauty", tags: ["beautytok", "skincare", "makeuptutorial", "skincareroutine", "grwm", "makeup"] },
  fashion: { label: "Fashion & style", word: "style", tags: ["fashiontok", "ootd", "outfitideas", "styletips", "outfitinspo", "thrifting"] },
  business: { label: "Small business", word: "business", tags: ["smallbusiness", "smallbusinesscheck", "smallbusinessowner", "entrepreneur", "packanorder", "shopsmall"] },
  tech: { label: "Tech & apps", word: "tech", tags: ["techtok", "techtips", "iphonetips", "gadgets", "productivity", "aitools"] },
  travel: { label: "Travel", word: "travel", tags: ["traveltok", "travel", "traveltips", "roadtrip", "bucketlist", "hiddengems"] },
  gaming: { label: "Gaming", word: "gaming", tags: ["gamingtok", "gaming", "gamer", "gameplay", "twitchstreamer", "gamingclips"] },
  pets: { label: "Pets & animals", word: "pets", tags: ["pettok", "dogsoftiktok", "catsoftiktok", "puppy", "petlover", "funnypets"] },
  music: { label: "Music", word: "music", tags: ["musictok", "newmusic", "singer", "originalsong", "cover", "independentartist"] },
  education: { label: "Education & tips", word: "tips", tags: ["learnontiktok", "edutok", "lifehacks", "didyouknow", "studytok", "howto"] },
  home: { label: "Home & DIY", word: "home", tags: ["hometok", "diy", "homedecor", "cleantok", "organization", "homeprojects"] },
  books: { label: "Books", word: "books", tags: ["booktok", "bookrecommendations", "reading", "bookish", "booktoker", "readingtok"] },
};

const broadTags = ["fyp", "foryou", "foryoupage", "tiktok", "viral"];

function toTag(value) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "");
}

function unique(list) {
  return [...new Set(list.filter(Boolean))];
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function charCount(value) {
  return [...value].length;
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }
  return <button type="button" className="tool-copy" onClick={copy}>{copied ? "Copied ✓" : label}</button>;
}

function NicheSelect({ value, onChange }) {
  return (
    <label><span>Niche</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {Object.entries(niches).map(([key, niche]) => <option value={key} key={key}>{niche.label}</option>)}
      </select>
    </label>
  );
}

export function HashtagGenerator() {
  const [topic, setTopic] = useState("");
  const [niche, setNiche] = useState("general");
  const [location, setLocation] = useState("");
  const [groups, setGroups] = useState(null);
  const [selected, setSelected] = useState([]);

  function generate(event) {
    event.preventDefault();
    const base = toTag(topic);
    const words = topic.toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 2);
    const nicheData = niches[niche];
    const specific = base
      ? unique([base, `${base}tips`, `${base}ideas`, `${base}tok`, `${base}tutorial`, words.length > 2 ? toTag(words.slice(0, 2).join("")) : "", words.length > 1 ? toTag(words[words.length - 1]) : ""])
      : [];
    const loc = toTag(location);
    const local = loc ? unique([loc, `${loc}${nicheData.word}`, `${loc}tiktok`, `${loc}creator`]) : [];
    const next = [
      { title: "Specific to your topic", tags: specific },
      { title: `${nicheData.label} community`, tags: shuffle(nicheData.tags) },
      { title: "Broad", tags: broadTags },
      ...(local.length ? [{ title: "Local", tags: local }] : []),
    ].filter((group) => group.tags.length);
    setGroups(next);
    setSelected(unique([...specific.slice(0, 2), ...next.find((g) => g.title.includes("community")).tags.slice(0, 3), "fyp", ...local.slice(0, 1)]));
  }

  function toggle(tag) {
    setSelected((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]);
  }

  const output = selected.map((tag) => `#${tag}`).join(" ");

  return (
    <div className="tool-widget">
      <form className="tool-form" onSubmit={generate}>
        <label className="tool-wide"><span>What is the video about?</span><input required value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="e.g. iced coffee recipe" maxLength={60} /></label>
        <NicheSelect value={niche} onChange={setNiche} />
        <label><span>City or state <small>(optional)</small></span><input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="e.g. Austin" maxLength={30} /></label>
        <button className="button" type="submit">Generate hashtags <span>↗</span></button>
      </form>
      {groups && (
        <div className="tool-results" aria-live="polite">
          {groups.map((group) => (
            <div className="tool-group" key={group.title}>
              <h3>{group.title}</h3>
              <div className="tag-list">
                {group.tags.map((tag) => (
                  <button type="button" key={tag} className={selected.includes(tag) ? "tag-chip on" : "tag-chip"} onClick={() => toggle(tag)} aria-pressed={selected.includes(tag)}>#{tag}</button>
                ))}
              </div>
            </div>
          ))}
          <div className="tool-output">
            <div><small>{selected.length} selected · tap a tag to add or remove it</small><p>{output || "Select at least one hashtag."}</p></div>
            {output && <CopyButton text={output} label="Copy hashtags" />}
          </div>
        </div>
      )}
    </div>
  );
}

const bioTemplates = [
  ({ name, niche, offer, cta, e }) => `${e("✨ ")}${offer}${cta ? ` ${e("👇 ", "· ")}${cta}` : ""}`,
  ({ name, niche, offer, cta, e }) => `${name} | ${offer}`,
  ({ name, niche, offer, cta, e }) => `${e("📍 ")}${niche} by ${name}${cta ? ` · ${cta}` : ""}`,
  ({ name, niche, offer, cta, e }) => `${offer}. ${cta || "Follow for more"}${e(" 💫")}`,
  ({ name, niche, offer, cta, e }) => `${e("👋 ")}Hi, I'm ${name}. ${offer}`,
  ({ name, niche, offer, cta, e }) => `${niche} · ${offer.toLowerCase()}${cta ? ` · ${cta}` : ""}`,
  ({ name, niche, offer, cta, e }) => `${name}: ${offer.toLowerCase()}${e(" 🎯")}`,
  ({ name, niche, offer, cta, e }) => `${e("➡️ ")}${cta || "New videos weekly"} | ${niche}`,
];

export function BioGenerator() {
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("general");
  const [offer, setOffer] = useState("");
  const [cta, setCta] = useState("");
  const [emoji, setEmoji] = useState(true);
  const [bios, setBios] = useState(null);

  function generate(event) {
    event.preventDefault();
    const e = (withEmoji, plain = "") => (emoji ? withEmoji : plain);
    const nicheLabel = niches[niche].label.split(" & ")[0].split(" / ")[0];
    const values = { name: name.trim(), niche: nicheLabel, offer: offer.trim().replace(/\.$/, ""), cta: cta.trim(), e };
    const result = unique(bioTemplates.map((template) => template(values).replace(/\s+/g, " ").replace(/\s\|\s*$/, "").trim()));
    result.sort((a, b) => (charCount(a) <= BIO_LIMIT ? 0 : 1) - (charCount(b) <= BIO_LIMIT ? 0 : 1));
    setBios(result);
  }

  return (
    <div className="tool-widget">
      <form className="tool-form" onSubmit={generate}>
        <label><span>Name or brand</span><input required value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Maya's Kitchen" maxLength={30} /></label>
        <NicheSelect value={niche} onChange={setNiche} />
        <label className="tool-wide"><span>What do your videos offer?</span><input required value={offer} onChange={(event) => setOffer(event.target.value)} placeholder="e.g. Easy 15-minute dinners for busy parents" maxLength={60} /></label>
        <label><span>Call to action <small>(optional)</small></span><input value={cta} onChange={(event) => setCta(event.target.value)} placeholder="e.g. New recipes every Friday" maxLength={35} /></label>
        <label className="tool-check"><input type="checkbox" checked={emoji} onChange={(event) => setEmoji(event.target.checked)} /><span>Include emojis</span></label>
        <button className="button" type="submit">Generate bios <span>↗</span></button>
      </form>
      {bios && (
        <div className="tool-results" aria-live="polite">
          {bios.map((bio) => {
            const count = charCount(bio);
            return (
              <div className="tool-output" key={bio}>
                <div><small className={count > BIO_LIMIT ? "over" : "fits"}>{count}/{BIO_LIMIT} characters {count > BIO_LIMIT ? "· too long, shorten it" : "· fits"}</small><p>{bio}</p></div>
                <CopyButton text={bio} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const ctaText = {
  comment: "Tell me in the comments 👇",
  save: "Save this for later 📌",
  follow: "Follow for part 2",
  link: "Link in bio 🔗",
  share: "Send this to someone who needs it",
};

const captionTemplates = {
  friendly: [
    (t) => `Okay but why did nobody tell me about ${t} sooner? 😅`,
    (t) => `POV: you finally tried ${t}`,
    (t) => `${t} — the way it turned out though ✨`,
    (t) => `Things I wish I knew before trying ${t}`,
    (t) => `Rate this ${t} from 1 to 10 👀`,
  ],
  informative: [
    (t) => `3 things to know about ${t} (the last one matters most)`,
    (t) => `${t}, explained in under a minute`,
    (t) => `The biggest mistake people make with ${t}`,
    (t) => `How to get started with ${t} — step by step`,
    (t) => `${t}: what actually works and what doesn't`,
  ],
  promotional: [
    (t) => `This is how we make ${t} — start to finish`,
    (t) => `You asked, we made it: ${t} 🙌`,
    (t) => `Packing an order of ${t} for a customer 📦`,
    (t) => `Why our customers keep coming back for ${t}`,
    (t) => `Behind the scenes: ${t}`,
  ],
};

export function CaptionGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("friendly");
  const [cta, setCta] = useState("comment");
  const [captions, setCaptions] = useState(null);

  function generate(event) {
    event.preventDefault();
    const clean = topic.trim().replace(/\.$/, "");
    const base = toTag(clean);
    const tags = unique([base, `${base}tips`, tone === "promotional" ? "smallbusiness" : "fyp", "tiktokusa"]).map((tag) => `#${tag}`).join(" ");
    setCaptions(shuffle(captionTemplates[tone]).map((template) => `${capitalize(template(clean))}\n${ctaText[cta]}\n${tags}`));
  }

  return (
    <div className="tool-widget">
      <form className="tool-form" onSubmit={generate}>
        <label className="tool-wide"><span>Video topic</span><input required value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="e.g. iced coffee at home" maxLength={60} /></label>
        <label><span>Tone</span><select value={tone} onChange={(event) => setTone(event.target.value)}><option value="friendly">Friendly</option><option value="informative">Informative</option><option value="promotional">Promotional / business</option></select></label>
        <label><span>Call to action</span><select value={cta} onChange={(event) => setCta(event.target.value)}><option value="comment">Ask for a comment</option><option value="save">Ask for a save</option><option value="follow">Ask for a follow</option><option value="link">Link in bio</option><option value="share">Ask for a share</option></select></label>
        <button className="button" type="submit">Generate captions <span>↗</span></button>
      </form>
      {captions && (
        <div className="tool-results" aria-live="polite">
          {captions.map((caption) => (
            <div className="tool-output" key={caption}>
              <div><p className="pre">{caption}</p></div>
              <CopyButton text={caption} />
            </div>
          ))}
          <button type="button" className="text-link tool-again" onClick={generate}>Show different captions ↻</button>
        </div>
      )}
    </div>
  );
}

function NumberField({ label, value, onChange, optional }) {
  return (
    <label><span>{label} {optional && <small>(optional)</small>}</span>
      <input type="number" min="0" inputMode="numeric" value={value} onChange={(event) => onChange(event.target.value)} placeholder="0" />
    </label>
  );
}

function formatRate(value) {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(value < 10 ? 2 : 1)}%`;
}

export function EngagementCalculator() {
  const [values, setValues] = useState({ views: "", likes: "", comments: "", shares: "", saves: "", followers: "" });
  const set = (key) => (value) => setValues((current) => ({ ...current, [key]: value }));
  const n = (key) => Math.max(0, Number(values[key]) || 0);
  const interactions = n("likes") + n("comments") + n("shares") + n("saves");
  const byViews = n("views") ? (interactions / n("views")) * 100 : NaN;
  const byFollowers = n("followers") ? (interactions / n("followers")) * 100 : NaN;
  const likeRate = n("views") ? (n("likes") / n("views")) * 100 : NaN;
  const commentRate = n("views") ? (n("comments") / n("views")) * 100 : NaN;
  const shareRate = n("views") ? ((n("shares") + n("saves")) / n("views")) * 100 : NaN;

  return (
    <div className="tool-widget">
      <form className="tool-form tool-form-numbers" onSubmit={(event) => event.preventDefault()}>
        <NumberField label="Views" value={values.views} onChange={set("views")} />
        <NumberField label="Likes" value={values.likes} onChange={set("likes")} />
        <NumberField label="Comments" value={values.comments} onChange={set("comments")} />
        <NumberField label="Shares" value={values.shares} onChange={set("shares")} />
        <NumberField label="Saves" value={values.saves} onChange={set("saves")} optional />
        <NumberField label="Followers" value={values.followers} onChange={set("followers")} optional />
      </form>
      <div className="tool-stats" aria-live="polite">
        <div className="tool-stat main"><small>Engagement rate by views</small><strong>{formatRate(byViews)}</strong><span>(likes + comments + shares + saves) ÷ views</span></div>
        <div className="tool-stat"><small>Engagement rate by followers</small><strong>{formatRate(byFollowers)}</strong><span>interactions ÷ followers</span></div>
        <div className="tool-stat"><small>Like rate</small><strong>{formatRate(likeRate)}</strong><span>likes ÷ views</span></div>
        <div className="tool-stat"><small>Comment rate</small><strong>{formatRate(commentRate)}</strong><span>comments ÷ views</span></div>
        <div className="tool-stat"><small>Share + save rate</small><strong>{formatRate(shareRate)}</strong><span>(shares + saves) ÷ views</span></div>
      </div>
      <p className="tool-note">Tip: calculate your last five to ten videos and use the average as your personal benchmark.</p>
    </div>
  );
}
