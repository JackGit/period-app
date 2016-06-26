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
    font-weight: 100;
    color: #ee6e73;
  }
  .today-main .main-top h4 span {
    font-size: 0.5em;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.4);
  }
  .down-transition {
    transition: all 0.4s ease;
    opacity: 1;
    transform: translateY(0);
  }
  .down-enter {
    opacity: 0;
    transform: translateY(-10%);
  }
  .down-leave {
    display: none;
  }
  .up-transition {
    transition: all 0.4s ease;
    opacity: 1;
    transform: translateY(0);
  }
  .up-enter {
    opacity: 0;
    transform: translateY(20%);
  }
  .up-leave {
    display: none;
  }
  .scale-transition {
    transition: all 0.3s ease;
    opacity: 1;
    transform: scale(1,1);
  }
  .scale-enter {
    opacity: 0;
    transform: scale(0.7, 0.7);
  }
  .scale-leave {
    display: none;
  }
</style>

<template>
  <main class="today-main">
    <div class="main-top card z-depth-0">
      <h4 v-if="temp.id && !showEditor" @click="update()" transition="down">{{temp.temperature}}<span>&deg;C</span></h4>
      <p v-if="temp.id && !showEditor" class="grey-text text-lighten-1" transition="up">UPDATED AT {{temp.updatedAt | formatDate}}</p>
      <p v-if="!temp.id && !showEditor" @click="addTodayTemp()">CLICK TO ADD DATA</p>
      <editor v-if="showEditor" :temperature="editorTemp" :period="editorPeriod" :submit="submitToday" transition="scale"></editor>
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
  import Card from 'material-ui-vue/components/cards/card.vue';
  import CardAction from 'material-ui-vue/components/cards/card-action.vue';
  import moment from 'moment';

  export default {
    components: {
      'week-chart': Chart,
      'editor': Editor,
      'card': Card,
      'card-action': CardAction
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
    },

    filters: {
      formatDate: function (date) {
        return moment(date).format('YYYY/MM/DD HH:mm:ss');
      }
    }
  };
</script>
