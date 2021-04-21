import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import About from './components/public/About'
import Home from './components/public/Home'
import SignIn from './components/public/SignIn'
import SignUp from './components/public/SignUp'
import Profile from './components/protected/ProfilePage'
import VueFeatherIcon from 'vue-feather-icon-corrected'
import VueToastify from "vue-toastify";
import VueModal from '@kouts/vue-modal';
import '@kouts/vue-modal/dist/vue-modal.css';

Vue.use(VueFeatherIcon)
Vue.use(VueToastify);

//registered components
Vue.component('Modal', VueModal);

Vue.config.productionTip = false

Vue.use(VueRouter)


const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/login', component: SignIn },
  { path: '/register', component: SignUp },
  { path: '/profile', component: Profile }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
