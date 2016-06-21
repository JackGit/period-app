<template>
  <div>
    <h4>month data {{offset}}</h4>
    <div v-for="temp in temps">{{temp.date}}, {{temp.temperature}}</div>
    <button @click="getPrevMonthTemps()" v-if="offset > maxOffset">prev</button>
    <button @click="getNextMonthTemps()" v-if="offset < 0">next</button>
    <chart :data="temps" :start-date="startDate" :end-date="endDate" mode="month"></chart>
  </div>
</template>

<script>
  import {
    getThisMonthTemps,
    getNextMonthTemps,
    getPrevMonthTemps,
    getMaxMonthOffset
  } from 'actions/month.js';
  import Chart from 'components/chart.vue';

  export default {
    components: {
      'chart': Chart
    },

    vuex: {
      getters: {
        temps: function (state) {
          return state.month.temps;
        },
        offset: function (state) {
          return state.month.monthOffset;
        },
        maxOffset: function (state) {
          return state.month.monthOffsetMax * -1;
        },
        startDate: function (state) {
          return state.month.dateBoundry[0];
        },
        endDate: function (state) {
          return state.month.dateBoundry[1];
        }
      },
      actions: {
        getThisMonthTemps: getThisMonthTemps,
        getNextMonthTemps: getNextMonthTemps,
        getPrevMonthTemps: getPrevMonthTemps,
        getMaxMonthOffset: getMaxMonthOffset
      }
    },

    ready: function () {
      this.getMaxMonthOffset();
      this.getThisMonthTemps();
    }
  };
</script>
