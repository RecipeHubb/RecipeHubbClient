<template lang="">
  <div class=" p-16 flex justify-center ">
    <div class="shadow-lg rounded-lg bg-indigo-50 w-3/4">
      <div class=" flex justify-center">
        <div class="relative w-1/2 hidden lg:block ">
          <img
            class="object-fill h-full w-full rounded-l-lg inset-0 m-0 p-0"
            src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80"
          />
        </div>
        <div class="lg:w-1/2 text-center">
          <h1 class="text-right text-sm px-4 py-4 text-gray-700">
            Don't have an account?
            <span class="font-bold"
              ><router-link to="/register">Sign up</router-link></span
            >
          </h1>
          <div class="my-16">
            <h1 class="text-2xl py-2">Sign in</h1>
            <div>
              <input
                type="text"
                placeholder="Email or Username"
                v-model="credential"
                class="border-2 bg-white rounded-md my-2 p-2 outline-none w-7/12"
              />
            </div>
            <div>
              <input
                type="password"
                v-model="password"
                placeholder="Password"
                class="border-2 bg-white rounded-md my-2 p-2 w-7/12  outline-none"
              />
            </div>
            <div
              class="bg-white border-2 rounded-md cursor-pointer  p-2 my-6 px-8  text-sm inline-block"
              v-on:click="signInUser"
            >
              Login
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "../../service/AuthService";
export default {
  name: "SignIn",

  data: function() {
    return {
      credential: null,
      email: null,
      username: null,
      password: null,
    };
  },
  methods: {
    signInUser: async function() {
      // validate credentials
      this.validateCredentials();

      const res = await AuthService.login({
        email: this.email,
        username: this.username,
        password: this.password,
      });

      if (res && res.data && res.data.success) {
        // add toastr
        this.$vToastify.success("Logging In...");
        // pushes to home page and refreshes the page for new nav
        this.$router.push("/profile");
        this.$router.go(0);
        return;
        // push new routes to authenticated user
      }
      this.$vToastify.error("Please Try Password or Email Again.");
    },
    validateCredentials() {
      const match = this.credential.match(/[@]/g);

      if (match) {
        // credential is an email
        this.email = this.credential.toLowerCase();
      } else {
        this.username = this.credential.toLowerCase();
      }
      // credential is a username

      if (!this.credential && !this.password) {
        this.$vToastify.error("Please enter Email or Username and Password.");
        return false;
      }
      return true;
    },
  },
};
</script>
