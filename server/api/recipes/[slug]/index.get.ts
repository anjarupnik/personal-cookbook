import Recipe from "../../../utils/models/RecipeModel";
import type { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  const slug = getRouterParam(event, "slug");
  const recipe = await Recipe.findOne({ slug });

  if (!recipe) {
    throw createError({
      status: 404,
      statusMessage: "Not Found",
      message: "Recipe not found",
    });
  }

  return recipe;
});
