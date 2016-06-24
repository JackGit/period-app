<template>
  <div>
    <month-main></month-main>
  </div>
</template>

<script>
  import Main from './Main.vue';
  import { clearMonthTemps } from 'actions/month.js';

  export default {
    components: {
      'month-main': Main
    },

    vuex: {
      actions: {
        clearMonthTemps: clearMonthTemps
      }
    },

    route: {
      deactivate: function (transition) {
        this.clearMonthTemps();
        transition.next();
      }
    }
  };
</script>
