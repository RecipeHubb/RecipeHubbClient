<template>
  <!-- We can update font -->
  <!-- Section -->
  <div class="flex justify-center pt-10 h-screen">
    <div class="m-6 lg:m-12 text-center center-items lg:w-1/2">
      <h1 class="text-4xl text-gray-700">
        Welcome to <span class="text-purple-500">RecipeHubb </span>
      </h1>
      <p class="py-2 text-xl pt-10">
        Welcome to RecipeHubb, Your hub of personal and shared recipes that you
        can use on the go! 
      </p>
      <p class="py-2 text-xl pt-10">
        Get Started <router-link to="/register"><span class="text-2xl text-purple-500">Here</span>!</router-link>
      </p>
      <p class="py-2 text-xl">
        Already a member? <router-link to="/login"><span class="text-2xl text-purple-500">Login</span></router-link>
      </p>
    </div>
    <!-- <div class="w-1/2 relative"><img src="https://images.unsplash.com/photo-1564865878688-9a244444042a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"</div> -->
  </div>
</template>
<script>
import image from '../../assets/recipehubb_long.png'
export default {
  name: "Home",
  data() {
    return {
      image
    }
  },
};
</script>
<style lang=""></style>
