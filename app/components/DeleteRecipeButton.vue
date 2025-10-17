<script setup lang="ts">
import type { Recipe } from "~/types/recipe";
import type { Alert } from "~/types/alert";
import TrashIcon from "~/assets/icons/trash.svg";

const props = defineProps<{ slug: string }>();
const alert = useState<Alert>("alert");

async function deleteItem() {
  try {
    await useFetch(`/api/recipes/${props.slug}`, {
      method: "delete",
    });

    const recipes = useState<Recipe[]>("recipes");
    recipes.value = recipes.value.filter(
      (recipe) => recipe.slug !== props.slug,
    );

    alert.value = {
      type: "success",
      text: "Recipe successfully deleted",
    };
  } catch (error) {
    console.log(error);
    alert.value = {
      type: "error",
      text: "Error deleting recipe",
    };
  }
}
</script>

<template>
  <button class="btn btn-accent" @click.prevent="deleteItem">
    <TrashIcon width="24px" />
    <span class="sr-only">Delete</span>
  </button>
</template>

<style scoped></style>
