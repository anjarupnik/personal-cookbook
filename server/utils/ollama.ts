import * as cheerio from "cheerio";
import { Ollama } from "ollama";
import TurndownService from "turndown";

const ollama = new Ollama();

async function fetchHtml(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Fetch failed ${res.status} ${res.statusText}`);
  }

  return await res.text();
}

function htmlToMarkdown(html: string) {
  const $ = cheerio.load(html);
  $("script, style, noscript, svg").remove();
  $("[style]").removeAttr("style");
  const recipe = $(".wprm-recipe-container").html() || $("body").html();

  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(recipe);

  return markdown;
}

async function getJSONData(markdown: string) {
  const prompt = `
      You are an expert recipe data extractor and translator.

      TASK:
      1. Extract all recipe details and output ONLY **valid JSON**.
      2. Translate ALL text values (including name, ingredients, instructions, description, etc.) to English.
      3. Your output must be in this exact JSON structure, with correct field names and valid JSON:

      {
        "name": string,
        "photo": string,         // closest <img> to recipe
        "link": string,
        "timeToPrepare": string,
        "servings": number,
        "slug": string,
        "shortDescription": string,
        "tags": [string],
        "ingredients": [string],
        "instructions": [string]
      }

      Do NOT include any explanation, comments, or text outside of the JSON object.

      CONTENT:
      ${markdown}
      `;

  const res = await ollama.generate({
    model: "llama3.1",
    prompt,
    format: "json",
    stream: false,
    keep_alive: "30m",
    options: { temperature: 0, num_ctx: 8000 },
  });

  return JSON.parse(res.response);
}

export async function scrapeAndParse(url: string) {
  const html = await fetchHtml(url);
  const recipeMarkdown = htmlToMarkdown(html);
  const data = await getJSONData(recipeMarkdown);

  return data;
}
