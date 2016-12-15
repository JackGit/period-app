<style>
  .c-editPage__form, .c-editPage__actions {
    margin-bottom: 20px;
    margin-top: -1px;
  }
  .c-editPage__button {
    margin-bottom: 10px;
  }
  .c-editPage__actions {
    margin-left: 10px;
    margin-right: 10px;
  }
</style>

<template>
  <page>
    <page-header slot="header" title="EDIT">
      <mt-button slot="right">delete</mt-button>
    </page-header>
    <div style="overflow: hidden">
      <div class="c-editPage__form">
        <mt-cell title="Date">2016-12-12</mt-cell>
        <mt-cell title="Period">
          <mt-switch></mt-switch>
        </mt-cell>
        <mt-cell title="Temperature">{{temperature | formatTemperature}}</mt-cell>
        <temperature-picker @change="handleTemperatureChange" :value="temperature"></temperature-picker>
      </div>
      <div class="c-editPage__actions">
        <mt-button class="c-editPage__button" type="primary" size="large">Save</mt-button>
        <mt-button class="c-editPage__button" type="default" size="large" @click.native="handleClickCancel">Cancel</mt-button>
      </div>
    </div>
  </page>
</template>

<script>
  import { Cell, Switch, Button } from 'mint-ui'
  import Page from 'components/common/page/Page.vue'
  import PageHeader from 'components/common/page/PageHeader.vue'
  import TemperaturePicker from 'components/common/temperature/TemperaturePicker.vue'
  import { formatTemperature } from 'filters/filters'

  export default {
    components: {
      [Cell.name]: Cell,
      [Switch.name]: Switch,
      [Button.name]: Button,
      'temperature-picker': TemperaturePicker,
      'page': Page,
      'page-header': PageHeader
    },

    data () {
      return {
        temperature: 36.7
      }
    },

    methods: {
      handleClickCancel () {
        window.history.back()
      },
      handleTemperatureChange (value) {
        this.temperature = value
      }
    },

    filters: {
      formatTemperature
    }
  }
</script>
