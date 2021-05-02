<template>
  <div class="text-purple-500 text-lg pt-5" >
    Filter by...
    <v-text-field
      color="deep-purple accent-2"
      v-model="filterBy"
      outlined
      dense
      @change="filterRecipes"
    >
    </v-text-field>
  </div>
</template>

<script>
export default {
    name: 'ListFilter',
    props: ['recipes'],
    data() {
      return {
        filterBy: 'Oldest'
      }
    },
    methods: {
      filterRecipes: function(filter) {
        this.$emit('filter-recipes', filter)
      }
    }
}
</script>
