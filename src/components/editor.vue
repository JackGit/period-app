<template>
  <div class="row">
    <div class="row col s12">
      <text-field label="temperature" :value.sync="temperature"></text-field>
    </div>
    <div class="row col s12">
      <switch right-label="Yes" left-label="No" :value.sync="period"></switch>
    </div>
    <div class="row col s12">
      <btn @click="handleSubmit()" class="right">Submit</btn>
    </div>
  </div>
</template>

<script>
  import TextField from 'material-ui-vue/components/forms/text-field.vue';
  import Button from 'material-ui-vue/components/buttons/button.vue';
  import Switch from 'material-ui-vue/components/forms/switch.vue';

  export default {
    props: {
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
      'switch': Switch
    },

    methods: {
      handleSubmit: function () {
        this.submit && this.submit(this.temperature * 1, this.period);
      }
    }
  };
</script>
