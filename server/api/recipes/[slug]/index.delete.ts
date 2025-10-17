import Recipe from "../../../utils/models/RecipeModel";
import type { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  const slug = getRouterParam(event, "slug");
  await Recipe.deleteOne({ slug });

  return "Recipe succesfully deleted";
});
