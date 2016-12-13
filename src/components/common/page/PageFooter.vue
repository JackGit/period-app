<template>
  <div>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="1"><img slot="icon">TODAY</mt-tab-item>
      <mt-tab-item id="2"><img slot="icon">WEEK</mt-tab-item>
      <mt-tab-item id="3"><img slot="icon">MONTH</mt-tab-item>
    </mt-tabbar>
  </div>

</template>

<script>
  import { TabItem, Tabbar } from 'mint-ui'
  export default {
    components: {
      [Tabbar.name]: Tabbar,
      [TabItem.name]: TabItem
    },

    data () {
      return {
        selected: '1'
      }
    }
  }
</script>
