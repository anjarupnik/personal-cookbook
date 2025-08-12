<script setup lang="ts">
import type { Recipe } from "~/types/recipe";
import TimeIcon from "~/assets/icons/time.svg";
import PlateIcon from "~/assets/icons/plate.svg";
import MealIcon from "~/assets/icons/meal.svg";

const route = useRoute();
const { slug } = route.params;
const recipes = useState<Recipe[]>("recipes");
const recipe = recipes.value.find((rec) => rec.slug === slug);
</script>

<template>
  <div v-if="recipe">
    <div class="flex flex-col md:flex-row gap-4">
      <div class="w-full md:w-1/2 order-2 md:order-1">
        <h1 class="text-5xl mb-6">{{ recipe.name }}</h1>
        <div>
          <div class="mb-10">
            <NuxtLink :to="recipe.link" target="_blank" class="underline">{{
              recipe.link
            }}</NuxtLink>
          </div>

          <div class="flex flex-row gap-4">
            <div class="w-1/2">
              <div class="divider"><TimeIcon width="100px" /></div>
              <p class="text-center mt-6">{{ recipe.timeToPrepare }}</p>
            </div>

            <div class="w-1/2">
              <div class="divider"><PlateIcon width="100px" /></div>
              <p class="text-center mt-6">{{ recipe.servings }}</p>
            </div>
          </div>
        </div>

        <div class="divider" />

        <div>
          <h2 class="text-3xl mb-6 uppercase">Ingredients</h2>
          <ul class="list-[circle] ml-6">
            <li v-for="ingredient in recipe.ingredients" :key="ingredient">
              {{ ingredient }}
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full md:w-1/2 order-1 md:order-2 max-w-fit">
        <img :src="recipe.photo" :alt="recipe.name" />
      </div>
    </div>

    <div class="border-t border-white my-16" />
    <div>
      <h3 class="text-4xl text-center mb-8 md:mb-16 uppercase">Instructions</h3>

      <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/3 flex items-center justify-center">
          <MealIcon class="w-30 md:w-50" />
        </div>
        <ol class="list-decimal md:w-2/3">
          <li
            v-for="instruction in recipe.instructions"
            :key="instruction"
            class="ml-8"
          >
            {{ instruction }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
