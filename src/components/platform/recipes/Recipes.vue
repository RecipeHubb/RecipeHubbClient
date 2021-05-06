<template lang="">
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6" xs="4">
        <h1 class="text-5xl pt-10 text-purple-500 text-center">
          {{ title }}
        </h1>
      </v-col>

      <v-col order-lg="first" cols="12" sm="3" xs="4">
        <ListSorter :recipes="recipes" @sort-recipes="sortRecipes" />
      </v-col>

      <v-col cols="12" sm="3" xs="4">
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
      <v-row justify="center">
        <v-col
          v-for="recipe in recipes"
          :key="recipe.id"
          cols="12"
          :lg="colWidth"
          sm="6"
          xs="8"
        >
          <RecipeCard :recipe="recipe" :route="route" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import RecipeService from "../../../service/RecipeService";
import AuthService from "../../../service/AuthService";
import RecipeCard from "./RecipeCard";
import ListSorter from "../../utility/ListSorter";
import ListFilter from "../../utility/ListFilter";

export default {
  name: "Recipes",
  components: {
    RecipeCard,
    ListSorter,
    ListFilter,
  },
  data() {
    return {
      recipes: null,
      originalList: null,
      colWidth: null,
      filterBy: null,
      route: null,
      title: null,
    };
  },
  methods: {
    sortRecipes: function(sorter) {
      switch (sorter) {
        case "Oldest":
          this.recipes = this.recipes.sort((a, b) => a.dateCreated.localeCompare(b.dateCreated));
          break;
        case "Newest":
          this.recipes = this.recipes.sort((a, b) => b.dateCreated.localeCompare(a.dateCreated));
          break;
        case "Recipe Name A-Z":
          this.recipes = this.recipes.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "Recipe Name Z-A":
          this.recipes = this.recipes.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "So-Easy Rating":
          this.recipes = this.recipes.sort((a, b) => b.soEasyRating - a.soEasyRating);
          break;
        case "Serving Size":
          this.recipes = this.recipes.sort((a, b) => b.servingSize - a.servingSize);
          break;
      }
    },
    filterRecipes: function(filterString) {
      if (filterString !== "") {
        let newList = this.originalList.filter((recipe) =>
          recipe.name.toLowerCase().includes(filterString)
        );
        if (newList.length == 1) this.colWidth = 6;
        else if (newList.length == 2) this.colWidth = 6;
        else this.colWidth = 4;
        this.recipes = newList;
        return;
      } else {
        this.recipes = this.originalList;
        this.colWidth = 4;
      }
    },
    updateRecipeList: async function() {
      let res = await RecipeService.getRecipes();
      this.recipes = res.data;
    },
  },
  mounted: async function() {
    // validate authorized user
    if (!AuthService.getToken()) {
      AuthService.logOut();
    }
    // fetch the correct recipe list based off the path
    let res;
    if (this.$route.path === "/recipes") {
      res = await RecipeService.getRecipes();
      this.route = "singleRecipe";
      this.title = "My Recipes";
    } else if (this.$route.path === "/public/recipes") {
      res = await RecipeService.getPublicRecipes();
      this.route = "publicSingleRecipe";
      this.title = "Public Recipes";
    }
    if (res.status === 200) {
      this.recipes = res.data;
      this.originalList = res.data;
      if (this.recipes.length == 1) this.colWidth = 12;
      else if (this.recipes.length == 2) this.colWidth = 6;
      else this.colWidth = 4;
    }
  },
};
</script>
