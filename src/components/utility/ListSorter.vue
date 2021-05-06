<template>
  <div class="text-purple-500 text-lg pt-5">
    Sort by...
    <v-select
<<<<<<< Updated upstream
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
=======
      :items="sortList"
>>>>>>> Stashed changes
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
import sortList from '../../utility/sortList'
export default {
  name: "ListFilter",
  props: ["recipes"],
  data() {
    return {
      sortList,
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
