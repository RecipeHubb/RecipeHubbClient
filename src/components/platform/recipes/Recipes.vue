<template lang="">
    <div class="shadow-lg rounded-lg bg-indigo-20 w-3/4">
        <h1>Recipes Page</h1>
        
    </div>
</template>
<script>
export default {
  name: "Recipes",
  data() {
    return {
      recipes: [],
    }
  },
  mounted() {
    // get list of recipes
    let user = JSON.parse(localStorage.getItem("user"));
    this.user = user;
  },
};
</script>