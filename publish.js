import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function createBatchRequest(
  custom_id,
  topic,
  model = "claude-haiku-4-5-20251001",
  systemPrompt,
  userPrompt
) {
  return {
    custom_id: custom_id,
    params: {
      model: model,
      max_tokens: 2000,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
    },
  };
}

async function submitBatch(requests) {
  if (requests.length === 0) {
    console.log("No requests to batch.");
    return null;
  }

  console.log(`Submitting ftech batch with ${requests.length} requests...`);

  const batch = await client.beta.messages.batches.create({
    requests: requests,
  });

  console.log(`Batch submitted. ID: ${batch.id}`);
  fs.writeFileSync("batch-id.txt", batch.id);

  return batch;
}

async function pollBatchResults(batchId) {
  let batch = await client.beta.messages.batches.retrieve(batchId);

  while (batch.processing_status === "in_progress") {
    console.log(`Batch processing... waiting 60s`);
    await new Promise((resolve) => setTimeout(resolve, 60000));
    batch = await client.beta.messages.batches.retrieve(batchId);
  }

  console.log(`Batch complete. Status: ${batch.processing_status}`);

  if (batch.processing_status === "succeeded") {
    const results = await client.beta.messages.batches.results(batchId);
    const articles = [];

    for await (const result of results) {
      if (result.result.type === "succeeded") {
        articles.push({
          id: result.custom_id,
          content: result.result.message.content[0].text,
          status: "success",
        });
      } else {
        console.error(`Request failed:`, result.result);
        articles.push({
          id: result.custom_id,
          status: "failed",
        });
      }
    }

    return articles;
  }

  return [];
}

function buildArticleHTML(title, content) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>${title} - Fortune Tech</title>
  <meta name="description" content="${title}">
</head>
<body>
  <article>
    <h1>${title}</h1>
    ${content}
  </article>
</body>
</html>`;

  return { slug, html };
}

async function publishArticle(title, content) {
  const { slug, html } = buildArticleHTML(title, content);
  const htmlPath = path.join("blog", `${slug}.html`);

  if (!fs.existsSync("blog")) {
    fs.mkdirSync("blog", { recursive: true });
  }

  fs.writeFileSync(htmlPath, html);
  console.log(`Published ftech article: ${slug}`);

  return slug;
}

function getRandomTopics(count = 3) {
  const topics = [
    "AI Chatbots for Small Businesses: ROI Calculator",
    "5 Quick Wins When Implementing AI Automation",
    "How SMEs Are Using AI to Compete with Big Tech",
    "Cost of AI Implementation vs. Manual Processes",
    "Top AI Tools for Customer Support in 2024",
    "Scaling Your Business with AI Content Systems",
    "AI for Business Documents: Templates That Save Time",
    "When to Build vs. Buy AI Solutions",
    "Case Study: Indian SME Saves ₹5L with AI",
    "Measuring AI ROI: The Metrics That Matter",
  ];

  const shuffled = [...topics].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function main() {
  if (process.argv[2] === "retrieve" && fs.existsSync("batch-id.txt")) {
    const batchId = fs.readFileSync("batch-id.txt", "utf-8").trim();
    console.log(`Retrieving ftech batch ${batchId}...`);

    const articles = await pollBatchResults(batchId);

    for (const article of articles) {
      if (article.status === "success") {
        const title = article.id.replace("ftech-", "").replace(/-/g, " ");
        await publishArticle(title, article.content);
      }
    }

    console.log(`Published ${articles.length} ftech articles`);
    fs.unlinkSync("batch-id.txt");
    return;
  }

  console.log("Building ftech batch...");

  const topics = getRandomTopics(3);
  const requests = [];

  for (const topic of topics) {
    const systemPrompt = `You are a technical writer for Fortune Tech, explaining AI solutions to Indian SME owners. Be practical, cost-focused, and focused on real ROI.`;

    const userPrompt = `Write a blog article for Fortune Tech about: "${topic}"

Target: Indian SME owners considering AI adoption
Focus: Practical value, cost implications, quick wins

Requirements:
- 700-1000 words
- Include specific cost/ROI examples where relevant
- Format as HTML <p> and <h2> tags
- End with a clear next step or CTA
- Avoid jargon; explain for decision-makers`;

    requests.push(
      createBatchRequest(
        `ftech-${topic.toLowerCase().replace(/\s+/g, "-")}`,
        topic,
        "claude-haiku-4-5-20251001",
        systemPrompt,
        userPrompt
      )
    );
  }

  const batch = await submitBatch(requests);

  if (batch) {
    console.log(`\nftech Batch queued. Retrieve with:`);
    console.log(`  node publish.js retrieve`);
    console.log(`Cost: 50% off. Processing 12-24 hours.`);
  }
}

main().catch(console.error);
