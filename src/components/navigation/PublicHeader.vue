<template lang="">
  <div>
    <div class="bg-hue h-full font-serif flex-1">
      <!-- NAVBAR -->
      <div
        class="lg:px-6 py-2 my-2 px-4 border-b-2 border-gray-600 flex justify-between"
      >
        <!-- <i class="fa fa-fire fa-lg"></i> -->
        <div>
          <img
            width="50px"
            height="50px"
            alt="Vue logo"
            src="https://recipehubb.s3.us-east-2.amazonaws.com/assets/recipehubb_main.png"
          />

          <!-- show this section if theey click on the hamburger-->
          <div class="pt-3" v-show="isOpen">
            <nav class="cursor-pointer">
              <ul>
                <li class="border-transparent border-b-2 hover:border-purple-600">
                 Home 
                </li>
                <li  class="border-transparent border-b-2 hover:border-purple-600">
                  About
                </li>
                <li class="border-transparent border-b-2 hover:border-purple-600">
                  Sign in
                </li>
                <li class="border-transparent border-b-2 hover:border-purple-600">
                  Sign up
                </li>
              </ul>
            </nav>
          </div>
          
        </div>
        <div class="inline lg:hidden mt-1 ml-2">
          <label v-on:click="handleMenu"> <feather-activity></feather-activity> </label>
        </div>
        <input type="checkbox" id="menu-toggle" class="mt-4 hidden" />

        <div class="lg:inline lg:float-right hidden">
          <button
            class="px-2 border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
          >
          <a href="/"> Home </a>
          </button>
          <button
            class="px-2 border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
          >
           <a href="/about"> About </a>
          </button>
          <button
            class="px-2 border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
          >
           <a href="/login"> Sign in </a>
          </button>
          <button
            class="px-2 border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
          >
           <a href="/register"> Sign up </a>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: 'PublicHeader',
    data()  {
    return {
      isOpen: false
        }
    },
    methods: {
    handleMenu () {
      this.isOpen = !this.isOpen
    },
        }
}
</script>
<style lang=""></style>
