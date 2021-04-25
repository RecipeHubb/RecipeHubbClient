<template lang="">
    <div>
      <v-row justify="center">
        <h1 class="text-5xl pt-10 pb-10 text-purple-500">
          {{name}}
          <v-btn @click="editMode = !editMode" class="bg-purple-500 text-black">switch</v-btn>
        </h1>
      </v-row>
      <v-container v-if="editMode" fluid>
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
            class="bg-purple-400" 
            @click="updateRecipe"
          >
            Save
          </v-btn>

        </v-row>
      </v-container>
      <!-- - - - - - - - - Preview Mode - - - - - - - - - - - - - - -->
      <v-container v-else fluid>
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
    </div>
</template>

<script>
import AuthService from '../../../service/AuthService'
export default {
  name: "Recipe",
  data() {
    return {
      recipe: {},
      editMode: false,

      // name: null,
      // recipeImage: null,
      // previewImg: null,
      // instructions: null,
      // tags: [],
      // servingSize: 0,
      // soEasyRating: 0,
      // ingredients: [],
      // newIngredient: '',
      // isPublic: false,
      // favorited: false

      //test data
      name: "Chicken Hearts",
      recipeImage: null,
      previewImg: null,
      instructions: "You have to make these the right way, if you dont, they wont taste good.",
      tags: ['Chicken', 'Dinner', 'Savory'],
      servingSize: 6,
      soEasyRating: 3,
      ingredients: ['2 lb chicken heart', '1 tbsp seasoning'],
      newIngredient: '',
      isPublic: true,
      favorited: true
    };
  },
  mounted() {
    if (!AuthService.getToken()) {
      AuthService.logOut()
    } 
    //get recipe data from API/DB from params
    console.log('Mounted Recipe.vue')
    // console.log(this.$router.params.id)
  },
  methods: {
    updateRecipe: async function() {
      this.$vToastify.success("Updated Recipe Successfully")
    },

    previewImage: function(event) {
      const input = event.target
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
    }
  },
  computed: {

    isAddIngredientBlank () {
      return this.newIngredient === ''
    } 
  }
};
</script>
