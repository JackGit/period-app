<template>
  <div>
    <mt-cell v-for="record in formattedRecords"
             :title="record.dateString"
             @click.native="handleClickRecord(record)">
      <mt-badge v-if="record.period" color="#ff6767">{{record.temperature}}</mt-badge>
      <span v-if="record.temperature && !record.period" style="color:rgb(124, 181, 236)">{{record.temperature}}</span>
      <span v-if="!record.temperature">no data</span>
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
          return []
        }
      }
    },

    computed: {
      formattedRecords () {
        return this.temperatureRecords.map(record => {
          return {
            id: record.id,
            temperature: record.temperature ? formatTemperature(record.temperature) : null,
            date: record.date,
            dateString: YYYY_MM_DD(record.date),
            period: record.period
          }
        })
      }
    },

    methods: {
      handleClickRecord (record) {
        this.$emit('select', record)
      }
    }
  }
</script>
