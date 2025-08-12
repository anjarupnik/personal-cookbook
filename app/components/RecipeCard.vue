<script setup lang="ts">
import type { Recipe } from "~/types/recipe";

const props = defineProps<{
  recipe: Recipe;
}>();
const reducedTags = props.recipe.tags.filter((_, i) => i < 2);
</script>

<template>
  <NuxtLink :to="`recipes/${recipe.slug}`">
    <div class="card bg-base-100 w-full shadow-sm">
      <figure>
        <img :src="recipe.photo" :alt="recipe.name" />
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

<style scoped></style>
