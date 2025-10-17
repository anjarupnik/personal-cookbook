import Recipe from "../../utils/models/RecipeModel";
import { scrapeAndParse } from "../../utils/ollama";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const data = await scrapeAndParse(body.url);
    const recipe = await Recipe.create(data);

    return recipe;
  } catch (err) {
    console.log(err);

    if (err?.code === 11000 && err.keyPattern?.slug) {
      throw createError({
        status: 409,
        statusMessage: "Bad Request",
        message: "Slug already exists",
      });
    }

    throw createError({
      status: 500,
      statusMessage: "Bad Request",
      message: "Adding recipe failed",
    });
  }
});
