<template>
  <div>
    <week-header></week-header>
    <week-main></week-main>
  </div>
</template>

<script>
  import Header from './Header.vue';
  import Main from './Main.vue';

  export default {
    components: {
      'week-header': Header,
      'week-main': Main
    }
  };
</script>
