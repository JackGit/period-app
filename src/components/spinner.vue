<style scoped>
</style>

<template>
  <div v-el:spinner>
  </div>
</template>

<script>
  import Spinner from 'assets/js/spinner.js';

  export default {
    ready: function () {
      /* eslint no-new: "off" */
      new Spinner(this.$els.spinner);
    }
  };
</script>
