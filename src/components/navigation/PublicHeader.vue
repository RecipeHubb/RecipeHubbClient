<template lang="">
  <div class="sticky z-50 inset-x-0 top-0 h-16 bg-white h-full">
    <div class="bg-hue h-full font-serif flex-1">
      <!-- NAVBAR -->
      <div
        class="lg:px-6 mt-2 px-4 border-b-2 border-gray-600 flex justify-between"
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
                <li
                  class="border-transparent border-b-2 hover:border-purple-600"
                >
                  <router-link to="/">Home</router-link>
                </li>
                <li
                  class="border-transparent border-b-2 hover:border-purple-600"
                >
                  <router-link to="/about">About</router-link>
                </li>
                <li
                  v-show="!loggedIn"
                  class="border-transparent border-b-2 hover:border-purple-600"
                >
                  <router-link to="/register">Sign Up</router-link>
                </li>
                <li
                  v-show="loggedIn"
                  class="border-transparent border-b-2 hover:border-purple-600"
                >
                  <router-link to="/profile">Profile</router-link>
                </li>
                <li
                  v-if="!loggedIn"
                  class="border-transparent border-b-2 hover:border-purple-600"
                >
                  <router-link to="/login">Sign In</router-link>
                </li>
                <li
                  v-else
                  v-on:click="logOut"
                  class="border-transparent border-b-2 hover:border-purple-600"
                >
                  Sign Out
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div class="inline lg:hidden mt-1 ml-2">
          <label v-on:click="handleMenu">
            <feather-activity></feather-activity>
          </label>
        </div>
        <input type="checkbox" id="menu-toggle" class="mt-4 hidden" />

        <div class="lg:inline lg:float-right hidden">
          <button
            class="px-2 border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
          >
            <router-link to="/">Home</router-link>
          </button>
          <button
            class="px-2 border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
          >
            <router-link to="/about">About</router-link>
          </button>
          <button
            v-show="!loggedIn"
            class="px-2 border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
          >
            <router-link to="/register">Sign Up</router-link>
          </button>
          <button
            v-show="loggedIn"
            class="px-2 border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
          >
            <router-link to="/profile">Profile</router-link>
          </button>
          <button
            v-if="!loggedIn"
            class="px-2 border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
          >
            <router-link to="/login">Sign In</router-link>
          </button>
          <button
            v-else
            v-on:click="logOut"
            class="px-2 border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PublicHeader",
  data() {
    return {
      isOpen: false,
      loggedIn: false,
    };
  },
  mounted() {
    console.log(this.loggedIn)
    //get token before everything is mounted
    const token = this.getToken()

//check token to verify if they are logged in
    if (token && token !== null) {
      this.loggedIn = true;
    }
  },
  methods: {
    handleMenu() {
      this.isOpen = !this.isOpen;
    },
    logOut() {
      console.log('here')
      localStorage.clear();
      this.clearToken();
      
      // pushes to home page and refreshes the page for new nav
      this.$router.push('/')
      this.$router.go(0)
    },
    getToken() {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];

        return token
    },
    clearToken() {
      document.cookie ="token=;"
    }
  },
};
</script>
<style lang=""></style>
