<style>
  .c-tempPicker__leftSlot,
  .c-tempPicker__rightSlot,
  .c-tempPicker__dividerSlot {
    background-color: #fff;
  }
</style>

<template>
  <div>
    <mt-picker :slots="slots"></mt-picker>
  </div>
</template>

<script>
  import { Picker } from 'mint-ui'

  export default {
    components: {
      [Picker.name]: Picker
    },

    data () {
      return {
        slots: [{
          flex: 1,
          values: ['35', '36', '37', '38', '39', '40', '41', '42'],
          textAlign: 'right',
          className: 'c-tempPicker__leftSlot'
        }, {
          divider: true,
          content: '.',
          className: 'c-tempPicker__dividerSlot'
        }, {
          flex: 1,
          values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
          textAlign: 'left',
          className: 'c-tempPicker__rightSlot'
        }]
      }
    }
  }
</script>
