<script lang="ts" setup>
import type { Recipe } from "~/types/recipe";

const { data } = await useFetch<Recipe[]>("http://localhost:8080/recipes");
useState<Recipe[]>("recipes", () => data.value ?? []);
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
