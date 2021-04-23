<template>
  <v-card
    class="mx-auto"
    max-width="400"
    @click="routeToRecipe"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="recipe.img"
    >
      <!-- <v-card-title><span class="text-white">{{recipe.name}}</span></v-card-title> -->
    </v-img>

    <v-card-subtitle class="pb-0">
      <span class="text-2xl text-purple-500">{{recipe.name}}</span>
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Date Added: 04/04/2021</div>

      <div>Category Tags</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
        text
      >
        Share
      </v-btn>

      <v-btn
        color="orange"
        text
      >
        <router-link :to="{name: 'singleRecipe', params: {id: this.recipe.id}}">
            View
        </router-link>
      </v-btn>

      Stars here
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
   name: 'RecipeCard',
   props: ['recipe'],

   data: function() {
       return {

       }
   },
   methods: {
     routeToRecipe() {
        this.$router.push({name: 'singleRecipe', params: { id: this.recipe.id }})
     }
   },

}
</script>
