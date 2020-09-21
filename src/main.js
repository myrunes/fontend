/** @format */

import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import Router from 'vue-router';
import AsyncComputed from 'vue-async-computed';
import Vuex from 'vuex';

import { Sortable, AutoScroll } from 'vuedraggable';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(Router);
Vue.use(AsyncComputed);

const store = new Vuex.Store({
  state: {
    loggedIn: null,
    reCaptchaSiteKey: null,
  },

  mutations: {
    setLoggedIn(state, v) {
      state.loggedIn = v;
    },
    setReCaptchaSiteKey(state, v) {
      state.reCaptchaSiteKey = v;
    },
  },
});

new Vue({
  render: (h) => h(App),
  store,
}).$mount('#app');
