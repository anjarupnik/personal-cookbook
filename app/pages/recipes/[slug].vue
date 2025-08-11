<script setup lang="ts">
import type { Recipe } from "~/types/recipe";

const route = useRoute();
const { slug } = route.params;
const recipes = useState<Recipe[]>("recipes");
const recipe = recipes.value.find((rec) => rec.slug === slug);
</script>

<template>
  <div v-if="recipe">
    <div class="flex flex-col md:flex-row gap-4">
      <div class="w-100 md:w-1/2 order-2 md:order-1">
        <h2 class="text-5xl mb-6">{{ recipe.name }}</h2>
        <div>
          <div>
            <span>TOTAL TIME: </span>
            <span>{{ recipe.timeToPrepare }}</span>
          </div>
          <div>
            <span>SERVINGS: </span>
            <span>{{ recipe.servings }}</span>
          </div>
          <div>
            <span>LINK: </span>
            <NuxtLink :to="recipe.link" target="_blank">{{
              recipe.link
            }}</NuxtLink>
          </div>
        </div>
      </div>
      <div class="w-100 md:w-1/2 order-1 md:order-2">
        <img :src="recipe.photo" :alt="recipe.name" />
      </div>
    </div>

    <hr class="border-t border-white my-16" />
    <div>
      <h3 class="text-4xl mb-6">Ingredients</h3>
      <ul class="list-disc">
        <li v-for="ingredient in recipe.ingredients" :key="ingredient">
          {{ ingredient }}
        </li>
      </ul>
    </div>

    <hr class="border-t border-white my-16" />
    <div>
      <h3 class="text-4xl mb-6">Instructions</h3>
      <ol class="list-decimal">
        <li v-for="instruction in recipe.instructions" :key="instruction">
          {{ instruction }}
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped></style>
