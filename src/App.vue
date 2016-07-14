<style>
  html {
    height: 100%;
  }
  body {
    background: #f5f5f5;
  }
  nav {
    box-shadow: none;
  }
  main {
    margin-bottom: 48px;
  }
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .fade-transition {
    transition: all .05s ease;
    opacity: 1;
  }
  .fade-enter, .fade-leave {
    opacity: 0;
  }
  .brand-logo {
    font-weight: 100;
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
  import EditPage from 'components/EditPage.vue';

  export default {
    replace: false,
    store: store,

    components: {
      'app-header': Header,
      'app-footer': Footer,
      'edit-page': EditPage
    }
  };
</script>
