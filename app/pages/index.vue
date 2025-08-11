<script lang="ts" setup>
import RecipesList from "~/components/RecipesList.vue";
import type { Recipe } from "~/types/recipe";

const recipes = useState<Recipe[]>("recipes");
</script>

<template>
  <div>
    <h2 class="text-center text-2xl mb-8 md:mb-16">
      What would you like to cook today?
    </h2>
    <RecipesList :recipes="recipes" />
  </div>
</template>
