<style>
  .c-temperatureCard {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    margin-bottom: 10px;
    padding: 40px 20px;
  }

  .c-temperatureCard.in-period {
    background-color: #ff6161;
    color: rgba(255,255,255,.9);
  }

  .c-temperatureCard__digit {
    text-align: center;
    font-size: 50px;
    font-weight: 100;
    margin: 0;
  }

  .c-temperatureCard__unit {
    font-size: 14px;
  }

  .c-temperatureCard__updateDate {
    font-size: 12px;
    color: #c5c5c5;
    text-align: center;
    margin: 0;
  }
</style>

<template>
  <page>
    <page-header slot="header" title="TODAY"></page-header>
    <div>
      <card class="c-lastPeriodReminderCard">
        <h4 slot="header">REMINDER</h4>
        <p>Your last period is 2016/11/26</p>
      </card>
      <card class="c-temperatureCard in-period" @click="handleClickTempCard">
        <h4 class="c-temperatureCard__digit">36.6<span class="c-temperatureCard__unit">&deg;C</span></h4>
        <span class="c-temperatureCard__periodIcon"></span>
        <p class="c-temperatureCard__updateDate">updated at 2016/12/16 9:12</p>
      </card>
      <card no-padding>
        <temperature-chart mode="week"></temperature-chart>
      </card>
    </div>
    <page-footer slot="footer" active="today"></page-footer>
  </page>
</template>

<script>
  import moment from 'moment'
  import Page from 'components/common/page/Page.vue'
  import PageHeader from 'components/common/page/PageHeader.vue'
  import PageFooter from 'components/common/page/PageFooter.vue'
  import Card from 'components/common/card/Card.vue'
  import TemperatureList from 'components/common/temperature/TemperatureList.vue'
  import TemperatureChart from 'components/common/temperature/TemperatureChart.vue'

  export default {
    components: {
      'page': Page,
      'page-header': PageHeader,
      'page-footer': PageFooter,
      'card': Card,
      'temperature-list': TemperatureList,
      'temperature-chart': TemperatureChart
    },

    methods: {
      handleClickTempCard () {
        console.log('click edit todays data')
      }
    },

    filters: {
      formatDate (date) {
        return moment(date).format('YYYY/MM/DD hh:mm')
      }
    }
  }
</script>
