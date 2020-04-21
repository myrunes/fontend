<!-- @format -->

<template>
  <div id="app">
    <CookieInfo />
    <Header v-if="$store.state.loggedIn" />
    <router-view :class="{ m: $store.state.loggedIn }"></router-view>

    <!-- INFO OLD PASSWORD -->
    <InfoBubble
      ref="passwordwarn"
      color="orange"
      @hides="onPasswordWarnHides"
      style="z-index: 110;"
    >
      <p class="text-center m-2">
        <b>ATTENTION:</b>&nbsp;In the last update, myrunes has
        <a
          href="https://github.com/myrunes/backend/issues/16"
          target="_blank"
          class="main-link"
        >
          changed the password hashing
          algorithm to argon2
        </a>.
        <br />Pelease, go to your
        <router-link to="/settings" class="main-link">settings</router-link>&nbsp;and change your password
        in order to switch to the new algorithm.
        <br />
      </p>
    </InfoBubble>

    <!-- INFO BETA WARN -->
    <InfoBubble ref="betawarn" color="red" @hides="onBetaWarnHides" style="z-index: 110;">
      <p class="text-center m-2">
        <b>ATTENTION:</b>&nbsp;This instance is running on a non-release canary
        build which is not fully tested yet!
        <br />Actions taken here may lead
        to loss or corruption of data!
      </p>
    </InfoBubble>

    <Footer />
  </div>
</template>

<script>
/** @format */

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './css/global.css';

import Rest from './js/rest';
import Router from './js/router';
import EventBus from './js/eventbus';

import Header from './components/Header';
import Footer from './components/Footer';
import CookieInfo from './components/CookieInfo';
import InfoBubble from './components/InfoBubble';
import Vuex from 'vuex';

const NO_LOGIN_ROUTES = [
  'Share',
  'MailConfirm',
  'PasswordReset',
  'Contact',
  'About',
];

export default {
  name: 'app',

  components: {
    Header,
    CookieInfo,
    Footer,
    InfoBubble,
  },

  router: Router,

  created: function() {
    this.checkLogin();

    Rest.getVersion().then((res) => {
      if (
        res.body.release !== 'TRUE' &&
        window.localStorage.getItem('beta-info-accepted') !== '1'
      ) {
        setTimeout(() => this.$refs.betawarn.show(), 1000);
      }
    });

    EventBus.$on('login', () => {
      this.checkLogin();
    });

    EventBus.$on('logout', () => {
      this.$store.commit('setLoggedIn', false);
    });
  },

  methods: {
    checkLogin() {
      Rest.getMe()
        .then((res) => {
          this.$store.commit('setLoggedIn', true);
          if (
            res.body &&
            res.body.hasoldpw &&
            window.localStorage.getItem('password-info-accepted') !== '1'
          ) {
            setTimeout(() => this.$refs.passwordwarn.show(), 1000);
          }
        })
        .catch((err) => {
          this.$store.commit('setLoggedIn', false);
          if (!NO_LOGIN_ROUTES.includes(this.$route.name)) {
            this.$router.replace('/login');
          }
        });
    },

    onBetaWarnHides() {
      window.localStorage.setItem('beta-info-accepted', '1');
    },

    onPasswordWarnHides() {
      window.localStorage.setItem('password-info-accepted', '1');
    },
  },
};
</script>

<style>
/** @format */

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.m {
  margin: 70px 20px;
}

.main-link {
  text-decoration: underline;
}
</style>
