import Vue from "vue";
import VueRouter from "vue-router";
// public
import App from "./App.vue";
import Home from "./components/public/Home";

// platform routes load on demand
const About = () => import("./components/public/About");
const SignIn = () => import("./components/public/SignIn");
const SignUp = () => import("./components/public/SignUp");
const Error = () => import("./components/public/404");
const Profile = () => import("./components/platform/profileDetails/ProfilePage");
const Recipes = () => import("./components/platform/recipes/Recipes");
const Recipe = () => import("./components/platform/recipes/Recipe");
const PublicRecipes = () => import("./components/platform/publicRecipes/PublicRecipes");
const Search = () => import("./components/platform/publicRecipes/Search");
// dependancies
import VueFeatherIcon from "vue-feather-icon-corrected";
import VueToastify from "vue-toastify";
import VueModal from "@kouts/vue-modal";
import "@kouts/vue-modal/dist/vue-modal.css";
import vuetify from "./plugins/vuetify";
import "@/assets/styles/main.css";
import AuthService from "./service/AuthService";
import Vuex from "vuex";

Vue.use(VueFeatherIcon);
Vue.use(VueToastify);
Vue.use(Vuex);

//registered components
Vue.component("Modal", VueModal);

Vue.config.productionTip = false;

Vue.use(VueRouter);

const store = new Vuex.Store({
  state: {
    user: AuthService.getToken() && JSON.parse(localStorage.getItem("user")),
  },
  mutations: {
    refresh(state) {
      state.user =
        AuthService.getToken() && JSON.parse(localStorage.getItem("user"));
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.user;
    },
  },
});

const routes = [
  {
    path: "/",
    component: Home,
  },
  { path: "/about", component: About },
  { path: "/login", component: SignIn },
  { path: "/register", component: SignUp },
  {
    path: "/profile",
    component: Profile,
    meta: {
      authenticate: true,
    },
  }, // needs to be authenticated
  {
    path: "/recipes",
    component: Recipes,
    meta: {
      authenticate: true,
    },
  }, // needs to be authenticated
  { path: "/search", component: Search },
  {
    path: "/recipes/:id/:recipeName",
    name: "singleRecipe",
    component: Recipe,
    meta: {
      authenticate: true,
    },
  },
  {
    path: "/public/recipes",
    component: PublicRecipes,
    meta: {
      authenticate: true,
    },
  },
  {
    path: "/public/recipes/:id/:recipeName",
    name: "publicSingleRecipe",
    component: Recipe,
    meta: {
      authenticate: true,
    },
  },
  { path: "/*", component: Error },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.authenticate && !AuthService.getToken()) {
    return next("/404");
  }
  next();
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
