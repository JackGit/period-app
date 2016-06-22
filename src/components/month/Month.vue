<template>
  <div>
    <month-header></month-header>
    <month-main></month-main>
  </div>
</template>

<script>
  import Header from './Header.vue';
  import Main from './Main.vue';

  export default {
    components: {
      'month-header': Header,
      'month-main': Main
    }
  };
</script>
