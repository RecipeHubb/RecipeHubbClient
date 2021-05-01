<template>
  <v-card
    class="mx-auto"
    min-width="400"
    elevation='15'
  >
    <v-img
      v-if="recipe.recipeImage"
      alt="No Image Available"
      class="white--text align-end cursor-pointer"
      height="200px"
      max-height="200px"
      position="center"
      :src="recipe.recipeImage"
      @click="routeToRecipe"
      title="Click image to view more recipe details"
    >
    </v-img>
    <div v-else class="text-center mb-12 mt-12" @click="routeToRecipe"><i class="fas fa-apple-alt text-8xl text-gray-700 cursor-pointer"></i></div>

    <v-card-subtitle class="pb-0">
      <span class="text-2xl text-purple-500">{{recipe.name}}</span>
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{recipe.dateCreated}}</div>

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
        color="purple darken-1"
        text
      >
        <router-link :to="{name: 'publicSingleRecipe', params: {id: this.recipe._id, recipeName: this.recipe.name}}">
            View
        </router-link>
      </v-btn>

      <!-- Stars here -->
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
   name: 'PublicRecipeCard',
   props: ['recipe'],

   data: function() {
       return {

       }
   },
   methods: {
     routeToRecipe() {
        this.$router.push({name: 'publicSingleRecipe', params: { id: this.recipe._id, recipeName: this.recipe.name }})
     }
   },

}
</script>