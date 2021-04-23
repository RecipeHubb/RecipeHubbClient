import Vue from 'vue'
import VueRouter from 'vue-router'
// public
import App from './App.vue'
import About from './components/public/About'
import Home from './components/public/Home'
import SignIn from './components/public/SignIn'
import SignUp from './components/public/SignUp'
// platform
import Profile from './components/platform/profileDetails/ProfilePage'
import Setting from './components/platform/profileDetails/Setting'
import Recipes from './components/platform/recipes/Recipes'
import Recipe from './components/platform/recipes/Recipe'
// dependancies
import VueFeatherIcon from 'vue-feather-icon-corrected'
import VueToastify from "vue-toastify";
import VueModal from '@kouts/vue-modal';
import '@kouts/vue-modal/dist/vue-modal.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vuetify from './plugins/vuetify';

library.add(faCoffee)


Vue.component('font-awesome-icon', FontAwesomeIcon)
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
  { path: '/profile', component: Profile },
  { path: '/recipes', component: Recipes },
  { path: '/setting', component: Setting },
  { path: '/recipes/:id', name: 'singleRecipe', component: Recipe }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
