
<template lang="">
    <div>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
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
                  label="Legal first name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
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
                  label="Email*"
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
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
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
            @click="open = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="open = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    <!-- <div class=" p-16 flex justify-center "> -->
    <!-- <div class="shadow-lg rounded-lg bg-indigo-50 w-3/4">
      <div class=" flex justify-center">
        <div class="relative w-1/2 hidden lg:block ">
          <img
            class="object-fill h-full w-full rounded-l-lg inset-0 m-0 p-0"
            src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
          />
        </div>
        <div class="lg:w-1/2 text-center">
          <h1>Create Recipe</h1>
          <div class="my-16">
            <h1 class="text-2xl py-2">Sign in</h1>
            <div>
              <input
                type="text"
                placeholder="Email"
                v-model="email"
                class="border-2  rounded-md my-2 p-2 outline-none w-7/12"
              />
            </div>
            <div>
              <input
                type="password"
                v-model="password"
                placeholder="Password"
                class="border-2  rounded-md my-2 p-2 w-7/12  outline-none"
              />
            </div>
            <div
              class="bg-white border-2 rounded-md cursor-pointer  p-2 my-6 px-8  text-sm inline-block"
              v-on:click="signInUser"
            >
              Create Recipe
            </div>
          </div>
        </div>
      </div>
    </div> -->
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

    };
  },
  mounted() {
      // not sure what goes here yet
  },
};
</script>
