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
  const prompt = `You are an expert recipe data extractor. Your task is to extract recipe data from the provided content.
  Return ONLY valid JSON with EXACTLY the following fields and formats: name: string, photo: string (find img tag closest to the recipe), link: string,
  timeToPrepare: string, servings: number, slug: string, shortDescription: string, tags: array of strings (1 word per tag describing type of the dish), ingredients: array of strings(example: 1 Cucumber, 2 tbs Maple Syrup),
  instructions: array of strings. Return ONLY the JSON without any additional text. Text: ${markdown}`;

  const res = await ollama.generate({
    model: "mistral",
    prompt,
    format: "json",
    stream: false,
    keep_alive: "30m",
    options: { temperature: 0.1, num_ctx: 8000 },
  });

  return JSON.parse(res.response);
}

export async function scrapeAndParse(url: string) {
  const html = await fetchHtml(url);
  const recipeMarkdown = htmlToMarkdown(html);
  const data = await getJSONData(recipeMarkdown);

  return data;
}
