
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
                    label="Name*"
                    required
                  ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Name*"
                  hint="Name of this new recipe"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
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
    createRecipe() {
      alert('create')
      //close popup
      this.$emit('close-dialog')
    },
  },
  mounted() {
  },
};
</script>
