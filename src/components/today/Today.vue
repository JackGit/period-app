<template>
  <div>
    <today-main></today-main>
  </div>
</template>

<script>
  import TodayMain from './Main.vue';
  import { clearWeekTemps } from 'actions/week.js';

  export default {
    components: {
      'today-main': TodayMain
    },

    vuex: {
      actions: {
        clearWeekTemps: clearWeekTemps
      }
    },

    route: {
      deactivate: function (transition) {
        this.clearWeekTemps();
        transition.next();
      }
    }
  };
</script>
