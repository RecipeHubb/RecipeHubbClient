
<template lang="">
    <div>
      <v-dialog
        v-model="open"
        
        transition="dialog-bottom-transition"
        width="1000"
        height="1000"
        class="pt-20"
        @click:outside="closeModal"
      >
      <v-card>
        <v-card-title>
          <button  @click="closeModal" title="exit create recipe">
            <i class="fas fa-chevron-left text-2xl text-purple-600 mr-2 ml-1 text-center"></i>
          </button>
          <span class="headline text-2xl text-purple-600 pl-2">New Recipe</span>
        </v-card-title>
        <v-card-text>

          <v-container>
            <!-- 1st row -->
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="8"
              >
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                      <v-text-field
                        outlined
                        label="Name*"
                        v-model="name"
                      ></v-text-field>
                  </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      xs='10'
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
              
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <div>
                        <div>
                          <img 
                            :src="previewImg" 
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

                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-textarea
                        outlined
                        name="input-7-4"
                        label="Instructions"
                        placeholder="Enter additonal cooking instructions here..."
                        v-model="instructions"
                        :value="instructions"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-col>
              <v-col
                cols="12"
                sm="4"
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

            </v-row>
            <!-- 2nd row -->
            <v-row justify="center">
              <v-col
                cols="12"
                lg='4'
                sm='6'
                xs='10'
              >
                <v-slider
                  v-model="soEasyRating"
                  class="align-center"
                  max="5"
                  min="0"
                  label="So-Easy Meter"
                  hide-details
                  title="Rating of 1-5 on how easy this recipe is to make (tools needed, time to prepare, etc)"
                >
                  <template v-slot:append>
                    <span class="pt-1 text-purple-600">{{soEasyRating}}</span>
                  </template>
                </v-slider>
              </v-col>
              <v-col
                cols="12"
                lg='4'
                sm='6'
                xs='10'
              >
                <v-slider
                  v-model="numPeopleServed"
                  class="align-center"
                  max="20"
                  min="0"
                  label="Serves up to: "
                  hide-details
                >
                  <template v-slot:append>
                    <span class="pt-1 text-purple-600 ">{{numPeopleServed}}</span>
                  </template>
                </v-slider>
              </v-col>
              <v-col
                cols="12"
                lg='2'
                sm='6'
                xs='10'
              >
                <v-switch
                  v-model="isPublic"
                  color="purple"
                  :label="`Public ${isPublic}`"
                ></v-switch>
              </v-col>
              <v-col
                cols="12"
                lg='2'
                sm='6'
                xs='10'
              >
                <v-switch
                  v-model="favorited"
                  color="purple"
                  :label="`Favorite ${favorited}`"
                ></v-switch>
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
            class="bg-purple-400 pr-5"
            @click="closeModal"
            title="cancel and close this popup"
          >
            Close
          </v-btn>
          
          <v-btn
            color="blue darken-1"
            text
            class="bg-purple-400 ml-3"
            @click="createRecipe"
            title="Save and create this recipe"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
  </div>
</template>

<script>
  import RecipeService from '../../../service/RecipeService'
  export default {
  name: "CreateRecipeDialog",
  props: ['open'],
  data() {
    return {
      name: null,
      image: null,
      previewImg: null,
      instructions: null,
      tags: [],
      numPeopleServed: 0,
      soEasyRating: 0,
      ingredients: [],
      newIngredient: '',
      isPublic: false,
      favorited: false
    };
  },
  methods: {
    createRecipe: async function() {
      if (!this.name){
        this.$vToastify.error("Please fill out required fields before submitting")
        return
      }
      const res = await RecipeService.createRecipe({
        name: this.name,
        ingredients: this.ingredients,
        instructions: this.instructions,
        recipeImage: this.image,
        servingSize: this.numPeopleServed,
        soEasyRating: this.soEasyRating,
        tags: this.tags,
        favorited: this.favorited,
        public: this.isPublic
      })
      console.log(res)
      this.$emit('close-dialog')
    },
    previewImage: function(event) {
        var input = event.target
        if (input.files && input.files[0]) {
            var reader = new FileReader()
            reader.onload = (e) => {
                this.previewImg = e.target.result;
                this.image = e.target.result
            }
            reader.readAsDataURL(input.files[0]);
        }
    },
    closeModal: function(){ // clear state and close dialod
      this.name =null,
      this.image = null,
      this.previewImg = null,
      this.instructions = null,
      this.tags =[],
      this.numPeopleServed = 0,
      this.soEasyRating = 0,
      this.ingredients = [],
      this.newIngredient = '',
      this.isPublic = false,
      this.favorited = false
      this.$emit('close-dialog')
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
}
</script>
