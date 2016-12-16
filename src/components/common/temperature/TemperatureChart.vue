<template>
  <div ref="chartMountNode">
  </div>
</template>

<script>
  import Highcharts from 'highcharts'
  import moment from 'moment'

  /**
   * temperatureRecords like [{temperature: 36.6, period: false}]
   */
  function createChartSeriesData (temperatureRecords) {
    return temperatureRecords.map(record => {
      if (record.period) {
        return {
          y: record.temperature,
          marker: {
            symbol: 'circle',
            fillColor: '#ff6767'
          }
        }
      } else {
        return {
          y: record.temperature,
          marker: {
            radius: 3
          }
        }
      }
    })
  }

  /**
   * mode: 'week', 'month'
   */
  function createChartOptions (temperatureRecords, mode) {
    let subTitle = ''
    let categories = []
    let options = null
    let firstDate = temperatureRecords[0].date
    let daysInMonth = moment(firstDate).daysInMonth()
    let startDate = moment(firstDate).startOf(mode).toDate()
    let endDate = moment(firstDate).endOf(mode).toDate()

    if (mode === 'week') {
      subTitle = moment(startDate).format('YYYY.MM.DD') + '~' + moment(endDate).format('YYYY.MM.DD')
      categories = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
    } else if (mode === 'month') {
      subTitle = moment(startDate).format('MMM YYYY')
      for (let i = 0; i < daysInMonth; i++) {
        categories.push(i + 1)
      }
    }

    options = {
      chart: {
        type: 'spline',
        marginTop: 0
      },
      title: {
        text: ''
      },
      subtitle: {
        text: subTitle
      },
      xAxis: {
        categories: categories
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: {
          enabled: false
        }
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      tooltip: {
        enabled: true,
        crosshairs: true,
        shared: true
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1
          }
        }
      },
      series: [{
        name: 'Temperature',
        marker: {
          symbol: 'circle'
        },
        data: createChartSeriesData(temperatureRecords)
      }]
    }

    return options
  }

  export default {
    props: {
      temperatureRecords: {
        type: Array,
        default () {
          return []
        }
      },
      mode: {
        type: String,
        required: true
      }
    },

    mounted () {
      this.initChart()
    },

    watch: {
      temperatureRecords () {
        this.initChart()
      }
    },

    methods: {
      initChart () {
        if (this.temperatureRecords.length > 0) {
          Highcharts.chart(this.$refs.chartMountNode, createChartOptions(this.temperatureRecords, this.mode))
        }
      }
    }
  }
</script>
