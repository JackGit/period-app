<style>
  .c-tempPicker__leftSlot,
  .c-tempPicker__rightSlot,
  .c-tempPicker__dividerSlot {
    background-color: #fff;
  }
</style>

<template>
  <div>
    <mt-picker v-if="temperature !== undefined" :slots="slots" @change="handleValueChange"></mt-picker>
  </div>
</template>

<script>
  import { Picker } from 'mint-ui'
  import { formatTemperature } from 'filters/filters'

  const values0 = ['35', '36', '37', '38', '39', '40', '41', '42']
  const values1 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  export default {
    components: {
      [Picker.name]: Picker
    },

    props: {
      temperature: [Number, String]
    },

    data () {
      return {
        localTemperature: this.temperature,
        slots: [{
          flex: 1,
          values: values0,
          textAlign: 'right',
          className: 'c-tempPicker__leftSlot',
          defaultIndex: 0
        }, {
          divider: true,
          content: '.',
          className: 'c-tempPicker__dividerSlot'
        }, {
          flex: 1,
          values: values1,
          textAlign: 'left',
          className: 'c-tempPicker__rightSlot',
          defaultIndex: 0
        }]
      }
    },

    watch: {
      temperature (value) {
        this.localTemperature = value
      },
      localTemperature (value) {
        this.refreshSlots()
      }
    },

    mounted () {
      this.refreshSlots()
    },

    methods: {
      handleValueChange (picker, values) {
        let temperature = Number(values[0] + '.' + values[1])
        this.$emit('change', temperature)
      },
      refreshSlots () {
        let index0 = values0.indexOf(formatTemperature(this.localTemperature).split('.')[0])
        let index1 = values1.indexOf(formatTemperature(this.localTemperature).split('.')[1])

        this.slots[0].defaultIndex = index0 < 0 ? 0 : index0
        this.slots[2].defaultIndex = index1 < 0 ? 0 : index1
      }
    }
  }
</script>
