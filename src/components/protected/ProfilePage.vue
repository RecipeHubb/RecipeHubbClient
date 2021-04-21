<template>
<div class="pt-20 h-screen">
  <h1>We are LOGGED IN {{user.email}}</h1>
  </div>
</template>

<script>
export default {
  name: "ProfilePage",
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));

    this.user = user;
  },
};
</script>
