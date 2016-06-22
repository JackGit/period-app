<style>
  html {
    height: 100%;
  }
</style>

<template>
  <router-view></router-view>
</template>

<script>
  import store from './vuex/store.js';

  export default {
    replace: false,
    store: store
  };
</script>
