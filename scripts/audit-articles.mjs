const sitemap = await (await fetch("http://localhost:3000/sitemap.xml")).text();
const urls = [...sitemap.matchAll(/<loc>https:\/\/smfame\.us\/guides\/([^<]+)<\/loc>/g)]
  .map((match) => `http://localhost:3000/guides/${match[1]}`)
  .filter((url) => url.includes("package-size-guide") || url.includes("before-you-buy-checklist") || url.includes("campaign-plan") || url.includes("measurement-guide") || url.includes("mistakes-to-avoid"));
const results = [];

for (let index = 0; index < urls.length; index += 10) {
  const batch = urls.slice(index, index + 10);
  results.push(...await Promise.all(batch.map(async (url) => {
    const response = await fetch(url);
    const html = await response.text();
    const visibleText = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z#0-9]+;/gi, " ");
    const words = (visibleText.match(/[A-Za-z0-9'-]+/g) || []).length;
    return {
      url,
      status: response.status,
      words,
      h1: (html.match(/<h1/g) || []).length,
      contentImages: (html.match(/class="guide-cover"/g) || []).length + (html.match(/class="article-inline-visual"/g) || []).length,
      schema: html.includes("BlogPosting") && html.includes("FAQPage"),
      moneyLink: /href="\/buy-(tiktok|instagram|facebook)-/.test(html),
    };
  })));
}

const counts = results.map((result) => result.words).sort((a, b) => a - b);
console.log(JSON.stringify({
  count: results.length,
  min: counts[0],
  median: counts[Math.floor(counts.length / 2)],
  max: counts.at(-1),
  minImages: Math.min(...results.map((result) => result.contentImages)),
  bad: results.filter((result) => result.status !== 200 || result.h1 !== 1 || result.contentImages < 3 || !result.schema || !result.moneyLink || result.words < 700),
}, null, 2));
