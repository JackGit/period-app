<template>
  <div class="row card-content">
    <div class="row col s12">
      <label>Temperature (&deg;C)</label>
      <input v-model="temperature" type="number">
    </div>
    <div class="row col s12">
      <label>In Period</label>
      <checkbox :items="checkboxItems"></checkbox>
    </div>
    <div class="row col s12" style="text-align:center">
      <btn @click="handleSubmit()">Submit</btn>
    </div>
  </div>
</template>

<script>
  import TextField from 'material-ui-vue/components/forms/text-field.vue';
  import Button from 'material-ui-vue/components/buttons/button.vue';
  import Switch from 'material-ui-vue/components/forms/switch.vue';
  import Checkbox from 'material-ui-vue/components/forms/checkbox.vue';

  export default {
    props: {
      id: {
        type: String,
        default: ''
      },
      temperature: {
        type: String,
        required: true,
        default: 37
      },
      period: {
        type: Boolean,
        required: true,
        default: false
      },
      submit: {
        type: Function
      }
    },

    components: {
      'text-field': TextField,
      'btn': Button,
      'switch': Switch,
      'checkbox': Checkbox
    },

    data: function () {
      return {
        checkboxItems: [{label: 'Period', value: 'period'}]
      };
    },

    methods: {
      handleSubmit: function () {
        Materialize.toast('', 1000);
        this.submit && this.submit(this.temperature * 1, this.period);
      }
    }
  };
</script>
