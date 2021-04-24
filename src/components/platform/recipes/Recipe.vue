<template lang="">
    <div>
      <h1 class="text-5xl pt-10 pb-10 text-purple-500">
        This is a single Recipe Page
        <button @click="editMode = !editMode" class="bg-purple-500 text-black">switch</button>
      </h1>
      <v-container v-if="!editMode" fluid>
        <v-row justify="center" align="center">
          <v-col
            cols='12'
            lg='6'
            sm='6'
            xs='10'
          >
          Just Display
            Image
           Tags
            So easy meter
           Serves
          Public
           Favorited
          </v-col>
          <v-col
            cols='12'
            lg='4'
            sm='6'
            xs='10'
          >
            Ingredients
           Instructions
          </v-col>
          <!-- <v-col
            cols='12'
            lg='4'
            sm='6'
            xs='10'
          >
           Ingredients
           Instructions
          </v-col> -->
        </v-row>
      </v-container>
      <v-container v-else fluid>
        <v-row justify="center" align="center">
          <v-col
            cols='12'
            lg='6'
            sm='6'
            xs='10'
          >
          Form fields
            Image
           Tags
            So easy meter
           Serves
          Public
           Favorited
          </v-col>
          <v-col
            cols='12'
            lg='4'
            sm='6'
            xs='10'
          >
           Instructions
           Ingredients
          </v-col>
          <!-- <v-col
            cols='12'
            lg='4'
            sm='6'
            xs='10'
          >
           Ingredients
           Instructions
          </v-col> -->
        </v-row>
      </v-container>
    </div>
</template>

<script>
export default {
  name: "Recipe",
  data() {
    return {
      recipe: {},
      editMode: false,
    };
  },
  mounted() {
    //get recipe data from API/DB from params
    console.log('Mounted Recipe.vue')
  },
};
</script>
