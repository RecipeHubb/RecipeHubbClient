<template>
  <v-card
    class="mx-auto"
    max-width="400"
    @click="routeToRecipe"
    title="Click to view more recipe details"
  >
    <v-img
      v-if="recipe.img"
      alt="No Image Available"
      class="white--text align-end"
      height="200px"
      max-height="200px"
      position="center"
      :src="recipe.img"
    >
      <!-- <v-card-title><span class="text-white">{{recipe.name}}</span></v-card-title> -->
    </v-img>
    <div v-else class="text-center mb-12 mt-12"><i class="fas fa-apple-alt text-8xl text-gray-700 cursor-pointer"></i></div>

    <v-card-subtitle class="pb-0">
      <span class="text-2xl text-purple-500">{{recipe.name}}</span>
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Date Added: 04/04/2021</div>

      <div>
        <v-chip-group
          multiple
        >
          <v-chip
            v-for="tag in recipe.tags"
            :key="tag"
          >
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </div>
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
        <router-link :to="{name: 'singleRecipe', params: {id: this.recipe._id, recipeName: this.recipe.name}}">
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
        this.$router.push({name: 'singleRecipe', params: { id: this.recipe._id, recipeName: this.recipe.name }})
     }
   },

}
</script>
