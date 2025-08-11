<script setup lang="ts">
import Logo from "~/assets/icons/logo.svg";
import AddRecipeModal from "./AddRecipeModal.vue";
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">
      <NuxtLink to="/" class="logo">
        <Logo />
      </NuxtLink>
    </div>
    <div class="navbar-center hidden lg:flex">
      <h1 class="text-4xl">Anja's cookbook</h1>
    </div>
    <div class="navbar-end">
      <AddRecipeModal />
    </div>
  </div>
</template>

<style lang="css" scoped>
.logo {
  width: 120px;
}

.modal-title {
  text-transform: uppercase;
}
</style>
