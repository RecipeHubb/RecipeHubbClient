<template>
  <div class="text-purple-500 text-lg pt-5">
    Sort by...
    <v-select
      :items="[
        'Breakfast',
        'Lunch',
        'Dinner',
        'Dessert',
        'Snack',
        'Recipe Name A-Z',
        'Recipe Name Z-A',
        'So-Easy Rating',
        'Serving Size',
        'Oldest',
        'Newest',
      ]"
      color="deep-purple accent-2"
      v-model="filterBy"
      outlined
      dense
      @change="filterRecipes"
    >
    </v-select>
  </div>
</template>

<script>
export default {
  name: "ListFilter",
  props: ["recipes"],
  data() {
    return {
      filterBy: "Oldest",
    };
  },
  methods: {
    // sort recipes in the Recipes.vue page
    filterRecipes: function(filter) {
      this.$emit("sort-recipes", filter);
    },
  },
};
</script>
