<template lang="">
  <div class="w-screen">
    <v-container>
      <v-row justify="center">

        <v-col
          cols="12"
          sm="6"
          xs='10'
        >
          <h1 class="text-5xl pt-10 text-purple-500 text-center">
            Public Recipes
          </h1>        
        </v-col>

        <v-col
          order-lg="first"
          cols="12"
          sm="3"
          xs='10'
        >
          <ListSorter :recipes="recipes" @sort-recipes="sortRecipes" />
        </v-col>

        <v-col
        cols="12"
        sm="3"
        xs='10'
        >
          <ListFilter :recipes="recipes" @filter-recipes="filterRecipes" />
        </v-col>
      </v-row>
      <div v-if="!recipes">
        <v-row justify="center">
          <div class="text-purple-500 text-2xl">Loading Recipes...</div>
          <v-progress-circular
            indeterminate
            color="deep-purple accent-1"
          ></v-progress-circular>
        </v-row>
      </div>
      <div v-else-if="recipes.length === 0">
        <v-row justify="center">
          <div class="text-purple-500 text-2xl">No Recipes... sad</div>
        </v-row>
      </div>
      <div v-else>
        <v-row justify="center" >
          <v-col
            v-for="recipe in recipes" 
            :key="recipe.id"
            cols="12"
            :lg="colWidth"
            sm="6"
            xs="8"
          >
            <PublicRecipeCard :recipe="recipe" />
          </v-col>
        </v-row> 
      </div>
    </v-container>
  </div>
</template>

<script>
import RecipeService from "../../../service/RecipeService"
import AuthService from'../../../service/AuthService'
import PublicRecipeCard from '../publicRecipes/PublicRecipeCard'
import ListSorter from '../../utility/ListSorter'
import ListFilter from '../../utility/ListFilter'

export default {
  name: "Recipes",
  components: {
    PublicRecipeCard,
    ListSorter,
    ListFilter
  },

  data() {
    return {
      recipes: null,
      originalList: null,
      colWidth: null,
      filterBy: null
    }
  },
  methods: {
    sortRecipes: function (sorter) {
      switch (sorter){
        case 'Oldest':
          this.recipes = this.recipes.sort((a,b) => a.dateCreated.localeCompare(b.dateCreated))
          break
        case 'Newest':
          this.recipes = this.recipes.sort((a,b) =>  b.dateCreated.localeCompare(a.dateCreated))
          break
        case 'Recipe Name A-Z':
          this.recipes = this.recipes.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'Recipe Name Z-A':
          this.recipes = this.recipes.sort((a,b) => b.name.localeCompare(a.name))
          break
        case 'Highest Rated':
          // this.recipes = null
          break
        case 'Lowest Rated':
          // this.recipes = null
          break
        case 'So-Easy Rating':
          this.recipes = this.recipes.sort((a,b) => b.soEasyRating - a.soEasyRating)
          break
        case 'Serving Size':
          this.recipes = this.recipes.sort((a,b) => b.servingSize - a.servingSize)
          break
      }
    },
    filterRecipes: function (filterString) {
        if (filterString !== '') {
          let newList = this.originalList.filter(recipe => recipe.name.toLowerCase().includes(filterString))
          if (newList.length == 1) this.colWidth = 6
          else if (newList.length == 2) this.colWidth = 6
          else this.colWidth = 4
          this.recipes = newList
          return
        }
        else {
          this.recipes = this.originalList
          this.colWidth = 4
        }
    }
  },
  mounted: async function() {
    // validate authorized user
    if (!AuthService.getToken()) {
      AuthService.logOut()
    }
    let res = await RecipeService.getPublicRecipes()
    this.recipes = res.data
    this.originalList = res.data
    if (this.recipes.length == 1) this.colWidth = 12
    else if (this.recipes.length == 2) this.colWidth = 6
    else this.colWidth = 4
  },
};
</script>
