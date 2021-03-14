<template>
  <div id="app">
    <PublicHeader />
    <div class="flex justify-center">
    <img alt="Vue logo" src="./assets/recipehubb_main.png">
    </div>
    <h1>Welcome to RecipeHubb!</h1>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import PublicHeader from './components/navigation/PublicHeader.vue'
import Footer from './components/navigation/Footer.vue'
import './assets/styles/index.css'
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
