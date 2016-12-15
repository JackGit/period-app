<template>
  <div ref="chartMountNode">
  </div>
</template>

<script>
  import Highcharts from 'highcharts'
  import moment from 'moment'

  /**
   * fill the missing data with null temperature
   */
  function enrichTemperatureRecords (temperatureRecords, startDate, totalDays) {
    var records = []
    for (let i = 0; i < totalDays; i++) {
      let date = moment(startDate).add(i, 'days').toDate()
      let record = temperatureRecords.filter(r => {
        return moment(r.date).isSame(date)
      })[0]

      if (record) {
        records.push({
          temperature: record.temperature,
          period: record.period,
          date: record.date
        })
      } else {
        records.push({
          temperature: null,
          period: false,
          date: date
        })
      }
    }

    return records
  }

  /**
   * temperatureRecords like [{temperature: 36.6, period: false}]
   */
  function createChartSeriesData (temperatureRecords) {
    return temperatureRecords.map(record => {
      if (record.period) {
        return {
          y: record.temperature,
          marker: {
            symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
          }
        }
      } else {
        return record.temperature
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
    let fullRecords = enrichTemperatureRecords(temperatureRecords, startDate, mode === 'week' ? 7 : daysInMonth)

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
        enabled: false,
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
          symbol: 'square'
        },
        data: createChartSeriesData(fullRecords)
      }]
    }

    return options
  }

  export default {
    props: {
      temperatureRecords: {
        type: Array,
        default () {
          return [{
            temperature: 36.3, period: false, date: new Date(2016, 11, 4)
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
      },
      mode: {
        type: String,
        default: 'week'
      }
    },
    mounted () {
      Highcharts.chart(this.$refs.chartMountNode, createChartOptions(this.temperatureRecords, this.mode))
    }
  }
</script>
