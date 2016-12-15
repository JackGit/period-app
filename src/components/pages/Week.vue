<template>
  <page>
    <page-header slot="header" title="WEEK">
      <mt-button slot="left">prev</mt-button>
      <mt-button slot="right">next</mt-button>
    </page-header>
    <div>
      <card no-padding>
        <temperature-chart mode="week"></temperature-chart>
      </card>
      <card no-padding>
        <temperature-list style="margin-top: -1px"></temperature-list>
      </card>
    </div>
    <page-footer slot="footer" active="week"></page-footer>
  </page>
</template>

<script>
  import { Button } from 'mint-ui'
  import Page from 'components/common/page/Page.vue'
  import PageHeader from 'components/common/page/PageHeader.vue'
  import PageFooter from 'components/common/page/PageFooter.vue'
  import Card from 'components/common/card/Card.vue'
  import TemperatureList from 'components/common/temperature/TemperatureList.vue'
  import TemperatureChart from 'components/common/temperature/TemperatureChart.vue'

  export default {
    components: {
      [Button.name]: Button,
      'page': Page,
      'page-header': PageHeader,
      'page-footer': PageFooter,
      'card': Card,
      'temperature-list': TemperatureList,
      'temperature-chart': TemperatureChart
    }
  }
</script>
