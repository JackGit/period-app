<style>
  html {
    height: 100%;
  }
  nav {
    box-shadow: none;
  }
</style>

<template>
  <div>
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import store from './vuex/store.js';
  import Header from 'components/Header.vue';
  import Footer from 'components/Footer.vue';

  export default {
    replace: false,
    store: store,

    components: {
      'app-header': Header,
      'app-footer': Footer
    }
  };
</script>
