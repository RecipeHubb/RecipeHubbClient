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
import RecipeCard from './RecipeCard'
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
          img: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        },
        {
          id: 2,
          name: 'recipe 2',
          img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
        },
        {
          id: 3,
          name: 'recipe 3',
          img: 'https://picsum.photos/510/300?random'
        },
        {
          id: 4,
          name: 'recipe 4',
          img: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
        },
        {
          id: 5,
          name: 'recipe 5',
          img: 'https://picsum.photos/510/300?random'
        },
      ],
    }
  },
  mounted() {
    // get list of recipes
    let user = JSON.parse(localStorage.getItem("user"));
    this.user = user;
  },
};
</script>