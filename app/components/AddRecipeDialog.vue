<script setup lang="ts">
import PlusIcon from "~/assets/icons/plus.svg";
import type { Recipe } from "~/types/recipe";

const url = ref("");
const recipes = useState<Recipe[]>("recipes");
const dialog = ref<HTMLDialogElement | null>(null);

async function addRecipe() {
  try {
    const res = await $fetch<Recipe>("http://localhost:8080/recipes", {
      method: "POST",
      body: {
        url: url.value,
      },
    });
    recipes.value = [res, ...recipes.value];

    dialog.value?.close();
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div>
    <button class="btn btn-accent" onclick="add_recipe_modal.showModal()">
      <PlusIcon width="24px" />
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

<style scoped></style>
