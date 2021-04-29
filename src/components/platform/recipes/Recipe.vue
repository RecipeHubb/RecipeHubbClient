<template lang="">
    <div>
      <v-row justify="start" align="center" class="textlsl pt-125 pt-10 -pb-3">
        <span @click="goBack" title="Go back to Recipes List" class="mt-4">
          <i class="fas fa-chevron-left text-5xl text-purple-600 cursor-pointer"></i>
        </span>
      </v-row>
      <v-container v-if="editMode" fluid>
        <v-row justify="center" class="text-5xl pb-10 -mt-5 text-purple-500">
          <v-col
            cols='12'
            lg='3'
          >
            <v-text-field
              outlined
              label="Name*"
              v-model="name"
              dense
            ></v-text-field>
          </v-col>
          <v-col
            cols='12'
            lg='1'
          >
            <span v-if="editMode" @click="switchIcon" title="Toggle Preview Mode"><i class="fas fa-eye mr-2 text-3xl text-gray-900 cursor-pointer "></i></span>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col
            cols='12'
            lg='4'
            sm='6'
            xs='10'
          >
            <!-- Image -->
            <v-row>
              <v-col
                cols='12'
                sm='12'
              >
                <div>
                  <div>
                    <img 
                      :src="recipeImage" 
                      height="200" 
                      width="200"
                      class="bg-gray-400"
                    >
                  </div>
                  <input
                    class="mt-2"
                    type="file"
                    accept="image/*"
                    @change="previewImage"
                  >
                </div>
              </v-col>
           <!-- Tags -->
              <v-col
                cols='12'
                sm='12'
              >
                <v-autocomplete
                  :items="['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack','American',
                  'Mexican', 'Italian', 'Thai', 'Indian', 'Chinese', 'Seafood', 'Chicken',
                  'Beef', 'Pork', 'Vegetables', 'Fruit','Sweet', 'Spicy', 'Savory', 'Other'
                  ]"
                  v-model="tags"
                  label="Tags"
                  multiple
                  outlined
                ></v-autocomplete>
              </v-col>
            <!-- So easy meter -->
              <v-col
                cols='12'
                sm='12'
              >
                <v-slider
                  v-model="soEasyRating"
                  class="align-center"
                  max="5"
                  min="0"
                  label="So-Easy Rating: "
                  hide-details
                >
                  <template v-slot:append>
                    <span class="pt-1 text-purple-600 ">{{soEasyRating}}</span>
                  </template>
                </v-slider>
              </v-col>
           <!-- Serves -->
              <v-col
                cols='12'
                sm='12'
              >
                <v-slider
                  v-model="servingSize"
                  class="align-center"
                  max="20"
                  min="0"
                  label="Serves: "
                  hide-details
                >
                  <template v-slot:append>
                    <span class="pt-1 text-purple-600 ">{{servingSize}}</span>
                  </template>
                </v-slider>
              </v-col>
           <!-- Public -->
           <!-- Favorited -->
              <v-col
                cols='12'
                sm='12'
              >
                <v-switch
                  v-model="isPublic"
                  color="purple"
                  :label="`Public ${isPublic}`"
                ></v-switch>
                <v-switch
                  v-model="favorited"
                  color="purple"
                  :label="`Favorite ${favorited}`"
                ></v-switch>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols='12'
            lg='5'
            sm='6'
            xs='10'
          >
           <!-- Ingredients -->
            <v-row>
              <v-col
                cols="12"
                sm="12"
              >
                <div class="ml-4">Add/Remove Ingredients</div>
                  <v-row>
                    <v-col
                      cols="12"
                      sm='10'
                      class="ma-0 pa-0"
                    >
                      <v-text-field
                        outlined
                        dense
                        label="New Ingredient"
                        placeholder="2 lb Chicken breast"
                        v-model="newIngredient"
                        :value="newIngredient"
                        required
                        @keydown.enter="addIngredient"
                        class="ma-0 pa-0"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm='1'
                    >
                      <span 
                        class="text-green-600 text-3xl cursor-pointer" 
                        :disabled="isAddIngredientBlank" 
                        title="Add this ingredient" 
                        @click="addIngredient"
                      >
                      +
                      </span>
                    </v-col>
                </v-row>
                <!-- Ingredients List -->
                <div class="overflow-y-auto h-60">
                  <span v-for="(ingredient, index) of ingredients" :key="ingredient">
                    <v-row>
                      <v-col
                        cols="12"
                        sm='10'
                        class="ma-0 pa-0"
                      >
                        <v-text-field
                          outlined
                          dense
                          :value="ingredient"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm='1'
                        class="ma-0 pa-0"
                      >
                        <span class="text-red-600 text-2xl cursor-pointer" title="Remove this ingredient" @click="deleteIngredient(index)">X</span>
                      </v-col>
                    </v-row>
                  </span>
                </div>
              </v-col> 
              <!-- Instructions -->
              <v-col
                cols='12'
                sm='12'
              >
                <v-textarea
                  outlined
                  name="input-7-4"
                  label="Instructions"
                  placeholder="Enter additonal cooking instructions here..."
                  v-model="instructions"
                ></v-textarea>
              </v-col>
            </v-row>
          
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn 
            outlined
            class="bg-green-500 mr-4" 
            @click="updateRecipe"
          >
            Save
          </v-btn>
          <v-btn 
            outlined
            class="bg-red-500" 
            @click="openDialog"
          >
            Delete
          </v-btn>

        </v-row>
      </v-container>
      <!-- - - - - - - - - Preview Mode - - - - - - - - - - - - - - -->
      <v-container v-else fluid>
        <v-row justify="center">
          <h1 class="text-5xl pt-10 pb-10 text-purple-500">
            {{name}}

            <span v-if="!editMode" @click="switchIcon" title="Toggle Edit Mode"><i class="far fa-edit mr-2 text-3xl text-gray-900 cursor-pointer"></i></span>
          </h1>
        </v-row>
        <v-row justify="center" align="center">
          <v-col
            cols='12'
            lg='4'
            sm='6'
            xs='10'
          >
            <!-- Image -->
            <v-row>
              <v-col
                cols='12'
                sm='12'
              >
                <div>
                  <div>
                    <img 
                      :src="recipeImage" 
                      height="200" 
                      width="200"
                      class="bg-gray-400"
                    >
                  </div>
                </div>
              </v-col>
           <!-- Tags -->
              <v-col
                cols='12'
                sm='12'
              >
              <v-chip-group
                  multiple
                >
                  <v-chip
                    v-for="tag in tags"
                    :key="tag"
                  >
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            <!-- So easy meter -->
              <v-col
                cols='12'
                sm='12'
              >
                <v-slider
                  v-model="soEasyRating"
                  class="align-center"
                  max="5"
                  min="0"
                  label="So-Easy Rating: "
                  hide-details
                  disabled
                >
                  <template v-slot:append>
                    <span class="pt-1 text-purple-600 ">{{soEasyRating}}</span>
                  </template>
                </v-slider>
              </v-col>
           <!-- Serves -->
              <v-col
                cols='12'
                sm='12'
              >
                <v-slider
                  v-model="servingSize"
                  class="align-center"
                  max="20"
                  min="0"
                  label="Serves: "
                  hide-details
                  disabled
                >
                  <template v-slot:append>
                    <span class="pt-1 text-purple-600 ">{{servingSize}}</span>
                  </template>
                </v-slider>
              </v-col>
           <!-- Public -->
           <!-- Favorited -->
              <v-col
                cols='12'
                sm='12'
              >
                <v-switch
                  v-model="isPublic"
                  color="purple"
                  :label="`Public`"
                  disabled
                ></v-switch>
                <v-switch
                  v-model="favorited"
                  color="purple"
                  :label="`Favorite`"
                  disabled
                ></v-switch>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols='12'
            lg='5'
            sm='6'
            xs='10'
          >
           <!-- Ingredients -->
            <v-row>
              <v-col
                cols="12"
                sm="12"
              >
                <h3 class="text-2xl pb-2 text-purple-500">
                Ingredients
                </h3>
                <ul v-for="ingredient of ingredients" :key="ingredient">
                  <li>
                    {{ingredient}}
                  </li>
                </ul>
              </v-col> 
              <!-- Instructions -->
              <v-col
                cols='12'
                sm='12'
              >
                <h3 class="text-2xl pt-10 pb-2 text-purple-500">
                Instructions
                </h3>
                  <p class="text-justify">
                    {{instructions}}
                  </p>
              </v-col>
            </v-row>
          
          </v-col>
        </v-row>

      </v-container>
      <div data-app>
        <ConfirmDeleteDialog @close-dialog="closeDialog" @delete-recipe="deleteRecipe" :open="deleteOpen" />
      </div>
    </div>
</template>

<script>
import AuthService from '../../../service/AuthService'
import RecipeService from '../../../service/RecipeService'
import ConfirmDeleteDialog from '../../utility/ConfirmDeleteDialog'
export default {
  name: "Recipe",
  components: {
    ConfirmDeleteDialog
  },
  data() {
    return {
      recipe: {},
      editMode: false,
      deleteOpen: false,

      name: null,
      recipeImage: null,
      previewImg: null,
      instructions: null,
      tags: [],
      servingSize: 0,
      soEasyRating: 0,
      ingredients: [],
      newIngredient: '',
      isPublic: false,
      favorited: false,
    };
  },
  mounted: async function() {
    if (!AuthService.getToken()) {
      AuthService.logOut()
    } 
    //get recipe data from API/DB from params
    let res = await RecipeService.getRecipeByID(this.$route.params.id)
    this.name = res.data.name
    this.recipeImage = res.data.recipeImage
    this.instructions = res.data.instructions
    this.tags = res.data.tags
    this.servingSize = res.data.servingSize
    this.soEasyRating = res.data.soEasyRating
    this.ingredients = res.data.ingredients
    this.isPublic = res.data.public
    this.favorited = res.data.favorited
    this.recipeID = res.data._id
  },
  methods: {
    updateRecipe: async function() {
      if (!this.name){
        this.$vToastify.error("Please fill out required fields before updating")
        return
      }
      const res = await RecipeService.updateRecipe(this.recipeID,{
        name: this.name,
        ingredients: this.ingredients,
        instructions: this.instructions,
        recipeImage: JSON.stringify(this.recipeImage),
        servingSize: this.numPeopleServed,
        soEasyRating: this.soEasyRating,
        tags: this.tags,
        favorited: this.favorited,
        public: this.isPublic
      })
      if (res.status === 200){
        this.editMode = false
        this.$vToastify.success(`${this.name} sucessfully updated`)
      }
    },

    deleteRecipe: async function() {
      const res = await RecipeService.deleteRecipe(this.recipeID)
      if (res.status === 200){
        this.editMode = false
        this.$vToastify.success(`${this.name} sucessfully deleted`)
        this.$router.push('/recipes')
      }
    },

    previewImage: function(event) {
      const input = event.target
      console.log(input)
      if (input.files && input.files[0]) {
          const reader = new FileReader()
          reader.onload = (e) => {
              this.previewImg = e.target.result;
              this.recipeImage = e.target.result
          }
          reader.readAsDataURL(input.files[0]);
      }
    },

    addIngredient: function(){
      if (!this.isAddIngredientBlank){
        this.ingredients.push(this.newIngredient)
        this.newIngredient = ''
      }
      else{
        this.$vToastify.warning("Fill out new ingredient before adding")
        return
      }
    },

    deleteIngredient: function(index){
      this.ingredients.splice(index, 1)
    },

    switchIcon: function(){
      this.editMode = !this.editMode
    },

    goBack: function(){
      this.$router.push('/recipes')
    },

    closeDialog: function() {
      this.deleteOpen = false
    },

    openDialog: function() {
      this.deleteOpen = true
    }
  },
  computed: {
    isAddIngredientBlank () {
      return this.newIngredient === ''
    } 
  }
};
</script>
