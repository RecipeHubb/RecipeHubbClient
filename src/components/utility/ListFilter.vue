<template>
  <div class="text-purple-500 text-lg pt-5" >
    Filter by name
    <v-text-field
      color="deep-purple accent-2"
      v-model="filterBy"
      placeholder="Chicken Pot Pie"
      outlined
      dense
      @keyup="filterRecipes"
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
        filterBy: null
      }
    },
    methods: {
      filterRecipes: function(filter) {
        console.log
        if (filter.key === 'Backspace') this.$emit('filter-recipes', this.filterBy)
        else this.$emit('filter-recipes', this.filterBy)
      }
    }
}
</script>
