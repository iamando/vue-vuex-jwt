import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";

import "./main.css";

// Components
import App from "./App.vue";
import Login from "./components/Login.vue";
import Home from "./components/Home.vue";

import Cookie from "js-cookie";

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.config.productionTip = false;

const userCookie = Cookie.getJSON("user") || null;
const tokenCookie = Cookie.getJSON("token") || null;

const store = new Vuex.Store({
  state: {
    user: userCookie,
    token: tokenCookie,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      Cookie.set("user", JSON.stringify(user));
    },
    setToken(state, token) {
      state.token = token;
      Cookie.set("token", JSON.stringify(token));
    },
  },
  actions: {},
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
});

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Home },
    { path: "/login", component: Login },
  ],
});

new Vue({
  render: (h) => h(App),
  store: store,
  router,
}).$mount("#app");
