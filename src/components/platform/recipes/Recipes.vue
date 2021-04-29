<template lang="">
  <div>
    <v-container grid-list-xs>
      <v-row justify="center">
        <h1 class="text-5xl pt-10 pb-10 text-purple-500">
          My Recipes
        </h1>
      </v-row>
      
      <v-row justify="center">
        <v-col
          v-for="recipe in recipes" 
          :key="recipe.id"
          cols="12"
          lg="4"
          sm="6"
          xs="10"
        >
          <RecipeCard :recipe="recipe" />
        </v-col>
      </v-row> 
    </v-container>
  </div>
</template>

<script>
import RecipeService from "../../../service/RecipeService";

import RecipeCard from './RecipeCard'
import AuthService from'../../../service/AuthService'
export default {
  name: "Recipes",
  components: {
    RecipeCard
  },

  data() {
    return {
      recipes: null
    }
  },
  methods: {

  },
  mounted: async function() {
    // validate authorized user
    if (!AuthService.getToken()) {
      AuthService.logOut()
    }
    // get list of recipes
    let res = await RecipeService.getRecipes()
    this.recipes = res.data
  },
};
</script>
