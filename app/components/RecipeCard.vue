<script setup lang="ts">
import type { Recipe } from "~/types/recipe";

defineProps<{
  recipe: Recipe;
}>();
</script>

<template>
  <NuxtLink :to="`recipes/${recipe.slug}`">
    <div class="card bg-base-100 h-full shadow-sm">
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
            v-for="tag in recipe.tags"
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
