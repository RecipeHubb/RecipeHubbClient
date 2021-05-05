<template>
  <v-card
    class="mx-auto"
    min-width="300"
    min-height="300"
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
    <div v-else class="text-center mb-12 mt-12" @click="goBack"><i class="fas fa-apple-alt text-8xl text-gray-700 cursor-pointer"></i></div>

    <v-card-subtitle class="pb-0">
      <span class="text-2xl text-purple-500">{{recipe.name}}</span>
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Date Added: {{createdDate}}</div>

      <div v-if="recipe.tags.length > 0">
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
      <div v-else class="pt-3.5 pb-3 text-purple-400">
        No Tags Included
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
      <v-rating
        v-if="avgRating"
        half-increments
        v-model="avgRating"
        background-color="deep-purple accent-2"
        color="deep-purple accent-2"
        title="average rating on this recipe"
        readonly
        small
      ></v-rating>
      <span v-if="avgRating" class="pl-1 pt-1 text-purple-500 text-sm ">
        ({{avgRating}})
      </span>

      <!-- Stars here -->
    </v-card-actions>
  </v-card>
</template>
<script>
import CommentService from '../../../service/CommentService'

export default {
   name: 'PublicRecipeCard',
   props: ['recipe', 'route'],

   data: function() {
       return {
         createdDate: null,
         avgRating: null,
       }
   },
   methods: {
     routeToRecipe() {
        this.$router.push({name: this.route, params: { id: this.recipe._id, recipeName: this.recipe.name }})
     }
   },
   mounted: async function() {
     this.createdDate = (new Date(this.recipe.createdAt)).toDateString()
    // get comments attached to recipe
    let comments = await CommentService.getCommentsToRecipe(this.recipe._id)
    if(comments) {
      this.avgRating = comments.data && comments.data.average ?  Number(comments.data.average.toFixed(1)) : null
    } 
  }
}
</script>