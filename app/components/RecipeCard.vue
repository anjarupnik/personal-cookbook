<script setup lang="ts">
import type { Recipe } from "~/types/recipe";
import DeleteRecipeButton from "./DeleteRecipeButton.vue";

const props = defineProps<{
  recipe: Recipe;
  index: number;
}>();
const reducedTags = props.recipe.tags.filter((_, i) => i < 2);
</script>

<template>
  <NuxtLink :to="`recipes/${recipe.slug}`" class="grid grid-cols-2 grid-rows-1">
    <DeleteRecipeButton
      class="col-start-2 row-start-1 order-2 m-4"
      :slug="recipe.slug"
    />
    <div
      class="card bg-base-100 w-full shadow-sm col-start-1 col-span-2 row-start-1 order-1"
    >
      <figure>
        <img
          :src="recipe.photo"
          :alt="recipe.name"
          width="100%"
          height="auto"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          {{ recipe.name }}
        </h2>
        <p>
          {{ recipe.shortDescription }}
        </p>
        <div class="card-actions justify-end">
          <div
            v-for="tag in reducedTags"
            :key="tag"
            class="badge badge-outline"
          >
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.card-body {
  padding: 8px;
  height: fit-content;
}

img {
  aspect-ratio: 1/1;
  object-fit: cover;
}

button {
  z-index: 300;
  width: fit-content;
  justify-self: end;
}
</style>
