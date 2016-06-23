<style>
  .month-main .main-top {
    margin-bottom: 10px;
  }
</style>

<template>
  <main class="month-main">
    <chart :data="temps" :start-date="startDate" :end-date="endDate" mode="month" class="main-top"></chart>
    <week-list :data="temps"></week-list>
  </main>
</template>

<script>
  import {
    getThisMonthTemps,
    getNextMonthTemps,
    getPrevMonthTemps,
    getMaxMonthOffset
  } from 'actions/month.js';
  import Chart from 'components/Chart.vue';
  import Editor from 'components/Editor.vue';
  import List from 'components/List.vue';

  export default {
    components: {
      'chart': Chart,
      'editor': Editor,
      'week-list': List
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
