<template lang="">
  <div class="sticky z-50 inset-x-0 top-0 h-16 bg-white h-full">
    <div class="bg-hue h-full font-serif flex-1">
      <!-- NAVBAR -->
      <div
        class="lg:px-6 mt-2 px-4 border-b-2 border-gray-600 flex justify-between bg-white"
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
                  <router-link to="/createrecipe">Create</router-link>
                </li>
                <li
                  v-show="loggedIn"
                  class="border-transparent border-b-2 hover:border-purple-600"
                >
                  <router-link to="/public/recipes">Public</router-link>
                </li>
                <li
                  v-show="loggedIn"
                  class="border-transparent border-b-2 hover:border-purple-600"
                >
                  <router-link to="/recipes">Recipes</router-link>
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
                  @click="openLogoutDialog"
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

        <div class="lg:inline lg:float-right hidden mt-2">
          <button
            v-show="!loggedIn"
            class="px-2 border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
          >
            <router-link to="/"><span class="text-black hover:text-purple-500">Home</span></router-link>
          </button>
          <button
            v-show="!loggedIn"
            class="px-2 border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
          >
            <router-link to="/about"><span class="text-black hover:text-purple-500">About</span></router-link>
          </button>
          <button
            v-show="!loggedIn"
            class="px-2 border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
          >
            <router-link to="/register"><span class="text-black hover:text-purple-500">Sign up</span></router-link>
          </button>
          <button
            v-show="loggedIn"
            @click="open = true"
            title="Create a new recipe here"
            class="px-2 text-black border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
          >
            <span class="text-black hover:text-purple-500">Create</span>
          </button>
          <button
            v-show="loggedIn"
            class="px-2 text-black border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
            title="View all public recipes here"
          >
            <router-link to="/public/recipes"><span class="text-black hover:text-purple-500">Public</span></router-link>
          </button>
          <button
            v-show="loggedIn"
            class="px-2 text-black border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
            title="View your personal list of recipes here"
          >
            <router-link to="/recipes"><span class="text-black hover:text-purple-500">Recipes</span></router-link>
          </button>
          <button
            v-show="loggedIn"
            class="px-2 text-black border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
          >
            <router-link to="/profile"><span class="text-black hover:text-purple-500">Profile</span></router-link>
          </button>
          <button
            v-if="!loggedIn"
            class="px-2 border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
          >
            <router-link to="/login"><span class="text-black hover:text-purple-500">Sign In</span></router-link>
          </button>
          <button
            v-else
            @click="openLogoutDialog"
            class="px-2 border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
          >
            <span class="text-black hover:text-purple-500">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
    <div data-app>
      <CreateRecipeDialog @close-dialog="closeDialog" :open="open" />
    </div>
    <div data-app>
      <LogoutDialog @close-dialog="closeLogoutDialog" @log-out="logout" :open="logoutOpen" />
    </div>
  </div>
</template>
<script>
import CreateRecipeDialog from '../platform/recipes/CreateRecipeDialog'
import LogoutDialog from '../utility/LogoutDialog'
import AuthService from '../../service/AuthService'
export default {
  name: "PublicHeader",
  components: {
    CreateRecipeDialog,
    LogoutDialog
  },
  data() {
    return {
      isOpen: false,
      loggedIn: false,
      open: false,
      logoutOpen: false,
    };
  },
  mounted() {
    //get token before everything is mounted
    const token = AuthService.getToken()
    //check token to verify if they are logged in
    if (token && token !== null) {
      this.loggedIn = true;
    }
  },
  methods: {
    handleMenu() {
      this.isOpen = !this.isOpen;
    },
    logout() {
      localStorage.clear();
      AuthService.clearToken();
      this.logoutOpen = false;
      
      // pushes to home page and refreshes the page for new nav
      this.$router.push('/')
      this.$router.go(0)
    },

    // Create Recipe Dialog
    closeDialog() {
      this.open = false;
    },
    openLogoutDialog() {
      this.logoutOpen = true
    },
    closeLogoutDialog() {
      this.logoutOpen = false;
    },
  },
};
</script>
