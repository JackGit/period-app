<template>
  <div id="chartMountNode"></div>
</template>

<script>
  import Highcharts from 'highcharts';
  import {
    fillWeekTempData,
    fillMonthTempData
  } from 'assets/js/utils.js';

  const MAX_TEMP = 41;
  const MIN_TEMP = 36;
  const bandsOptions = (function () {
    var bands = [];
    for (var i = MIN_TEMP - 1; i < MAX_TEMP; i++) {
      bands.push({
        from: i,
        to: i + 1,
        color: i % 2 !== 0 ? 'rgba(68, 170, 213, 0.1)' : 'rgba(0, 0, 0, 0)',
        label: {
          text: i + '',
          style: {
            color: '#606060'
          }
        }
      });
    }
    return bands;
  })();
  const PERIOD_AREA_COLOR = 'rgba(255, 144, 210, .2)';
  const weekLabelFormatter = function () {
    return Highcharts.dateFormat('%a', this.value);
  };
  const monthLabelFormatter = function () {
    return Highcharts.dateFormat('%d', this.value);
  };

  function getChartOptions (startDate, endDate, mode, data, plotBands) {
    return {
      chart: {
        type: 'spline',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      tooltip: {
        enabled: false,
        followTouchMove: false
      },
      xAxis: {
        type: 'datetime',
        labels: {
          overflow: 'justify',
          formatter: mode === 'week' ? weekLabelFormatter : monthLabelFormatter
        },
        min: parseDate(startDate),
        max: parseDate(endDate),
        lineWidth: 1,
        tickLength: 5,
        tickInterval: mode === 'week' ? 24 * 3600 * 1000 : 24 * 3600 * 1000 * 2,
        plotBands: plotBands
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: {
          enabled: false
        },
        min: MIN_TEMP,
        max: MAX_TEMP,
        minorGridLineWidth: 0,
        gridLineWidth: 0,
        alternateGridColor: null,
        plotBands: bandsOptions
      },
      plotOptions: {
        spline: {
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 2
            }
          },
          marker: {
            enabled: true
          },
          pointInterval: 3600000 * 24 // one day
        }
      },
      series: [{
        name: 'temp',
        data: data
      }]
    };
  }

  function parseDate (date, h, m, s) {
    return Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      h === undefined ? date.getUTCHours() : h,
      m === undefined ? date.getUTCMinutes() : m,
      s === undefined ? date.getUTCSeconds() : s
    );
  }

  function getPeriodBands (data) {
    /* return data.filter(function (d) {
      return d.period;
    }).map(function (d) {
      return {
        from: parseDate(d.date, 0, 0, 0),
        to: parseDate(new Date(d.date * 1 + 24 * 3600 * 1000), 0, 0, 0),
        color: PERIOD_AREA_COLOR
      };
    }); */
    PERIOD_AREA_COLOR;
    return [];
  }

  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });

  export default {
    props: {
      data: {
        type: Array,
        default: function () {
          return []; // {date, temperature, period}
        }
      },
      mode: {
        type: String,
        default: 'week' // week, month
      },
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date,
        required: true
      }
    },

    computed: {
      tempDates: function () {
        var fillMethod = this.mode === 'week' ? fillWeekTempData : fillMonthTempData;
        var filledData = fillMethod(this.startDate, this.data); // filled temp data, make sure there is a record for each day

        return filledData.filter(function (d) {
          return d.temperature;
        }).map(function (d) {
          return [parseDate(d.date), d.temperature];
        });
      }
    },

    watch: {
      tempDates: function () {
        this.refresh();
      }
    },

    ready: function () {
      this.refresh();
    },

    methods: {
      refresh: function () {
        Highcharts.chart('chartMountNode', getChartOptions(
          this.startDate,
          this.endDate,
          this.mode,
          this.tempDates,
          getPeriodBands(this.data))
        );
      }
    }
  };
</script>
