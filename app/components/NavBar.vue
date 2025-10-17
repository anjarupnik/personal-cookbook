<script setup lang="ts">
import Logo from "~/assets/icons/logo.svg";
import AddRecipeModal from "./AddRecipeDialog.vue";
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm border-b-1 border-white">
    <div class="navbar-start">
      <NuxtLink to="/">
        <Logo class="logo w-16 md:w-30" />
      </NuxtLink>

      <h2 class="text-xl md:text-4xl ml-4 lg:ml-8 font-serif uppercase">
        Weekly recipes
      </h2>
    </div>

    <div class="navbar-end">
      <AddRecipeModal />
    </div>
  </div>
</template>
