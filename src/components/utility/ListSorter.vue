<template>
  <div class="text-purple-500 text-lg pt-5">
    Sort by...
    <v-select
      :items="sortList"
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
