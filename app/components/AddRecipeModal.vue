<script setup lang="ts">
import PlusIcon from "~/assets/icons/plus.svg";
</script>

<template>
  <div>
    <button class="btn btn-accent" onclick="add_recipe_modal.showModal()">
      <PlusIcon width="24px" />
    </button>
    <dialog id="add_recipe_modal" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 class="modal-title text-lg font-bold">Add new recipe</h3>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">
            Add a link to the recipe you would like to add
          </legend>
          <input type="text" class="input" placeholder="Website link" />
        </fieldset>

        <div class="modal-action">
          <form method="dialog">
            <button class="btn btn-accent">Add</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped></style>
