<style>
  .c-tempPicker__leftSlot,
  .c-tempPicker__rightSlot,
  .c-tempPicker__dividerSlot {
    background-color: #fff;
  }
</style>

<template>
  <div>
    <mt-picker :slots="slots" @change="handleValueChange"></mt-picker>
  </div>
</template>

<script>
  import { Picker } from 'mint-ui'
  import { formatTemperature } from 'filters/filters'

  export default {
    components: {
      [Picker.name]: Picker
    },

    props: {
      value: {
        type: [Number, String],
        default: 36.4
      }
    },

    data () {
      const values0 = ['35', '36', '37', '38', '39', '40', '41', '42']
      const values1 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      let index0 = values0.indexOf(formatTemperature(this.value).split('.')[0])
      let index1 = values1.indexOf(formatTemperature(this.value).split('.')[1])

      return {
        slots: [{
          flex: 1,
          values: values0,
          textAlign: 'right',
          className: 'c-tempPicker__leftSlot',
          defaultIndex: index0
        }, {
          divider: true,
          content: '.',
          className: 'c-tempPicker__dividerSlot'
        }, {
          flex: 1,
          values: values1,
          textAlign: 'left',
          className: 'c-tempPicker__rightSlot',
          defaultIndex: index1
        }]
      }
    },

    methods: {
      handleValueChange (picker, values) {
        let temperature = Number(values[0] + '.' + values[1])
        this.$emit('change', temperature)
      }
    }
  }
</script>
