<template>
  <div id="container" style="min-width:310px;height:400px;margin: 0 auto"></div>
</template>

<script>
  import Highcharts from 'highcharts';

  let options = {
    chart: {
      type: 'spline'
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
    xAxis: {
      type: 'datetime',
      labels: {
        overflow: 'justify'
      },
      // categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      lineWidth: 0,
      tickLength: 0,
      plotBands: [{ // visualize the weekend
        from: Date.UTC(2015, 5, 3, 0, 0, 0),
        to: Date.UTC(2015, 5, 6, 0, 0, 0),
        color: 'rgba(255, 144, 210, .2)'
      }]
    },
    yAxis: {
      title: {
        text: ''
      },
      labels: {
        enabled: false
      },
      min: 35.5,
      max: 42.0,
      minorGridLineWidth: 0,
      gridLineWidth: 0,
      alternateGridColor: null,
      plotBands: [{ // Light air
        from: 34,
        to: 35,
        color: 'rgba(68, 170, 213, 0.1)',
        label: {
          text: '34',
          style: {
            color: '#606060'
          }
        }
      }, { // Light breeze
        from: 35,
        to: 36,
        color: 'rgba(0, 0, 0, 0)',
        label: {
          text: '35',
          style: {
            color: '#606060'
          }
        }
      }, { // Gentle breeze
        from: 36,
        to: 37,
        color: 'rgba(68, 170, 213, 0.1)',
        label: {
          text: '36',
          style: {
            color: '#606060'
          }
        }
      }, { // Moderate breeze
        from: 37,
        to: 38,
        color: 'rgba(0, 0, 0, 0)',
        label: {
          text: '37',
          style: {
            color: '#606060'
          }
        }
      }, { // Fresh breeze
        from: 38,
        to: 39,
        color: 'rgba(68, 170, 213, 0.1)',
        label: {
          text: '38',
          style: {
            color: '#606060'
          }
        }
      }]
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
          enabled: false
        },
        pointInterval: 3600000 * 24, // one day
        pointStart: Date.UTC(2015, 4, 31, 0, 0, 0)
      }
    },
    series: [{
      name: 'Hestavollane',
      data: []
    }]
  };

  let chart;

  export default {
    props: {
      data: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },

    watch: {
      data: function (value) {
        var data = value.map(function (t) {
          return t.temperature;
        });

        chart.series[0].setData(data);
      }
    },

    ready: function () {
      console.log('ready chart');
      window.chart = chart = Highcharts.chart('container', options);
    }
  };
</script>
