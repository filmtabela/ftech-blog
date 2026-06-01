import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const TOPICS = [
  "How hospitals are using AI to reduce misdiagnosis and improve patient outcomes",
  "How oil and gas companies like Shell and BP are using IoT and AI to cut costs",
  "How interior designers are using AI tools to win more clients and scale faster",
  "How Zara and H&M use AI for inventory management and demand forecasting",
  "How small restaurants can use technology to compete with Zomato and Swiggy",
  "How construction companies are using drones and AI for project management",
  "How real estate agencies are using AI chatbots to qualify leads 24/7",
  "How logistics companies like DHL use AI to optimize delivery routes",
  "How hotels are using AI to personalize guest experiences and increase revenue",
  "How law firms are using AI tools to automate document review and research",
  "How farmers in India are using AI and IoT sensors to increase crop yields",
  "How retail stores can use AI-powered CCTV to reduce theft and track footfall",
  "How education startups like Byju's built their tech infrastructure",
  "How accounting firms are using AI to automate bookkeeping and audits",
  "How fitness studios are using apps and AI to retain members longer",
  "How Salesforce CRM works and why 150000 companies use it",
  "How Microsoft Azure is helping Indian SMBs move to the cloud",
  "How Google Workspace vs Microsoft 365 — which is better for small teams",
  "How Amazon Web Services pricing works and when it makes sense for SMBs",
  "How Zoho built a billion dollar company by targeting small businesses",
  "How WhatsApp Business API is transforming customer service in India",
  "How interior design firms use 3D rendering software to close clients faster",
  "How manufacturing companies use ERP systems to reduce waste",
  "How a Hyderabad startup used digital marketing to scale to 10 crore revenue",
  "How AI is transforming hiring — what HR teams need to know in 2026",
  "How cybersecurity threats are evolving and how SMBs can protect themselves",
  "How e-commerce businesses use AI for product recommendations that boost sales",
  "How telemedicine platforms are using AI to triage patients in rural India",
  "How fintech companies like Razorpay built payment infrastructure for India",
  "How solar energy companies are using AI to predict output and manage grids",
];

const PUBLISHED_FILE = "published.json";

function getPublished() {
  if (fs.existsSync(PUBLISHED_FILE)) {
    return JSON.parse(fs.readFileSync(PUBLISHED_FILE, "utf8"));
  }
  return [];
}

function savePublished(list) {
  fs.writeFileSync(PUBLISHED_FILE, JSON.stringify(list, null, 2));
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 80);
}

async function generateArticle(topic) {
  const response = await client.messages.create({
model: "claude-haiku-4-5-20251001",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `Write a detailed, engaging blog article for the Fortune Tech website (an IT services company based in Hyderabad, India that helps businesses upgrade their technology).

Topic: "${topic}"

Requirements:
- Title: compelling, SEO-optimized, 8-12 words
- Length: 800-1000 words
- Tone: authoritative but accessible, global audience
- Include real company examples where relevant
- Include practical takeaways for business owners
- End with a soft CTA mentioning Fortune Tech can help businesses with their digital transformation
- Format: return ONLY valid JSON, no markdown, no backticks

Return this exact JSON structure:
{
  "title": "article title here",
  "metaDescription": "150 char meta description",
  "category": "one of: AI & Automation, Digital Transformation, Cloud & Infrastructure, Business Technology, Industry Insights",
  "readTime": "X min read",
  "excerpt": "2 sentence summary",
  "content": "full HTML article content using <h2>, <p>, <ul>, <li>, <strong> tags only"
}`,
      },
    ],
  });

  const text = response.content[0].text;
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

function buildArticleHTML(article, slug, date) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${article.title} | Fortune Tech</title>
<meta name="description" content="${article.metaDescription}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Inter',sans-serif;background:#0a0a0a;color:#e5e5e5;line-height:1.7;}
nav{background:rgba(10,10,10,0.95);border-bottom:1px solid #222;padding:0 2rem;position:sticky;top:0;z-index:100;}
.nav-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:70px;}
.nav-logo{color:#fff;font-size:1.2rem;font-weight:700;text-decoration:none;display:flex;align-items:center;gap:8px;}
.nav-logo span{color:#3b82f6;}
.nav-links a{color:#aaa;text-decoration:none;margin-left:2rem;font-size:0.9rem;transition:color 0.2s;}
.nav-links a:hover{color:#fff;}
.hero{background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);padding:4rem 2rem;}
.hero-inner{max-width:800px;margin:0 auto;}
.category-badge{display:inline-block;background:#3b82f6;color:#fff;font-size:0.75rem;font-weight:600;padding:4px 12px;border-radius:20px;margin-bottom:1rem;letter-spacing:0.05em;}
.hero h1{font-size:2.2rem;font-weight:700;line-height:1.3;color:#fff;margin-bottom:1rem;}
.meta{color:#94a3b8;font-size:0.9rem;display:flex;gap:1.5rem;}
.content-wrap{max-width:800px;margin:3rem auto;padding:0 2rem;}
.content-wrap h2{font-size:1.4rem;font-weight:600;color:#fff;margin:2rem 0 1rem;}
.content-wrap p{color:#cbd5e1;margin-bottom:1.2rem;}
.content-wrap ul{padding-left:1.5rem;margin-bottom:1.2rem;}
.content-wrap li{color:#cbd5e1;margin-bottom:0.5rem;}
.content-wrap strong{color:#fff;}
.cta-box{background:linear-gradient(135deg,#1e3a5f,#0f172a);border:1px solid #3b82f6;border-radius:12px;padding:2rem;margin:3rem 0;text-align:center;}
.cta-box h3{color:#fff;font-size:1.3rem;margin-bottom:0.8rem;}
.cta-box p{color:#94a3b8;margin-bottom:1.5rem;}
.cta-btn{display:inline-block;background:#3b82f6;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;transition:background 0.2s;}
.cta-btn:hover{background:#2563eb;}
footer{background:#050505;border-top:1px solid #222;padding:2rem;text-align:center;color:#555;font-size:0.85rem;}
</style>
</head>
<body>
<nav>
<div class="nav-inner">
<a href="/index.html" class="nav-logo">Fortune<span>Tech</span></a>
<div class="nav-links">
<a href="/index.html">Home</a>
<a href="/blog/index.html">Blog</a>
<a href="/index.html#contact">Contact</a>
</div>
</div>
</nav>
<div class="hero">
<div class="hero-inner">
<span class="category-badge">${article.category}</span>
<h1>${article.title}</h1>
<div class="meta">
<span>${date}</span>
<span>${article.readTime}</span>
</div>
</div>
</div>
<div class="content-wrap">
${article.content}
<div class="cta-box">
<h3>Ready to Transform Your Business with Technology?</h3>
<p>Fortune Tech helps businesses across India and globally upgrade their digital infrastructure, build websites, and implement the right tech stack for growth.</p>
<a href="/index.html#contact" class="cta-btn">Talk to Fortune Tech →</a>
</div>
</div>
<footer>© 2026 Fortune Tech | ftech.co.in | Hyderabad, India</footer>
</body>
</html>`;
}

function buildIndexHTML(articles) {
  const cards = articles
    .slice()
    .reverse()
    .map(
      (a) => `
<article class="card">
<div class="card-meta">
<span class="badge">${a.category}</span>
<span class="date">${a.date}</span>
</div>
<h2><a href="/blog/${a.slug}.html">${a.title}</a></h2>
<p>${a.excerpt}</p>
<div class="card-footer">
<span>${a.readTime}</span>
<a href="/blog/${a.slug}.html">Read more →</a>
</div>
</article>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Tech Insights Blog | Fortune Tech</title>
<meta name="description" content="AI, digital transformation, and technology insights for businesses worldwide. Published daily by Fortune Tech.">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Inter',sans-serif;background:#0a0a0a;color:#e5e5e5;}
nav{background:rgba(10,10,10,0.95);border-bottom:1px solid #222;padding:0 2rem;position:sticky;top:0;z-index:100;}
.nav-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:70px;}
.nav-logo{color:#fff;font-size:1.2rem;font-weight:700;text-decoration:none;display:flex;align-items:center;gap:8px;}
.nav-logo span{color:#3b82f6;}
.nav-links a{color:#aaa;text-decoration:none;margin-left:2rem;font-size:0.9rem;}
.nav-links a:hover{color:#fff;}
.hero{background:linear-gradient(135deg,#0f172a,#1e3a5f);padding:4rem 2rem;text-align:center;}
.hero h1{font-size:2.5rem;font-weight:700;color:#fff;margin-bottom:1rem;}
.hero p{color:#94a3b8;font-size:1.1rem;}
.hero em{color:#3b82f6;font-style:normal;}
.grid{max-width:1100px;margin:3rem auto;padding:0 2rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:1.5rem;}
.card{background:#111;border:1px solid #222;border-radius:12px;padding:1.5rem;transition:border-color 0.2s;}
.card:hover{border-color:#3b82f6;}
.card-meta{display:flex;gap:1rem;align-items:center;margin-bottom:1rem;}
.badge{background:#1e3a5f;color:#3b82f6;font-size:0.7rem;font-weight:600;padding:3px 10px;border-radius:20px;letter-spacing:0.05em;}
.date{color:#555;font-size:0.8rem;}
.card h2{font-size:1.05rem;font-weight:600;margin-bottom:0.8rem;line-height:1.4;}
.card h2 a{color:#fff;text-decoration:none;}
.card h2 a:hover{color:#3b82f6;}
.card p{color:#718096;font-size:0.9rem;line-height:1.6;margin-bottom:1rem;}
.card-footer{display:flex;justify-content:space-between;align-items:center;font-size:0.85rem;}
.card-footer span{color:#555;}
.card-footer a{color:#3b82f6;text-decoration:none;font-weight:500;}
footer{background:#050505;border-top:1px solid #222;padding:2rem;text-align:center;color:#555;font-size:0.85rem;margin-top:4rem;}
</style>
</head>
<body>
<nav>
<div class="nav-inner">
<a href="/index.html" class="nav-logo">Fortune<span>Tech</span></a>
<div class="nav-links">
<a href="/index.html">Home</a>
<a href="/blog/index.html">Blog</a>
<a href="/index.html#contact">Contact</a>
</div>
</div>
</nav>
<div class="hero">
<h1>Tech Insights for <em>Every Industry</em></h1>
<p>AI, digital transformation, and technology strategies for forward-thinking businesses. Updated daily.</p>
</div>
<div class="grid">${cards}</div>
<footer>© 2026 Fortune Tech | ftech.co.in | Hyderabad, India</footer>
</body>
</html>`;
}

async function main() {
  const published = getPublished();
  const publishedTopics = published.map((p) => p.topic);
  const remaining = TOPICS.filter((t) => !publishedTopics.includes(t));

  if (remaining.length === 0) {
    console.log("All topics published.");
    return;
  }

  const topic = remaining[0];
  console.log(`Generating: ${topic}`);

  const article = await generateArticle(topic);
  const slug = slugify(article.title);
  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (!fs.existsSync("blog")) fs.mkdirSync("blog");

  const articleHTML = buildArticleHTML(article, slug, date);
  fs.writeFileSync(`blog/${slug}.html`, articleHTML);
  console.log(`Written: blog/${slug}.html`);

  published.push({ topic, slug, title: article.title, category: article.category, excerpt: article.excerpt, readTime: article.readTime, date });
  savePublished(published);

  const indexHTML = buildIndexHTML(published);
  fs.writeFileSync("blog.html", indexHTML);
  fs.writeFileSync("blog/index.html", indexHTML);
  console.log("Index updated.");
}

main().catch(console.error);
