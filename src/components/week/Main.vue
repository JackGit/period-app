<style>
  .week-main .main-top {
    margin-bottom: 10px;
  }
</style>

<template>
  <main class="week-main">
    <card class="z-depth-0">
      <card-action>
        <a class="left" @click="getPrevWeekTemps()" v-if="offset > maxOffset">prev</a>
        <a class="right" @click="getNextWeekTemps()" v-if="offset < 0">next</a>
      </card-action>
      <chart :data="temps" :start-date="startDate" :end-date="endDate" mode="week" class="main-top"></chart>
    </card>
    <week-list :data="temps"></week-list>
  </main>
</template>

<script>
  import {
    getThisWeekTemps,
    getNextWeekTemps,
    getPrevWeekTemps,
    getMaxWeekOffset
  } from 'actions/week.js';
  import Chart from 'components/Chart.vue';
  import Editor from 'components/Editor.vue';
  import List from 'components/List.vue';
  import Card from 'material-ui-vue/components/cards/card.vue';
  import CardAction from 'material-ui-vue/components/cards/card-action.vue';

  export default {
    components: {
      'chart': Chart,
      'editor': Editor,
      'week-list': List,
      'card': Card,
      'card-action': CardAction
    },

    vuex: {
      getters: {
        temps: function (state) {
          return state.week.temps;
        },
        offset: function (state) {
          return state.week.weekOffset;
        },
        maxOffset: function (state) {
          return state.week.weekOffsetMax * -1;
        },
        startDate: function (state) {
          return state.week.dateBoundry[0];
        },
        endDate: function (state) {
          return state.week.dateBoundry[1];
        }
      },
      actions: {
        getThisWeekTemps: getThisWeekTemps,
        getNextWeekTemps: getNextWeekTemps,
        getPrevWeekTemps: getPrevWeekTemps,
        getMaxWeekOffset: getMaxWeekOffset
      }
    },

    ready: function () {
      this.getMaxWeekOffset();
      this.getThisWeekTemps();
    }
  };
</script>
