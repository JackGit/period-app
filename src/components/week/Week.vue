<template>
  <div>
    <week-main></week-main>
  </div>
</template>

<script>
  import Main from './Main.vue';
  import { clearWeekTemps } from 'actions/week.js';

  export default {
    components: {
      'week-main': Main
    },

    vuex: {
      actions: {
        clearWeekTemps: clearWeekTemps
      }
    },

    route: {
      deactivate: function (transition) {
        console.log('route.deactivate');
        this.clearWeekTemps();
        transition.next();
      }
    }
  };
</script>
