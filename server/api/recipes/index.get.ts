import Recipe from "../../utils/models/RecipeModel";

export default defineEventHandler(async () => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    return recipes;
  } catch (err) {
    console.log(err);
    throw createError({
      status: 500,
      statusMessage: "Bad Request",
      message: "Failed to get recipes",
    });
  }
});
