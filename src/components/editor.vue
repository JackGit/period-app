<template>
  <div>
    <h4>value: {{value}}</h4>
    <text-field></text-field>
    <div>
      <btn>submit</btn>
    </div>
  </div>
</template>

<script>
  import TextField from 'material-ui-vue/components/forms/text-field.vue';
  import Button from 'material-ui-vue/components/buttons/button.vue';

  export default {
    props: {
      value: {
        type: Number,
        required: true,
        default: 37
      }
    },

    components: {
      'text-field': TextField,
      'btn': Button
    }
  };
</script>
