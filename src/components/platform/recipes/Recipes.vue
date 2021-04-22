<template lang="">
  <div >
    <h1 class="text-5xl pt-10 pb-10 text-purple-500">
      My Recipes
    </h1>
      <!-- List of Recipes -->
    <div>
      <v-row justify="center">
        <v-col
          cols="12"
          lg="4"
          sm="6"
          xs="10"
        >
          <div 
            v-for="recipe in recipes" :key="recipe.id"
            class="text-black-100 pt-15"
          >
            <h1 class="text-purple-900">{{ recipe.name }}</h1>
          </div>
        </v-col>
      </v-row> 
    </div>
        
  </div>
</template>
<script>
export default {
  name: "Recipes",
  data() {
    return {
      recipes: [
        {
          id: 1,
          name: 'recipe 1'
        },
        {
          id: 2,
          name: 'recipe 2'
        },
      ],
    }
  },
  mounted() {
    // get list of recipes
    let user = JSON.parse(localStorage.getItem("user"));
    this.user = user;
  },
};
</script>