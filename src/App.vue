
<template>
  <div id="app" class="" >
    <PublicHeader />
    <div class="mx-auto">
    <router-view></router-view>
  </div>
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
}
</style>