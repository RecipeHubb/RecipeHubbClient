<template lang="">
    <div>
      <h1 class="text-5xl pt-10 pb-10 text-purple-500">
        This is a single Recipe Page
      </h1>
    </div>
</template>

<script>
export default {
  name: "recipe",
  data() {
    return {
      recipe: {}
    };
  },
  mounted() {
    //get recipe data from API/DB from params
    // console.log(this.$router.params.id)
  },
};
</script>
