<template>
  <div>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="today"><img slot="icon">TODAY</mt-tab-item>
      <mt-tab-item id="week"><img slot="icon">WEEK</mt-tab-item>
      <mt-tab-item id="month"><img slot="icon">MONTH</mt-tab-item>
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

    props: {
      active: String
    },

    data () {
      return {
        selected: this.active
      }
    },

    watch: {
      selected (value) {
        this.$router.push({name: value})
      }
    }
  }
</script>
