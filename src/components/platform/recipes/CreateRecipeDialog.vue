
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
          <span class="headline">New Recipe</span>
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
                <v-text-field
                outlined
                  label="Ingredients"
                  hint="add ingredients"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="4"
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
              
              <!-- <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col> -->
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['1', '2', '3', '4', '5']"
                  label="Type"
                  required
                  outlined
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['American', 'Mexican', 'Thai', 'Indian', 'Chinese', 'Seafood', 'Meat', 'Vegetables', 'Fruit']"
                  label="Category"
                  multiple
                  outlined
                ></v-autocomplete>
              </v-col>
              <v-row justify="center">
                <v-col
                  cols="12"
                  lg='4'
                  sm='6'
                  xs='10'
                >
                  <v-slider
                    v-model="soEasyMeter"
                    class="align-center"
                    max="5"
                    min="0"
                    hide-details
                  >
                  {{soEasyMeter}}
                    <!-- <template v-slot:append>
                      <v-text-field
                        v-model="soEasyMeter"
                        class="mt-0 pt-0"
                        hide-details
                        single-line
                        type="number"
                        style="width: 30px"
                      ></v-text-field>
                    </template> -->
                  </v-slider>
                </v-col>
                <v-col
                  cols="12"
                  lg='4'
                  sm='6'
                  xs='10'
                >

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
          &nbsp;
          <v-btn
            color="blue darken-1"
            text
            class="bg-purple-400"
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
  export default {
  name: "CreateRecipeDialog",
  props: ['open'],
  data() {
    return {
      name: '',
      image: '',
      instructions: '',
      category: 0,
      type: 0,
      numPeopleServed: 0,
      soEasyMeter: 0,
      ingredients: [],
      isPublic: false
    };
  },
  methods: {
    createRecipe: async function() {
      console.log(this.name)
      const res = await RecipeService.createRecipe({
        name: this.name,
        instructions: this.instructions,
      })
      console.log(res)
      //close popup
      this.$emit('close-dialog')
    },
  },
  mounted() {
  },
};
</script>
