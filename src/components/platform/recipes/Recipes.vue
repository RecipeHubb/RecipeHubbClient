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
      recipes: [
        {
          id: 1,
          name: 'recipe 1',
          img: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          tags: ['Dinner', "Savory", "Meat"]

        },
        {
          id: 2,
          name: 'recipe 2',
          img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          tags: ['Dinner', "Savory", "Meat"]
        },
        {
          id: 3,
          name: 'recipe 3',
          img: 'https://picsum.photos/510/300?random',
          tags: ['Dinner', "Savory", "Meat"]
        },
        {
          id: 4,
          name: 'recipe 4',
          img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          tags: ['Dinner', "Savory", "Meat"]
        },
        {
          id: 5,
          name: 'recipe 5',
          img: 'https://picsum.photos/510/300?random',
          tags: ['Dinner', "Savory", "Meat"]
        },
      ],
    }
  },
  methods: {
    getRecipes: async function(user) {
      let res = RecipeService.getRecipes({
        username: user.username
      })
      return res
    }
  },
  mounted: async function() {
    // validate authorized user
    if (!AuthService.getToken()) {
      AuthService.logOut()
    } else {
      let user = JSON.parse(localStorage.getItem("user"));
      this.user = user;
      // get list of recipes
      let res = await this.getRecipes(user)
      this.recipes = res.data.result
    }
  },
};
</script>
