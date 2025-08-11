<script lang="ts" setup>
import recipesData from "../mocks/recipes.json";
import type { Recipe } from "~/types/recipe";

useState<Recipe[]>("recipes", () => recipesData);
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
