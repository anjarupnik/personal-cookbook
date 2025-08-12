<script lang="ts" setup>
import type { Alert } from "~/types/alert";

const alert = useState<Alert>("alert");
</script>

<template>
  <div class="mx-4 lg:mx-24">
    <NavBar />
    <AddRecipeLoader />
    <Alert v-if="alert.text" />

    <div class="my-8 md:my-12">
      <slot />
    </div>
  </div>
</template>
