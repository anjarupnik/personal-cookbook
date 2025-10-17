<script lang="ts" setup>
import type { Recipe } from "~/types/recipe";
import type { Alert } from "~/types/alert";

const { data } = await useFetch<Recipe[]>("/api/recipes");

useState<Recipe[]>("recipes", () => data.value ?? []);
useState<boolean>("loadingRecipe", () => false);
useState<Alert>("alert", () => ({ type: "success", text: "" }));
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
