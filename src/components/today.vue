<template>
  <div>
    <h4>today</h4>
    <div>temp: {{temp.temperature}}</div>
    <div>period: {{temp.period}}</div>
    <button @click="handleClick()" v-if="!temp.id">add today data</button>
    <button @click="update()" v-if="temp.id">update</button>
  </div>
</template>

<script>
  import {
    getTodayTemp,
    createTodayTemp,
    updateTodayTemp
  } from 'actions/today.js';

  export default {
    vuex: {
      getters: {
        temp: function (state) {
          return state.today.temp;
        }
      },
      actions: {
        getTodayTemp: getTodayTemp,
        createTodayTemp: createTodayTemp,
        updateTodayTemp: updateTodayTemp
      }
    },

    ready: function () {
      console.log(getTodayTemp);
      this.getTodayTemp();
    },

    methods: {
      handleClick: function () {
        var temp = {
          date: new Date(),
          temperature: 36.6,
          period: false
        };
        this.createTodayTemp(temp);
      },
      update: function () {
        this.updateTodayTemp((this.temp.temperature + 0.1).toFixed(1) * 1, true);
      }
    }
  };
</script>
