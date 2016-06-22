<template>
  <div>
    <today-header></today-header>
    <today-main></today-main>
  </div>
</template>

<script>
  import TodayHeader from './Header.vue';
  import TodayMain from './Main.vue';

  export default {
    components: {
      'today-header': TodayHeader,
      'today-main': TodayMain
    }
  };
</script>
