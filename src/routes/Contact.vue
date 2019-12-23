<template>
  <div class="mw-container">
    <div class="logo mb-4"></div>

    <h2 class="mt-4 mb-3">Contact</h2>
    <p>
      If you want to contact us, send an e-mail to
      <b>
        <a href="mailto:contact@myrunes.com">contact@myrunes.com</a>
      </b>.
    </p>
    <p>
      Alternatively, you can also contact us on our
      <a href="/discord" target="_blank">
        <b>Discord Server</b>
      </a>.
      <br />Of cousre, you can also leave some critics and suggestions there, if you want.
    </p>

    <h2 class="mt-4 mb-3">Support Us</h2>
    <p>
      This service is (ad-)free and open source, so we don't earn any money with this page.
      Per year, we pay €20 (~ $22) for the myrunes.com domain and €60 (~ $66) for the root server.
      So, if you want to support us, you can do this via
      <a
        href="/paypal"
        target="_blank"
      >
        <b>PayPal</b>
      </a>, if you want.
    </p>
  </div>
</template>

<script>
/** @format */

export default {};
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
</style>