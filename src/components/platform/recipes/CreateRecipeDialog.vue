
<template lang="">
    <div>
      <v-dialog
        v-model="open"
        
        transition="dialog-bottom-transition"
        width="900"
        height="900"
        class="pt-20"
      >
      <v-card>
        <v-card-title>
          <v-btn  @click="$emit('close-dialog')">

          <font-awesome-icon :icon="appIcon" class="text-2xl text-purple-600"/>
          </v-btn>
          <span class="headline text-2xl text-purple-600 pl-2">New Recipe</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                  <v-text-field
                    outlined
                    label="Name*"
                    v-model="name"
                    :value="name"
                    required
                  ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-select
                  :items="['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack']"
                  v-model="type"
                  label="Type"
                  required
                  outlined
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                md="4"
              >
                <v-autocomplete
                  :items="['American', 'Mexican', 'Italian', 'Thai', 'Indian', 'Chinese', 'Seafood', 'Meat', 'Vegetables', 'Fruit']"
                  v-model="categories"
                  label="Categories"
                  multiple
                  outlined
                ></v-autocomplete>

              </v-col>

              <v-col
                cols="12"
                sm="4"
              >
                Image Upload
              </v-col>

              <v-col
                cols="12"
                sm="4"
              >
                <v-textarea
                  outlined
                  name="input-7-4"
                  label="Ingredients"
                  placeholder="2 chicken breasts, 1/2 cup water, etc."
                  v-model="ingredients"
                  :value="ingredients"
                ></v-textarea>
              </v-col>

              <v-col
                cols="12"
                sm="4"
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
                      <span class="pt-1 text-purple-600">{{numPeopleServed}}</span>
                    </template>
                  </v-slider>
                </v-col>
                <v-col
                  cols="12"
                  lg='4'
                  sm='6'
                  xs='10'
                >
                  <v-switch
                    v-model="isPublic"
                    color="purple"
                    :label="`Public ${isPublic}`"
                  ></v-switch>
                </v-col>
              </v-row>

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
            @click="$emit('close-dialog')"
          >
            Close
          </v-btn>
          
          <v-btn
            color="blue darken-1"
            text
            class="bg-purple-400 ml-3"
            @click="createRecipe"
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
  import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
  export default {
  name: "CreateRecipeDialog",
  props: ['open'],
  data() {
    return {
      name: '',
      image: '',
      instructions: '',
      categories: [],
      type: '',
      numPeopleServed: 0,
      soEasyRating: 0,
      ingredients: '',
      isPublic: false
    };
  },
  methods: {
    createRecipe: async function() {
      const res = await RecipeService.createRecipe({
        name: this.name,
        recipeImage: this.image,
        instructions: this.instructions,
        ingredients: this.ingredients,
        type: this.type,
        categories: this.categories,
        servingSize: this.numPeopleServed,
        soEasyRating: this.soEasyRating,
        isPublic: this.isPublic,
      })
      console.log(res)
      // close popup
      this.$emit('close-dialog')
    },
  },
  computed: {
    appIcon () {
      return faChevronLeft
    }
  }
}
</script>
