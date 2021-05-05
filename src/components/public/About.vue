<template lang="">
   <div class="lg:flex lg:justify-center pt-10">
      <div class="lg:m-6 lg:m-12 text-center">
        <h1 class="text-4xl text-gray-700">How <span class="text-purple-500">RecipeHubb </span> Works</h1>
        <div class="lg:grid lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-2 lg:gap-1 m-6 lg:m-12">
          <div class="flex justify-center items-center my-6 ">
            <h1 class="text-xl lg:text-xl">RcipeHubb, in its simplicty, is a way to store and save all the recipes you have!
              It is a personal platform where you can add recipes, and include necessary information about them, including 
              things like ingredients, cooking instructions, serving size, and much more. </h1>
          </div>
<<<<<<< HEAD
          <div class="flex justify-center items-center my-6  "><feather-droplet class="lg:w-24 w-12 lg:h-24 h-12 w-12 lg:block hidden"></feather-droplet></div>
          <div class="flex justify-center items-center my-6 "><feather-camera class="lg:w-24 lg:h-24 w-12 h-12 lg:block hidden"></feather-camera></div>
          <div><h1 class="text-xl">Another cool feature is that this platform is also public! Users have the
=======
          <div class="flex justify-center items-center my-6  ">          
            <v-img
              width="300px"
              height="300px"
              alt="My Recipes Example"
              :src="publicImg"
            ></v-img>
          </div>
          <div class="flex justify-center items-center my-6 ">
            <v-img
              width="300px"
              height="300px"
              alt="Public Recipes Example"
              :src="privateImg"
            ></v-img>
          </div>
          <div class="flex justify-center items-center my-6 ">
            <h1 class="text-xl">Another cool feature is that this platform is also public! Users have the
>>>>>>> f187c17 (Added a few images to make public site pop)
              ability to view all recipes by other users of the platform that they mark as a publically accessible recipe. You 
              are then able to view these recipes and comment on them and drop a rating for the original owner. It is platform
              that boasts the easyness of storing your own recipes for quick retrieval, as well as looking for new ideas to spice
              up your recipe game!
            </h1>
          </div>
        </div>
        <!-- <div class="w-1/2 relative"><img src="https://images.unsplash.com/photo-1564865878688-9a244444042a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"</div> -->
      </div>
    </div>
</template>
<script>
import privateImg from '../../assets/privateExample.png'
import publicImg from '../../assets/publicExample.png'

export default {
    name: 'About',
    data() {
      return {
        privateImg,
        publicImg
      }
    },
}
</script>
<style lang="">
    
</style>