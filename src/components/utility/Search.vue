<template>
  <div class="p-6 font-thin m-0">
    <div class="grid justify-center">
      <div class="my-6 text-center">
        <p class="text-xl">
          Read up on <span class="text-purple-300">Recipes </span> that make you
          Hunger.
        </p>
        <p class="text-base my-2">
          Search for any Recipe, I'm sure we have something for you.
        </p>
      </div>
      <!-- icon -->
      <!-- <input class="shadow appearance-none border rounded py-2 px-3 text-grey-darker w-3/4" /> -->
      <!-- icon -->
      <div class="mt-1 relative rounded-md shadow-sm flex">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <span class="text-gray-500 sm:text-sm">
            <i class="fa fa-search"></i>
          </span>
        </div>
        <input
          name="recipe"
          id="recipe"
          class="focus:ring-purple-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm shadow appearance-none border py-2 px-3 text-grey-darker border-purple-300 outline-none rounded-md"
          v-model="userInput"
          v-on:keyup.enter="searchRecipe"
          :placeholder="
            selectedQuickFilter.value === 'ingredients'
              ? `cheese, lemons, sugar, cream`
              : selectedQuickFilter.value === 'recipe name'
              ? 'chicken hearts'
              : selectedQuickFilter.value === 'username'
              ? 'beetsMan'
              : null
          "
        />

        <div class="absolute inset-y-0 right-0 flex items-center">
          <label for="recipe" class="sr-only">Recipe</label>
          <select
            id="recipe"
            name="recipe"
            class="focus:ring-purple-500 outline-none focus:gray-purple-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
            v-model="selectedQuickFilter"
            @change="updateChips"
          >
            <option
              v-for="(selectOption, i) in options"
              :key="i"
              :value="selectOption"
              :v-model="selectOption"
              >{{ selectOption.text }}</option
            >
          </select>
          <i
            v-on:click="searchRecipe"
            class="fa fa-arrow-right inset-y-0 mb-2 pr-5  hover:text-gray-900 cursor-pointer text-gray-700"
            style="font-size: 15px;margin-left: 10px;
                margin-top: 5px;"
          ></i>
        </div>

        <div class="absolute inset-x-full mx-2 inset-y-4">
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <div class="has-tooltip">
                  <span
                    class="tooltip bg-gray-900 text-white p-2 text-xs  lg:mt-100 rounded"
                    >Advance Filters</span
                  >
                  <i
                    v-bind="attrs"
                    v-on="on"
                    class="fa fa-stream  hover:text-gray-900 cursor-pointer text-gray-700 pl-4"
                    style="font-size: 15px;margin-left: 10px;
                margin-top: 5px;"
                    v-on:click="advanceFilters"
                  ></i>
                </div>
              </template>

              <v-card>
                <v-card-title>
                  <span class="headline">Advanced Settings</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4"> </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Username"
                          v-model="userName"
                          placeholder="gclaude"
                          color="deep-purple accent-2"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Recipe Name"
                          type="text"
                          v-model="recipeName"
                          placeholder="White Chili"
                          color="deep-purple accent-2"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Ingredients"
                          v-model="ingredients"
                          placeholder="cheese, lemons, sugar, cream"
                          color="deep-purple accent-2"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-autocomplete
                          :items="tagsList"
                          label="Tags"
                          multiple
                          v-model="tags"
                          color="deep-purple accent-2"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Close
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="searchRecipe">
                    Search
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </div>
      </div>

      <!-- CUSTOM CHIPS -->
      <div class="flex my-1 w-1/4">
        <div
          v-for="(selectedFilters, i) in activeFilters"
          :key="i"
          class=" flex justify-center items-center m-1 font-medium py-2 px-2 rounded-md text-green-700 bg-green-100 border border-green-300"
        >
          <div class=" text-xs font-normal leading-none flex-initial w-full">
            {{ selectedFilters.text }}
          </div>
          <!-- <div @click="removeChip(i)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-x cursor-pointer  rounded-full w-4 h-4 ml-2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div> -->
        </div>
      </div>
    </div>
    <div v-show="loading">
      <v-container>
        <v-row justify="center">
          <h1 class="text-5xl pt-10 pb-10 text-purple-500"></h1>
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
            <div class="text-purple-500 text-2xl">No Found Recipe</div>
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
              xs="10"
            >
              <RecipeCard :recipe="recipe" :route="route" />
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import Public from "../../service/PublicService";
import RecipeCard from "../platform/recipes/RecipeCard";
import tagsList from "../../utility/tagsList";
export default {
  name: "Search",
  components: {
    RecipeCard,
  },
  data() {
    return {
      route: "searchPage",
      tagsList,
      userName: null,
      recipeName: null,
      ingredients: null,
      tags: [],
      showAdvanceChip: false,
      dialog: false,
      selectedQuickFilter: { value: "recipe name", text: "Recipe Name" },
      selectOption: {},
      userInput: null,
      options: [
        { value: "recipe name", text: "Recipe Name" },
        { value: "username", text: "Username" },
        { value: "ingre dients", text: "Ingredients" },
      ],
      activeFilters: [{ text: "recipe name" }],
      selectedFilters: {},
      recipeData: {},
      advanceActiveChip: [],
      loading: false,
      recipes: [],
    };
  },
  methods: {
    async searchRecipe() {
      if (
        !this.userInput &&
        !this.recipeName &&
        !this.userName &&
        !this.tags &&
        this.ingredients
      ) {
        this.$vToastify.error("Please search something");
        return;
      }
      // custom filter
      if (this.selectedQuickFilter.value === "custom") {
        this.$vToastify.error("Please change Custom filter");
        return;
      }

      if (this.selectedQuickFilter.value == "username" || this.userName) {
        // not null
        if (this.userInput || this.userName) {
          this.recipeData.userName = this.userInput || this.userName;
        }

        this.validateReq(this.userName, this.userInput, "userName");

        // custom filters
        this.advanceActiveChip.push("username");
      }
      if (this.selectedQuickFilter.value == "recipe name" || this.recipeName) {
        //recipe name
        this.recipeData.name = this.userInput || this.recipeName;
        this.advanceActiveChip.push("recipe name");

        this.validateReq(this.recipeName, this.userInput, "name");
      }
      if (this.selectedQuickFilter.value == "ingredients" || this.ingredients) {
        //ingredient name
        let ingredients = null;
        if (this.userInput && !this.ingredients) {
          ingredients = this.userInput.split(", ");
        }
        if (this.ingredients) {
          ingredients = this.ingredients.split(", ");
        }
        this.recipeData["ingredients.name"] = {
          $all: ingredients,
        };

        if (this.ingredients) {
          this.validateReq(ingredients, this.userInput, "ingredients.name");
          this.advanceActiveChip.push("ingredient");
        }
      }
      if (this.tags.length !== 0) {
        let tags = (this.userInput && this.userInput.split(",")) || this.tags;
        //tags name
        this.recipeData["tags"] = {
          $all: tags,
        };

        this.advanceActiveChip.push("tags");
      }
      // reset values for the quickfilter
      if (this.showAdvanceChip) {
        this.showAdvanceChip = false;
        this.userName = null;
        this.recipeName = null;
        this.ingredients = null;
        this.userName = null;
        this.userInput = null
        
        const optionsExists = this.options.find((el) => el.value === "custom");

        // custom already exists in options don't push
        // if not than push to custom
        if (optionsExists) {
          this.selectedQuickFilter = { value: "custom", text: "Custom" };
          return;
        }
          this.options.push({ value: "custom", text: "Custom" });
          this.selectedQuickFilter = { value: "custom", text: "Custom" };
      }

      this.advancedChipHandler();
      const data = await Public.getRecipes(this.recipeData);
      this.loading = true;
      this.recipes = data.data;

      // reset filter ??
      this.recipeData = {};
      this.dialog = false;
    },
    close() {
      this.dialog = false;
      this.showAdvanceChip = false;
    },
    validateReq(data, input, type) {
      if (type === "ingredients.name") {
        this.recipeData[type] = {
          $all: data,
        };
        return;
      }

      if (data || input) {
        this.recipeData[type] = data || input;
        return;
      }
      this.recipeData[type] = {};
    },
    updateChips() {
      //reset the filter when they change
      this.userInput = null;
      this.activeFilters[0] = { text: this.selectedQuickFilter.value };
    },
    advanceFilters() {
      // reset values and set showAdvanceChip to true
      this.selectedQuickFilter = {};
      this.advanceActiveChip = [];
      this.showAdvanceChip = true;
    },
    advancedChipHandler() {
      if (this.showAdvanceChip) {
        //reset quickfilter and badges
        this.selectedQuickFilter = {};
        this.activeFilters = [];

        //push activeChip
        this.advanceActiveChip.forEach((txt) => {
          this.activeFilters.push({ text: txt });
        });

        const optionsExists = this.options.find((el) => el.value === "custom");

        // custom already exists in options don't push
        // if not than push to custom
        if (optionsExists) {
          this.selectedQuickFilter = { value: "custom", text: "Custom" };
          return;
        }
          this.options.push({ value: "custom", text: "Custom" });
          this.selectedQuickFilter = { value: "custom", text: "Custom" };
      }
    },
  },
};
</script>
