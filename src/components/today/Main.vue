<style>
  .today-main .main-top {
    display: flex;
    flex-direction: column ;
    justify-content: center;
    align-items: center;
    height: 260px;
    margin-bottom: 10px;
  }
  .today-main .main-top h4 {
    font-size: 4em;
  }
  .today-main .main-top h4 span {
    font-size: 0.5em;
  }
</style>

<template>
  <main class="today-main">
    <div class="main-top">
      <h4 v-if="temp.id && !showEditor" @click="update()">{{temp.temperature}}<span>&deg;C</span></h4>
      <p v-if="temp.id && !showEditor">LAST UPDATE 5MIN AGO</p>
      <p v-if="!temp.id && !showEditor" @click="addTodayTemp()">CLICK TO ADD DATA</p>
      <editor v-if="showEditor" :temperature="editorTemp" :period="editorPeriod" :submit="submitToday"></editor>
    </div>
    <div class="main-bottom">
      <week-chart mode="week" :data="temps" :start-date="startDate" :end-date="endDate"></week-chart>
    </div>
  </main>
</template>

<script>
  import {
    getTodayTemp,
    createTodayTemp,
    updateTodayTemp
  } from 'actions/today.js';
  import {
    getThisWeekTemps
  } from 'actions/week.js';
  import Chart from 'components/Chart.vue';
  import Editor from 'components/Editor.vue';

  export default {
    components: {
      'week-chart': Chart,
      'editor': Editor
    },

    data: function () {
      return {
        showEditor: false,
        editorTemp: '36.6',
        editorPeriod: false
      };
    },

    vuex: {
      getters: {
        temp: function (state) {
          return state.today.temp;
        },
        temps: function (state) {
          return state.week.temps;
        },
        startDate: function (state) {
          return state.week.dateBoundry[0];
        },
        endDate: function (state) {
          return state.week.dateBoundry[1];
        }
      },
      actions: {
        getTodayTemp: getTodayTemp,
        createTodayTemp: createTodayTemp,
        updateTodayTemp: updateTodayTemp,
        getThisWeekTemps: getThisWeekTemps
      }
    },

    watch: {
      temp: function () {
        this.getThisWeekTemps();
      }
    },

    ready: function () {
      this.getTodayTemp();
      this.getThisWeekTemps();
    },

    methods: {
      update: function () {
        this.editorTemp = this.temp.temperature + '';
        this.editorPeriod = this.temp.period;
        this.showEditor = true;
      },
      addTodayTemp: function () {
        this.showEditor = true;
      },
      submitToday: function (temperature, period) {
        console.log('submiting', temperature, period, this.temp.id);
        if (!this.temp.id) {
          this.createTodayTemp({
            date: new Date(),
            temperature: temperature,
            period: period
          });
        } else {
          this.updateTodayTemp(temperature, period);
        }

        this.showEditor = false;
      }
    }
  };
</script>
