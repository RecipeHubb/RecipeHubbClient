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
                  <router-link to="/createrecipe">Create</router-link>
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
            v-show="!loggedIn"
            class="px-2 border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
          >
            <router-link to="/">Home</router-link>
          </button>
          <button
            v-show="!loggedIn"
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
            @click="open = true"
            class="px-2 border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
          >
            Create
          </button>
          <button
            v-show="loggedIn"
            class="px-2 border-transparent border-b-2 hover:border-purple-600 focus:outline-none outline-none"
          >
            <router-link to="/recipes">Recipes</router-link>
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
    <div data-app>
      <v-dialog
        v-model="open"
        fullscreen
        transition="dialog-bottom-transition"
        width="400px"
        class="pt-20"
      >
      <v-row justify="center">
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
              
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Category"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Type"
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
            @click="open = false"
          >
            Close
          </v-btn>
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
      </v-row>
        <!-- <CreateRecipeDialog :open="open"/> -->
      </v-dialog>
    </div>
  </div>
</template>
<script>
// import CreateRecipeDialog from '../platform/recipes/CreateRecipeDialog'
export default {
  name: "PublicHeader",
  components: {
    // CreateRecipeDialog
  },
  data() {
    return {
      isOpen: false,
      loggedIn: false,
      open: false,
    };
  },
  mounted() {
    //get token before everything is mounted
    const token = this.getToken()
    //check token to verify if they are logged in
    if (token && token !== null) {
      this.loggedIn = true;
    }
  },
  methods: {
    createRecipe() {
      alert('create')
      this.open = false
    },
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
