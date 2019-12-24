<template>
  <div class="mw-container" :style="{ padding: $store.state.loggedIn === false ? '50px' : '0px' }">
    <div class="logo mb-4"></div>
    <p>Copyright © {{ new Date().getFullYear() }} MYRUNES</p>
    <table class="mb-3">
      <tbody>
        <tr>
          <th>Main Version</th>
          <td>{{ version.version }}</td>
        </tr>
        <tr>
          <th>API Version</th>
          <td>{{ version.apiversion }}</td>
        </tr>
        <tr>
          <th>Front End Version</th>
          <td>{{ feversion }}</td>
        </tr>
      </tbody>
    </table>
    <p>
      This site is using image material and assets originally created by Riot Games, Inc. (Champion Avatars, Rune Assets).
      <br />We just want to clarify, that we (MYRUNES) are not the creators and credit holders of these assets.
    </p>

    <h2 class="mt-4 mb-3">Source Code</h2>
    <p>
      Yes, the whole project is completely open source. Below, there are some links
      to the official sources.
    </p>
    <a
      class="icon-link github"
      href="https://github.com/myrunes"
      target="_blank"
    >GitHub Organization</a>
    <a
      class="icon-link github"
      href="https://github.com/myrunes/backend"
      target="_blank"
    >Back End (REST API) Repository</a>
    <a
      class="icon-link github"
      href="https://github.com/myrunes/frontend"
      target="_blank"
    >Front End Repository</a>

    <h2 class="mt-4 mb-3">Information and Privacy</h2>
    <a
      class="icon-link info"
      href="https://github.com/myrunes/backend/blob/master/docs/imprint.txt"
      target="_blank"
    >Imprint</a>
    <a
      class="icon-link info"
      href="https://github.com/myrunes/backend/blob/master/docs/cookie-usage.md"
      target="_blank"
    >Cookie and Local Storage Usage</a>
    <a
      class="icon-link info"
      href="https://github.com/myrunes/backend/blob/master/LICENSE"
      target="_blank"
    >Open Source Licence (MIT)</a>
  </div>
</template>

<script>
/** @format */

import Rest from '../js/rest';
import Utils from '../js/utils';

export default {
  data() {
    return {
      version: {},
      feversion: '',
    };
  },

  created() {
    Rest.getVersion().then((res) => {
      this.version = res.body;
    });
    this.feversion = Utils.getEnv().VUE_APP_VERSION || 'DEBUG_BUILD';
  },
};
</script>

<style scoped>
/** @format */

a {
  text-decoration: underline;
  color: white !important;
}

th {
  padding-right: 20px;
}

.logo {
  width: 256px;
  height: 61px;
  background-image: url('/assets/logo-256-61.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}

.mw-container {
  max-width: 1000px;
}

.icon-link {
  display: flex;
  margin: 5px 0 5px 15px;
}

.icon-link::before {
  width: 1.2em;
  height: 1.2em;
  margin: auto 10px auto 0;
}

.icon-link.github::before {
  content: url('/assets/logos/github.svg');
}

.icon-link.info::before {
  content: url('/assets/info.svg');
  transform: scale(1.15);
}
</style>