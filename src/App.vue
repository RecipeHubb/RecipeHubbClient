<template>
  <div id="app">
    <PublicHeader />
    <img alt="Vue logo" src="./assets/recipehubb_main.png">
    <h1>Welcome to RecipeHubb!</h1>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import PublicHeader from './components/navigation/PublicHeader.vue'
import Footer from './components/navigation/Footer.vue'

export default {
  name: 'App',
  components: {
    PublicHeader,
    Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
