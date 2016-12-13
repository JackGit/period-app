<template>
  <page>
    <p>simple card for alert of last period date</p>
    <p>temperature capture for today</p>
    <temperature-list></temperature-list>
  </page>
</template>

<script>
  import Page from 'components/common/page/Page.vue'
  import TemperatureList from 'components/common/temperature/TemperatureList.vue'

  export default {
    components: {
      'page': Page,
      'temperature-list': TemperatureList
    }
  }
</script>
