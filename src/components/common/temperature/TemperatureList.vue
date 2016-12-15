<template>
  <div>
    <mt-cell v-for="record in formattedRecords"
             :title="record.date" :value="record.temperature ? record.temperature : 'no data'"
             @click.native="handleClickRecord(record)">
      <mt-badge v-if="record.period">{{record.temperature}}</mt-badge>
    </mt-cell>
  </div>
</template>

<script>
  import { Cell, Badge } from 'mint-ui'
  import { YYYY_MM_DD, formatTemperature } from 'filters/filters'

  export default {
    components: {
      [Badge.name]: Badge,
      [Cell.name]: Cell
    },

    props: {
      temperatureRecords: {
        type: Array,
        default () {
          return [{
            temperature: 36.3, period: false, date: new Date(2016, 11, 4)
          }, {
            temperature: null, period: false, date: new Date(2016, 11, 5)
          }, {
            temperature: 36.3, period: false, date: new Date(2016, 11, 6)
          }, {
            temperature: 36.5, period: false, date: new Date(2016, 11, 7)
          }, {
            temperature: 37.1, period: true, date: new Date(2016, 11, 8)
          }, {
            temperature: 37.0, period: true, date: new Date(2016, 11, 9)
          }, {
            temperature: 36.4, period: false, date: new Date(2016, 11, 10)
          }]
        }
      }
    },

    computed: {
      formattedRecords () {
        return this.temperatureRecords.map(record => {
          return {
            temperature: record.temperature ? formatTemperature(record.temperature) : null,
            date: YYYY_MM_DD(record.date),
            period: record.period
          }
        })
      }
    },

    methods: {
      handleClickRecord (record) {
        this.$router.push({name: 'edit'})
      }
    }
  }
</script>
