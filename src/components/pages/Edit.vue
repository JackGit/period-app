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
  .c-editPopup {
    z-index: 10;
    width: 100%;
    height: 100%;
  }
</style>

<template>
  <mt-popup position="right" class="c-editPopup" v-model="visible">
    <page>
      <page-header slot="header" title="EDIT">
        <mt-button slot="right" v-show="id" @click.native="handleClickDelete">delete</mt-button>
      </page-header>
      <div style="overflow: hidden">
        <div class="c-editPage__form">
          <mt-cell title="Date">{{date | YYYY_MM_DD}}</mt-cell>
          <mt-cell title="Period">
            <mt-switch v-model="localPeriod" @change="handleChangeSwitch"></mt-switch>
          </mt-cell>
          <mt-cell title="Temperature">{{localTemperature | formatTemperature}}</mt-cell>
          <temperature-picker :temperature="localTemperature" @change="handleTemperatureChange"></temperature-picker>
        </div>
        <div class="c-editPage__actions">
          <mt-button class="c-editPage__button" type="primary" size="large" @click.native="handleClickSave">Save</mt-button>
          <mt-button class="c-editPage__button" type="default" size="large" @click.native="handleClickCancel">Cancel</mt-button>
        </div>
      </div>
    </page>
  </mt-popup>
</template>

<script>
  import API from 'api'
  import { Cell, Switch, Button, Popup, Indicator } from 'mint-ui'
  import Page from 'components/common/page/Page.vue'
  import PageHeader from 'components/common/page/PageHeader.vue'
  import TemperaturePicker from 'components/common/temperature/TemperaturePicker.vue'
  import { formatTemperature, YYYY_MM_DD } from 'filters/filters'

  export default {
    components: {
      [Popup.name]: Popup,
      [Cell.name]: Cell,
      [Switch.name]: Switch,
      [Button.name]: Button,
      'temperature-picker': TemperaturePicker,
      'page': Page,
      'page-header': PageHeader
    },

    props: {
      temperature: [Number, String],
      period: Boolean,
      date: Date,
      id: String,
      show: Boolean
    },

    data () {
      return {
        visible: false,
        localTemperature: this.temperature,
        localPeriod: this.period
      }
    },

    watch: {
      show (value) {
        this.visible = value
      },
      temperature (value) {
        this.localTemperature = value
      },
      period (value) {
        this.localPeriod = value
      }
    },

    methods: {
      closePopup () {
        this.visible = false
        this.$emit('close')
      },
      handleClickSave () {
        Indicator.open()
        if (this.id) {
          console.log('tring to update', this.id)
          API.Temperature.updateTemp({
            id: this.id,
            temperature: this.localTemperature * 1,
            period: this.localPeriod
          }).then(result => {
            console.log('updated', this.id)
            this.$emit('done', {
              id: result.id,
              temperature: result.get('temperature'),
              period: result.get('period'),
              date: result.get('date'),
              dateString: result.get('dateString'),
              updatedAt: result.updatedAt
            })
            Indicator.close()
            this.closePopup()
          })
        } else {
          console.log('tring to create', this.date)
          API.Temperature.createTemp({
            temperature: this.localTemperature * 1,
            period: this.localPeriod,
            date: this.date
          }).then(result => {
            console.log('created', this.date, result.id)
            this.$emit('done', {
              id: result.id,
              temperature: result.get('temperature'),
              period: result.get('period'),
              date: result.get('date'),
              dateString: result.get('dateString'),
              updatedAt: result.updatedAt
            })
            Indicator.close()
            this.closePopup()
          })
        }
      },
      handleClickCancel () {
        this.closePopup()
      },
      handleTemperatureChange (value) {
        this.localTemperature = value
      },
      handleChangeSwitch (checked) {
        this.localPeriod = checked
      },
      handleClickDelete () {
        console.log('trying to delete', this.id)
        Indicator.open()
        API.Temperature.deleteTemp(this.id).then(() => {
          console.log('deleted', this.id)
          this.$emit('delete', this.id)
          Indicator.close()
          this.closePopup()
        })
      }
    },

    filters: {
      formatTemperature,
      YYYY_MM_DD
    }
  }
</script>
