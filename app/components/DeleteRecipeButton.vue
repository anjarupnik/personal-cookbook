<script setup lang="ts">
import type { Recipe } from "~/types/recipe";
import type { Alert } from "~/types/alert";
import TrashIcon from "~/assets/icons/trash.svg";

const props = defineProps<{ slug: string }>();
const alert = useState<Alert>("alert");
const dialog = ref<HTMLDialogElement | null>(null);

function showDialog() {
  dialog.value?.show();
}

function closeDialog() {
  dialog.value?.close();
}

async function deleteItem() {
  try {
    await $fetch(`/api/recipes/${props.slug}`, {
      method: "delete",
    });

    const recipes = useState<Recipe[]>("recipes");
    recipes.value = recipes.value.filter(
      (recipe) => recipe.slug !== props.slug,
    );

    closeDialog();

    alert.value = {
      type: "success",
      text: "Recipe successfully deleted",
    };
  } catch (error) {
    closeDialog();
    console.log(error);
    alert.value = {
      type: "error",
      text: "Error deleting recipe",
    };
  }
}
</script>

<template>
  <div class="relative flex flex-col items-end">
    <button class="btn btn-accent w-fit" @click.prevent="showDialog()">
      <TrashIcon width="24px" />
      <span class="sr-only">Delete Recipe</span>
    </button>

    <Teleport to="body">
      <dialog id="delete_recipe_dialog" ref="dialog" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 class="modal-title text-lg font-bold mb-4">
            Are you sure you want to delete the recipe?
          </h3>

          <div class="flex gap-4">
            <button class="btn btn-accent" @click="deleteItem">Confirm</button>
            <button class="btn" @click="closeDialog">Cancel</button>
          </div>
        </div>
      </dialog>
    </Teleport>
  </div>
</template>

<style scoped></style>
