<script lang="ts" setup>
import RecipesList from "~/components/RecipesList.vue";
import type { Recipe } from "~/types/recipe";

const recipes = useState<Recipe[]>("recipes");
</script>

<template>
  <div>
    <h1 class="text-center text-3xl md:text-5xl mb-8 md:mb-20 italic">
      "What can I cook today?"
    </h1>
    <RecipesList :recipes="recipes" />
  </div>
</template>

<style lang="css" scoped></style>
