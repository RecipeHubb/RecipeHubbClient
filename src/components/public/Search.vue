<template>
  <div class="p-6 font-thin m-0 h-screen">
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
        />
        
        <div class="absolute inset-y-0 right-0 flex items-center">
          <label for="recipe" class="sr-only">Recipe</label>
          <select
            id="recipe"
            name="recipe"
            class="focus:ring-purple-500 outline-none focus:gray-purple-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
            v-model="selectModel"
            @change="changeTest"
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
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <div class='has-tooltip'>
  <span class='tooltip bg-gray-900 text-white p-2 text-xs  lg:mt-100 rounded'>Advance Filters</span>
        <i
                v-bind="attrs"
                v-on="on"
                class="fa fa-stream  hover:text-gray-900 cursor-pointer text-gray-700 pl-4"
                style="font-size: 15px;margin-left: 10px;
                margin-top: 5px;"
                v-on:click="openDialog"
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
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Username"
                  v-model="userName"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Recipe Name"
                  type="text"
                  v-model="recipeName"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Ingredient"
                  v-model="ingredients"
                ></v-text-field>
              </v-col>
              <!-- <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Tag"
                  required
                ></v-select>
              </v-col> -->
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack','American',
                  'Mexican', 'Italian', 'Thai', 'Indian', 'Chinese', 'Seafood', 'Chicken',
                  'Beef', 'Pork', 'Vegetables', 'Fruit','Sweet', 'Spicy', 'Savory', 'Other'
                  ]"
                  label="Tags"
                  multiple
                  v-model="tags"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="searchRecipe"
          >
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
 <div v-for="(selectedFilters, i) in activeFilters" :key="i" class=" hover:bg-green-200 flex justify-center items-center m-1 font-medium py-2 px-2 rounded-md text-green-700 bg-green-100 border border-green-300 w-1/4" >
          <div
            class=" text-xs font-normal leading-none flex-initial cursor-pointer w-full"
          >
            {selectedFilter.text}
          </div>
          <div>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Public from "../../service/PublicService";
export default {
  name: "Search",
  data() {
    return {
      items: [],
      userName: null,
      recipeName: null,
      ingredients:null,
      tags: [],
      dialog:false,
      selectModel: { value: "name", text: "Recipe Name" },
      selectOption: {},
      userInput: null,
      options: [
        { value: "name", text: "Recipe Name" },
        { value: "username", text: "Username" },
        { value: "ingredients", text: "Ingredients" },
      ],
      activeFilters: [],
      selectedFilters: {},
      recipeData: {},
    };
  },
  methods: {
    // functions
    async searchRecipe() {

      if(!this.userInput && !this.recipeName && !this.userName && !this.tags) {
            this.$vToastify.error("Please search something")
          return
      }
      if (this.selectModel.value == "username" || this.userName) {
        //username
        this.recipeData.userName = this.userInput || this.userName;
      }
      if (this.selectModel.value == "name" || this.recipeName) {
        //username
        this.recipeData.name = this.userInput || this.recipeName;

      }
      if (this.selectModel.value == "ingredients" || this.ingridients) {
        //recipe name
        const ingredients = this.userInput.split(",") || this.ingridients;
        this.recipeData["ingredients.name"] = {
          $all: ingredients
        };
      }

       if (this.tags) {
        //tags name
        this.recipeData["ingredients.tags"] = {
          $all: this.tags
        };
      }
      const data = await Public.getRecipes(this.recipeData);
      console.log(data, this.recipeData)
      //reset filter ??
      this.recipeData = {};
      this.dialog = false
    },
    changeTest() {
      //reset the filter when they change
      this.selectedFilters.push({text:this.selectModel.value})
    },
    openDialog() {
      // remove the model value
      this.selectModel = {}
    }

  },
  mounted() {
    //before the page loads
  },
};
</script>
