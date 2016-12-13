<style>
  .c-editPage__form, .c-editPage__actions {
    margin-bottom: 20px;
  }
  .c-editPage__button {
    margin-bottom: 10px;
  }
</style>

<template>
  <page>
    <div class="c-editPage__form">
      <mt-cell title="Date">2016-12-12</mt-cell>
      <mt-cell title="Period">
        <mt-switch></mt-switch>
      </mt-cell>
      <mt-cell title="Temperature">36.6</mt-cell>
      <temperature-picker></temperature-picker>
      <mt-datetime-picker type="date" ref="picker"></mt-datetime-picker>
    </div>
    <div class="c-editPage__actions">
      <mt-button class="c-editPage__button" type="primary" size="large">Save</mt-button>
      <mt-button class="c-editPage__button" type="default" size="large">Cancel</mt-button>
      <mt-button class="c-editPage__button" type="danger" size="large">Delete</mt-button>
    </div>
  </page>
</template>

<script>
  import { Cell, Switch, DatetimePicker, Button } from 'mint-ui'
  import Page from 'components/common/page/Page.vue'
  import TemperaturePicker from 'components/common/temperature/TemperaturePicker.vue'

  export default {
    components: {
      [Cell.name]: Cell,
      [Switch.name]: Switch,
      [DatetimePicker.name]: DatetimePicker,
      [Button.name]: Button,
      'temperature-picker': TemperaturePicker,
      'page': Page
    },

    mounted () {
      this.$refs.picker.open()
    }
  }
</script>
