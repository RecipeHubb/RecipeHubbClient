<template>
  <div class="text-purple-500 text-lg pt-5">
    Sort by...
    <v-select
      :items="[
        'Oldest',
        'Newest',
        'Recipe Name A-Z',
        'Recipe Name Z-A',
        'So-Easy Rating',
        'Serving Size',
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
    filterRecipes: function(filter) {
      this.$emit("sort-recipes", filter);
    },
  },
};
</script>
