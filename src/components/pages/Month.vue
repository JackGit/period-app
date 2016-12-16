<template>
  <page>
    <page-header slot="header" title="MONTH">
      <mt-button slot="left" @click.native="prev()">prev</mt-button>
      <mt-button slot="right" @click.native="next()">next</mt-button>
    </page-header>
    <div v-if="!loading">
      <card no-padding>
        <temperature-chart :temperature-records="temperatureRecords" mode="month"></temperature-chart>
      </card>
      <card no-padding>
        <temperature-list :temperature-records="temperatureRecords" style="margin-top: -1px" @select="handleSelectListItem"></temperature-list>
      </card>
    </div>
    <edit-popup :show="showPopup"
                :temperature="selectedTemperatureRecord.temperature"
                :period="selectedTemperatureRecord.period"
                :date="selectedTemperatureRecord.date"
                :id="selectedTemperatureRecord.id"
                @close="handlePopupClose"
                @done="handleEditDone"
                @delete="handleEditDelete"></edit-popup>
    <page-footer slot="footer" active="month"></page-footer>
  </page>
</template>

<script>
  import API from 'api'
  import moment from 'moment'
  import { enrichTemperatureRecords } from 'src/utils/utils'
  import { Button, Indicator } from 'mint-ui'
  import Page from 'components/common/page/Page.vue'
  import PageHeader from 'components/common/page/PageHeader.vue'
  import PageFooter from 'components/common/page/PageFooter.vue'
  import Card from 'components/common/card/Card.vue'
  import TemperatureList from 'components/common/temperature/TemperatureList.vue'
  import TemperatureChart from 'components/common/temperature/TemperatureChart.vue'
  import EditPopup from 'components/pages/Edit.vue'

  export default {
    components: {
      [Button.name]: Button,
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
        temperatureRecords: [],
        monthOffset: 0,
        showPopup: false,
        selectedTemperatureRecord: {}
      }
    },

    created () {
      this.fetchData()
    },

    watch: {
      monthOffset () {
        this.fetchData()
      },
      loading (value) {
        if (value) {
          Indicator.open()
        } else {
          Indicator.close()
        }
      }
    },

    methods: {
      fetchData () {
        let startDate = moment().add(this.monthOffset, 'month').startOf('month').toDate()
        let endDate = moment().add(this.monthOffset, 'month').endOf('month').toDate()

        console.log(startDate, endDate)

        this.loading = true
        API.Temperature.getTempsByDateRange(startDate, endDate).then(response => {
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
          this.temperatureRecords = enrichTemperatureRecords(records, startDate, moment(startDate).daysInMonth())
          this.loading = false
        })
      },
      prev () {
        this.monthOffset -= 1
      },
      next () {
        this.monthOffset += 1
      },
      handleSelectListItem (item) {
        this.selectedTemperatureRecord = item
        this.showPopup = true
      },
      handlePopupClose () {
        this.selectedTemperatureRecord = {}
        this.showPopup = false
      },
      handleEditDone (record) {
        let newRecords = []
        for (let i = 0; i < this.temperatureRecords.length; i++) {
          let r = this.temperatureRecords[i]
          if (r.dateString === record.dateString) {
            newRecords.push(record)
          } else {
            newRecords.push(r)
          }
        }
        this.temperatureRecords = newRecords
      },
      handleEditDelete (id) {
        let newRecords = []
        for (let i = 0; i < this.temperatureRecords.length; i++) {
          let r = this.temperatureRecords[i]
          if (r.id === id) {
            r.temperature = null
            r.id = null
            r.period = false
            newRecords.push(r)
          } else {
            newRecords.push(r)
          }
        }
        this.temperatureRecords = newRecords
      }
    }
  }
</script>
