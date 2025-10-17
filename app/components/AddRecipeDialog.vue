<script setup lang="ts">
import PlateIcon from "~/assets/icons/plate.svg";
import type { Recipe } from "~/types/recipe";
import type { Alert } from "~/types/alert";

const url = ref("");
const recipes = useState<Recipe[]>("recipes");
const dialog = ref<HTMLDialogElement | null>(null);
const loadingRecipe = useState<boolean>("loadingRecipe");
const alert = useState<Alert>("alert");

async function addRecipe() {
  try {
    dialog.value?.close();
    loadingRecipe.value = true;
    const res = await $fetch<Recipe>("/api/recipes", {
      method: "POST",
      body: {
        url: url.value,
      },
    });
    recipes.value = [res, ...recipes.value];

    loadingRecipe.value = false;
    alert.value = {
      type: "success",
      text: "Recipe successfully added",
    };
    url.value = "";
  } catch (error) {
    console.error(error);
    loadingRecipe.value = false;
    alert.value = {
      type: "success",
      text: "Adding recipe failed. Please try again!",
    };
  }
}
</script>

<template>
  <div>
    <button class="btn btn-accent" onclick="add_recipe_modal.showModal()">
      <PlateIcon width="24px" />
      <span class="text-white hidden md:inline">Add new</span>
    </button>
    <dialog id="add_recipe_modal" ref="dialog" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 class="modal-title text-lg font-bold">Add new recipe</h3>

        <form @submit.prevent="addRecipe">
          <fieldset class="fieldset">
            <legend class="fieldset-legend">
              Add a link to the recipe you would like to add
            </legend>
            <input
              v-model="url"
              type="url"
              class="input validator"
              required
              placeholder="https://"
              pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9-].*[a-zA-Z0-9])?.)+[a-zA-Z].*$"
              title="Must be valid URL"
            />
            <p class="validator-hint">Must be valid URL</p>
          </fieldset>
          <button class="btn btn-accent float-right" type="submit">Add</button>
        </form>
      </div>
    </dialog>
  </div>
</template>
