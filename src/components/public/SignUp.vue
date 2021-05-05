<template lang="">
  <div class=" flex justify-center">
    <div class="shadow-lg rounded-lg bg-indigo-50 my-10 lg:w-2/4 w-3/4 ">
      <div class="font-mono flex justify-center">
        <div class="text-center lg:m-16 lg:m-8 lg:w-3/4">
          <h1 class="text-sm lg:px-4 py-4 text-gray-700">
            Have an account? <span class="font-bold"><router-link to="/login">Sign in</router-link> </span>
          </h1>
          <h1 class="text-2xl py-2 ">Sign Up</h1>
          <div>
            <input
              type="text"
              v-model="username"
              placeholder="Username"
              class="border-2 bg-white rounded-md my-2 p-2 outline-none w-3/8 lg:w-9/12"
            />
          </div>
          <div>
            <input
              type="text"
              v-model="firstname"
              placeholder="First Name"
              class="border-2 bg-white rounded-md my-2 p-2 outline-none w-3/8 lg:w-9/12"
            />
          </div>
          <div>
            <input
              type="text"
              v-model="lastname"
              placeholder="Last Name"
              class="border-2 bg-white rounded-md my-2 p-2 outline-none w-3/8 lg:w-9/12"
            />
          </div>
          <div>
            <input
              type="text"
              v-model="city"
              placeholder="city"
              class="border-2 bg-white rounded-md my-2 p-2 outline-none w-3/8 lg:w-9/12"
            />
          </div>
           <div>
            <input
              type="text"
              v-model="email"
              placeholder="Email"
              class="border-2 bg-white rounded-md my-2 p-2 outline-none w-3/8 lg:w-9/12"
            />
          </div>
            <div>
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              class="border-2 bg-white rounded-md my-2 p-2 lg:w-9/12 w-3/8 outline-none"
            />
          </div>
          <div>
            <!-- <input
              type="text"
              v-model="bio"
              placeholder="bio"
              class="border-2 bg-white rounded-md my-6 p-2 outline-none lg:w-9/12"
            /> -->
            <textarea placeholder="bio" v-model="bio" class="border-2 bg-white rounded-md my-2 p-2 lg:w-9/12 w-3/8 outline-none lg:inline hidden" rows="5" cols="80" id="TITLE">
            </textarea>
            <textarea placeholder="bio" v-model="bio" class="border-2 bg-white lg:hidden block rounded-md my-6 p-2 outline-none " rows="5" cols="20" id="TITLE">
            </textarea>
          </div>
          <div
            class="bg-white border-2 rounded-md cursor-pointer p-2 my-6 px-8 text-sm inline-block"
            v-on:click="registerUser"
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "../../service/AuthService";
export default {
  name: "SignUp",
  data: function() {
    return {
      showModal: true,
      firstname: null,
      lastname: null,
      city: null,
      username: null,
      email: null,
      password: null,
      bio: null
    };
  },
  methods: {
    registerUser: async function() {

         // validation for empty text inputs
    if(!this.username && !this.email && !this.password && !this.firstname && !this.lastname && this.city) {
        this.$vToastify.error("Please enter Username, Name, City, Email and Password.");
       return
    }
      // make sure it is always lowercase
      const res = await AuthService.register({
        username: this.username.toLowerCase(),
        email: this.email.toLowerCase(),
        password: this.password,
        bio: this.bio,
        city: this.city,
        firstName: this.firstname,
        lastName: this.lastname
      });

    //push after register to the login page
      if (res.data.success) {
        this.$vToastify.success("Thanks for registering!");
        // set up programitically pushing them to login route/ may have to use router.push
        this.$router.push('/login')
      }
    },
    verifyPassword: function() {
      //verify password through regex
    },
  },
};
</script>
<style lang=""></style>
