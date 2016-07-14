<template>
  <div>
    <card class="z-depth-0">
      <card-content class="row">
        <div class="row col s12">
          <label>Date</label>
          <p>{{date | formatDate}}</p>
        </div>
        <div class="row col s12">
          <label>Temperature (&deg;C)</label>
          <input :value="temp" type="number" @input="handleTempInput">
        </div>
        <div class="row col s12">
          <label>In Period</label>
          <checkbox :items="checkboxItems" :selected.sync="selected"></checkbox>
        </div>
      </card-content>
    </card>
    <div class="row">
      <div class="col s12">
        <btn v-touch:tap="handleSubmit()" class="col s12 teal white-text" large type="flat">Submit</btn>
      </div>
    </div>
    <div class="row">
      <div class="col s12">
        <btn v-touch:tap="cancel" class="col s12 teal-text white"  large type="flat">cancel</btn>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import TextField from 'material-ui-vue/components/forms/text-field.vue';
  import Button from 'material-ui-vue/components/buttons/button.vue';
  import Switch from 'material-ui-vue/components/forms/switch.vue';
  import Checkbox from 'material-ui-vue/components/forms/checkbox.vue';
  import DatePicker from 'material-ui-vue/components/forms/date-picker.vue';
  import Card from 'material-ui-vue/components/cards/card.vue';
  import CardContent from 'material-ui-vue/components/cards/card-content.vue';
  import {
    updateTemperature,
    updatePeriod,
    createTemp,
    updateTemp
  } from 'actions/edit.js';

  export default {
    components: {
      'text-field': TextField,
      'btn': Button,
      'switch': Switch,
      'checkbox': Checkbox,
      'date-picker': DatePicker,
      'card': Card,
      'card-content': CardContent
    },

    data: function () {
      return {
        checkboxItems: [{label: 'Period', value: 'period'}],
        selected: [this.period ? 'period' : '']
      };
    },

    vuex: {
      getters: {
        temp: function (state) {
          return state.edit.temp;
        },
        period: function (state) {
          return state.edit.period;
        },
        date: function (state) {
          return state.edit.date;
        }
      },
      actions: {
        updateTemperature: updateTemperature,
        updatePeriod: updatePeriod,
        createTemp: createTemp,
        updateTemp: updateTemp
      }
    },

    watch: {
      selected: function (value) {
        var inPeriod = value.filter(function (v) {
          return v === 'period';
        }).length > 0;

        this.updatePeriod(inPeriod);
      }
    },

    methods: {
      handleSubmit: function () {
        console.log('submit', this.temp, this.period);
        var t = Number.parseFloat(this.temp);

        if (Number.isNaN(t)) {
          window.Materialize.toast('请输入正确的温度', 1000);
        } else if (t > 45 || t < 34) {
          window.Materialize.toast('请输入合理的温度范围', 1000);
        } else {
          window.Materialize.toast('更新成功', 1000);
        }

        if (this.$route.params.id) {
          this.submitUpdate();
        } else {
          this.submitCreate();
        }
      },
      handleTempInput: function (e) {
        this.updateTemperature(e.target.value);
      },
      submitCreate: function () {
        this.createTemp({
          date: new Date(),
          temperature: Number.parseFloat(this.temp),
          period: this.period
        }, function () {
          window.history.back();
        });
      },
      submitUpdate: function () {
        this.updateTemp(this.$route.params.id, Number.parseFloat(this.temp), this.period, function () {
          window.history.back();
        });
      },
      cancel: function () {
        window.history.back();
      }
    },

    filters: {
      formatDate: function (date) {
        return moment(date).format('YYYY-MM-DD');
      },
      formatTemp: function (value) {
        return value.toFixed(1);
      }
    }
  };
</script>
