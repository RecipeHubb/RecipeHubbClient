
<template>
  <v-app>
    <div id="app" class="flex flex-col h-full" >
      <Header />
      <div class="flex-1 h-screen mx-auto ">
        <router-view></router-view>
      </div>
      <Footer />
    </div>
  </v-app>
</template>

<script>
import Header from './components/navigation/Header.vue'
import Footer from './components/navigation/Footer.vue'
import './assets/styles/index.css'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>