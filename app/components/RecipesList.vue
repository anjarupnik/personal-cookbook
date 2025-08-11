<script setup lang="ts">
import RecipeCard from "./RecipeCard.vue";
import type { Recipe } from "~/types/recipe";

defineProps<{
  recipes: Recipe[];
}>();
</script>

<template>
  <div>
    <ul
      class="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 list-none p-0 m-0"
    >
      <li v-for="recipe in recipes" :key="recipe.slug">
        <RecipeCard :recipe="recipe" />
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
