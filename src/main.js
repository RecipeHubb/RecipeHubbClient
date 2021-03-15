import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import HelloWorld from './components/public/HelloWorld'
import About from './components/public/About'
import Home from './components/public/Home'
import SignIn from './components/public/SignIn'
import SignUp from './components/public/SignUp'
import VueFeatherIcon from 'vue-feather-icon-corrected'

Vue.use(VueFeatherIcon)


Vue.config.productionTip = false

Vue.use(VueRouter)


const routes = [
  { path: '/', component: Home },
  { path: '/as', component: HelloWorld },
  { path: '/about', component: About },
  { path: '/login', component: SignIn },
  { path: '/register', component: SignUp }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
