<template lang="">
  <div class=" p-6 flex justify-center lg:p-0 pt-12 ">
    <div class="shadow-lg rounded-lg bg-indigo-50 w-3/4 ">
      <div class=" flex justify-center ">
        <div class="relative w-1/2 hidden lg:block ">
          <img
            class="object-fill h-full w-full rounded-l-lg inset-0 m-0 p-0"
            src="https://images.unsplash.com/photo-1518737003272-dac7c4760d5e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
          />
        </div>
        <div class="lg:w-1/2 text-center">
          <h1 class="text-right text-sm px-4 py-4 text-gray-700">
            Have an account?
            <span class="font-bold"
            >
              <router-link to="/login">Sign in</router-link>
            </span>
          </h1>
          <div class="my-16" v-if="!showReset">
            <h1 class="lg:text-2xl text-lg py-2">Checking..</h1>
            <div>
              <input
                type="text"
                placeholder="Email or Username"
                v-model="credential"
                class="border-2 bg-white rounded-md my-2 p-2 outline-none lg:w-7/12 w-3/8 "
                @keydown.enter="Reset"
              />
            </div>
            <div
              class="bg-white border-2 rounded-md cursor-pointer hover:bg-purple-400  lg:p-2 p-1 my-3 px-8  text-sm inline-block"
              v-on:click="Next"
            >
              Next
            </div>
          </div>
          <div class="lg:mt-16 mt-6" v-else>
                <h1 class="lg:text-2xl text-lg py-2">Reset Password</h1>
              <input
                type="password"
                v-model="password"
                placeholder="New Password"
                class="border-2 bg-white rounded-md my-2 p-2 w-7/12  outline-none"
                @keydown.enter="Reset"
              />
               <input
                type="password"
                v-model="confirmPassword"
                placeholder="Confirm password"
                class="border-2 bg-white rounded-md my-2 p-2 w-7/12  outline-none"
                @keydown.enter="Reset"
              />
            </div>
            <div v-show="showReset"
              class="bg-white border-2 rounded-md cursor-pointer hover:bg-purple-400  p-2 my-3 px-8  text-sm inline-block"
              v-on:click="Reset"
            >
              Reset
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
      showReset: false,
      confirmPassword: null
    };
  },
  methods: {
    async Next() {
      // validate credentials
      this.validateCredentials();

      const userCreds = {
        email: this.email,
        username: this.username,
      }

    const user = await AuthService.findUser(userCreds);
      if(user.data.exists) {
          this.showReset = true
            return
      }
      this.$vToastify.error('Username or Email Doesnt exist')
    },
    async Reset() {
           if(this.confirmPassword === this.password && this.confirmPassword && this.password ) {
              await AuthService.reset({email: this.email, username: this.username, password:this.password})
              this.$vToastify.success('New Password Successful')
              this.$router.push('/login')
              return
          }
          this.$vToastify.error("Passwords not the same.");
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
