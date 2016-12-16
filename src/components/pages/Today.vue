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
    background-color: #ff6767;
  }

  .in-period .c-temperatureCard__digit {
    color: rgba(255,255,255,.9);
  }

  .c-temperatureCard__digit {
    color: #7cb5ec;
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
    <div v-if="!loading">
      <!--<card class="c-lastPeriodReminderCard">
        <h4 slot="header">REMINDER</h4>
        <p>Your last period is 2016/11/26</p>
      </card>-->
      <card :class="{'c-temperatureCard': true, 'in-period': temperatureRecordForToday.period}" v-if="temperatureRecordForToday" @click.native="handleClickTempCard">
        <h4 class="c-temperatureCard__digit">{{temperatureRecordForToday.temperature}}<span class="c-temperatureCard__unit">&deg;C</span></h4>
        <span class="c-temperatureCard__periodIcon"></span>
        <p class="c-temperatureCard__updateDate">updated at {{temperatureRecordForToday.updatedAt | formatDate}}</p>
      </card>
      <card class="c-temperatureCard" v-else>
        add data
      </card>
      <card no-padding>
        <temperature-chart mode="week" :temperature-records="temperatureRecordsThisWeek"></temperature-chart>
      </card>
    </div>
    <edit-popup :show="showPopup"
                :temperature="temperatureRecordForToday.temperature"
                :period="temperatureRecordForToday.period"
                :date="temperatureRecordForToday.date"
                :id="temperatureRecordForToday.id"
                @close="handlePopupClose"
                @done="handleEditDone"
                @delete="handleEditDelete"></edit-popup>
    <page-footer slot="footer" active="today"></page-footer>
  </page>
</template>

<script>
  import moment from 'moment'
  import API from 'api'
  import Page from 'components/common/page/Page.vue'
  import PageHeader from 'components/common/page/PageHeader.vue'
  import PageFooter from 'components/common/page/PageFooter.vue'
  import Card from 'components/common/card/Card.vue'
  import TemperatureList from 'components/common/temperature/TemperatureList.vue'
  import TemperatureChart from 'components/common/temperature/TemperatureChart.vue'
  import EditPopup from 'components/pages/Edit.vue'
  import { Indicator } from 'mint-ui'
  import { enrichTemperatureRecords } from 'src/utils/utils'

  export default {
    components: {
      'page': Page,
      'page-header': PageHeader,
      'page-footer': PageFooter,
      'card': Card,
      'temperature-list': TemperatureList,
      'temperature-chart': TemperatureChart,
      'edit-popup': EditPopup
    },

    data () {
      return {
        loading: false,
        temperatureRecordsThisWeek: [],
        showPopup: false
      }
    },

    computed: {
      temperatureRecordForToday () {
        let todayDateString = moment().format('YYYY MM DD')
        return this.temperatureRecordsThisWeek.filter(r => r.dateString === todayDateString)[0] || {}
      }
    },

    watch: {
      loading (value) {
        if (value) {
          Indicator.open('')
        } else {
          Indicator.close()
        }
      }
    },

    created () {
      this.fetchData()
    },

    methods: {
      fetchData () {
        let weekStartDate = moment().startOf('week').toDate()
        let weekEndDate = moment().endOf('week').toDate()

        this.loading = true
        API.Temperature.getTempsByDateRange(weekStartDate, weekEndDate).then(response => {
          let records = response.map(r => {
            return {
              id: r.id,
              temperature: r.get('temperature'),
              date: r.get('date'),
              period: r.get('period'),
              dateString: r.get('dateString'),
              updatedAt: r.updatedAt
            }
          })
          this.temperatureRecordsThisWeek = enrichTemperatureRecords(records, weekStartDate, 7)
          this.loading = false
        })
      },
      handleClickTempCard () {
        this.showPopup = !this.showPopup
      },
      handlePopupClose () {
        this.showPopup = false
      },
      handleEditDone (record) {
        let newRecords = []
        for (let i = 0; i < this.temperatureRecordsThisWeek.length; i++) {
          let r = this.temperatureRecordsThisWeek[i]
          if (r.dateString === record.dateString) {
            newRecords.push(record)
          } else {
            newRecords.push(r)
          }
        }
        this.temperatureRecordsThisWeek = newRecords
      },
      handleEditDelete (id) {
        let newRecords = []
        for (let i = 0; i < this.temperatureRecordsThisWeek.length; i++) {
          let r = this.temperatureRecordsThisWeek[i]
          if (r.id === id) {
            r.temperature = null
            r.id = null
            r.period = false
            newRecords.push(r)
          } else {
            newRecords.push(r)
          }
        }
        this.temperatureRecordsThisWeek = newRecords
      }
    },

    filters: {
      formatDate (date) {
        return moment(date).format('YYYY/MM/DD HH:mm')
      }
    }
  }
</script>
