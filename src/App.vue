<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <hello></hello>
    <p>
      Welcome to your Vue.js app!
    </p>
    <p>
      To get a better understanding of how this boilerplate works, check out
      <a href="http://vuejs-templates.github.io/webpack" target="_blank">its documentation</a>.
      It is also recommended to go through the docs for
      <a href="http://webpack.github.io/" target="_blank">Webpack</a> and
      <a href="http://vuejs.github.io/vue-loader/" target="_blank">vue-loader</a>.
      If you have any issues with the setup, please file an issue at this boilerplate's
      <a href="https://github.com/vuejs-templates/webpack" target="_blank">repository</a>.
    </p>
    <p>
      You may also want to checkout
      <a href="https://github.com/vuejs/vue-router/" target="_blank">vue-router</a> for routing and
      <a href="https://github.com/vuejs/vuex/" target="_blank">vuex</a> for state management.
    </p>
    <div id="container" style="min-width:310px;height:400px;margin: 0 auto"></div>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Highcharts from 'highcharts'
// import Exporting from 'highcharts/modules/exporting'
// Exporting(Highcharts)

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
    max: 38.5,
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
      lineWidth: 4,
      states: {
        hover: {
          lineWidth: 5
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
    data: [36.1, 36.2, 36.1, 37.3, 37.2, 37.0, 36.0]
  }]
}

function createChart () {
  console.log(1)
  Highcharts.chart('container', options)
  console.log(2)
}

export default {
  components: {
    Hello
  },

  ready: () => {
    createChart()
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
