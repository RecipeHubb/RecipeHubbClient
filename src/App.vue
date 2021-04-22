
<template>
  <div id="app" class="flex flex-col h-full" >
    <PublicHeader />
    <div class="flex-1 h-screen mx-auto ">
    <router-view></router-view>
  </div>
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
}
</style>