<template>
  <div>
    <h4>week data {{offset}}</h4>
    <div v-for="temp in temps">{{temp.date}}, {{temp.temperature}}</div>
    <button @click="getPrevWeekTemps()" v-if="offset > maxOffset">prev</button>
    <button @click="getNextWeekTemps()" v-if="offset < 0">next</button>
  </div>
</template>

<script>
  import {
    getThisWeekTemps,
    getNextWeekTemps,
    getPrevWeekTemps,
    getMaxWeekOffset
  } from 'actions/week.js';

  export default {
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
