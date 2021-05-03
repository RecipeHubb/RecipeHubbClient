
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
                md="6"
              >
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                  <!-- <div class="ml-2 text-purple-400 text-md">Recipe Name</div> -->
                      <v-text-field
                        outlined
                        placeholder="Chicken Pot Pie"
                        label="Name*"
                        v-model="name"
                        color="deep-purple accent-2"
                        type="text"
                        dense
                      ></v-text-field>
                  </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      xs='10'
                    >
                    <!-- <div class="ml-2 text-purple-400 text-md">Tags</div> -->
                      <v-autocomplete
                        :items="['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack','American',
                        'Mexican', 'Italian', 'Thai', 'Indian', 'Chinese', 'Seafood', 'Chicken',
                        'Beef', 'Pork', 'Vegetables', 'Fruit','Sweet', 'Spicy', 'Savory', 'Other'
                        ]"
                        v-model="tags"
                        placeholder="Dinner"
                        label="Tags"
                        multiple
                        outlined
                        color="deep-purple accent-2"
                        dense
                        chips
                        small-chips
                      ></v-autocomplete>
                    </v-col>
              
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <div>
                        <!-- <div class="ml-2 text-purple-400 text-md">Add Image</div> -->
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
                    <!-- <div class="ml-2 text-purple-400 text-md">Additional Instructions</div> -->
                      <v-textarea
                        outlined
                        name="input-7-4"
                        label="Instructions"
                        placeholder="Enter additonal recipe prep instructions here..."
                        height="200px"
                        v-model="instructions"
                        color="deep-purple accent-2"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <div class="ml-4 text-purple-400 text-lg font-medium pb-4">Add/Remove Ingredients</div>
                <div class="pb-4">
                  <v-row>
                    <v-col
                      cols="12"
                      sm='3'
                      class="ma-0 pa-0"
                    >
                      <v-select
                      dense
                        :items="['1/4','1/2','3/4', '1', '1 1/4', '1 1/2', '1 3/4', '2', '3', '4']"
                        outlined
                        placeholder="3"
                        color="deep-purple accent-2"
                        v-model="newIngredientAmount"
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm='3'
                      class="ma-0 pa-0"
                    >
                      <v-select
                      dense
                        :items="['tsp', 'tbsp', 'oz', 'cup', 'pint', 'quart', 'gallon', 'lb']"
                        placeholder="oz"
                        outlined
                        color="deep-purple accent-2"
                        v-model="newIngredientMeasurement"
                      ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm='5'
                      class="ma-0 pa-0"
                    >
                      <v-text-field
                        outlined
                        dense
                        placeholder="Chicken breast"
                        v-model="newIngredientName"
                        required
                        color="deep-purple accent-2"
                        @keydown.enter="addIngredient"
                        class="ma-0 pa-0"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm='1'
                      align-self="center"
                    >
                      <div 
                        class="text-green-600 text-5xl cursor-pointer -mt-4 pb-5" 
                        :disabled="isAddIngredientBlank" 
                        title="Add this ingredient" 
                        @click="addIngredient"
                      >
                      +
                      </div>
                    </v-col>
                  </v-row>
                </div>
              <!-- Ingredients List -->
                <div class="overflow-y-auto h-60 pt-2 pl-3">
                  <span v-for="(ingredient, index) of ingredients" :key="index">
                    <v-row>
                      <v-col
                        cols="12"
                        sm='10'
                        class="ma-0 pa-0"
                      >
                      <div class="text-lg">{{ingredient.value}}</div>
                        <!-- <v-text-field
                          outlined
                          dense
                          :value="ingredient.value"
                        ></v-text-field> -->
                      </v-col>
                      <v-col
                        cols="12"
                        sm='1'
                        class="ma-0 pa-0"
                      >
                        <span class="text-red-600 text-2xl cursor-pointer" title="remove this ingredient" @click="deleteIngredient(index)">X</span>
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
                  color="deep-purple accent-2"
                  hide-details
                  title="Rating of 1-5 on how easy this recipe is to make (tools needed, time to prepare, etc)"
                >
                  <template v-slot:append>
                    <span class="pt-1 text-purple-600 text-xl">{{soEasyRating}}</span>
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
                  color="deep-purple accent-2"
                  hide-details
                >
                  <template v-slot:append>
                    <span class="pt-1 text-purple-600 text-xl">{{numPeopleServed}}</span>
                  </template>
                </v-slider>
              </v-col>
              <v-col
                cols="12"
                lg='2'
                sm='6'
                xs='10'
              >
                <v-checkbox
                  v-model="isPublic"
                  :label="`Public`"
                  color="deep-purple accent-2"
                ></v-checkbox>
              </v-col>
              <v-col
                cols="12"
                lg='2'
                sm='6'
                xs='10'
              >
                <v-checkbox
                  v-model="favorited"
                  color="deep-purple accent-2"
                  :label="`Favorite`"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black darken-1"
            text
            class="bg-red-500 text-black-900"
            @click="closeModal"
            title="cancel and close this popup"
          >
            Cancel
          </v-btn>
          
          <v-btn
            color="black darken-1"
            text
            class="bg-green-500 ml-3"
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
      recipeImage: null,
      previewImg: null,
      instructions: null,
      tags: [],
      numPeopleServed: 0,
      soEasyRating: 0,
      ingredients: [],
      newIngredientAmount: '',
      newIngredientMeasurement: '',
      newIngredientName: '',
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
        recipeImage: JSON.stringify(this.recipeImage),
        servingSize: this.numPeopleServed,
        soEasyRating: this.soEasyRating,
        tags: this.tags,
        favorited: this.favorited,
        public: this.isPublic
      })

      // localstorage
      if (res.status === 200){
        this.$vToastify.success(`${this.name} sucessfully created!`)
      }
      this.$router.push('/recipes')
      // this.$router.go()
      this.$emit('close-dialog')
      // this.$emit('edit-save', newRecipe)
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
        this.ingredients.push({
          name: this.newIngredientName,
          amount: this.newIngredientAmount,
          measurement: this.newIngredientMeasurement,
          value: `${this.newIngredientAmount} ${this.newIngredientMeasurement} ${this.newIngredientName}`
        })
        this.newIngredientName = ''
        this.newIngredientAmount = ''
        this.newIngredientMeasurement = ''
      }
      else{
        this.$vToastify.warning("all ingredient fields needed before adding")
        return
      }
    },

    deleteIngredient: function(index){
      this.ingredients.splice(index, 1)
    }
  },
  computed: {
    isAddIngredientBlank () {
      return this.newIngredientName === '' || this.newIngredientAmount === '' || this.newIngredientMeasurement === ''
    } 
  }
}
</script>
<style scoped>
/* .v-text-field--outlined >>> fieldset {
  border-color: rgba(172, 90, 197, 0.986);
} */

</style>
