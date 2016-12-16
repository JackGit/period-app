<style>
  .c-tabIcon {
    border-radius: 50%;
  }
</style>

<template>
  <div>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="today"><span slot="icon" class="c-tabIcon" style="background-color:lightgreen"></span>TODAY</mt-tab-item>
      <mt-tab-item id="week"><span slot="icon" class="c-tabIcon" style="background-color:lightseagreen"></span>WEEK</mt-tab-item>
      <mt-tab-item id="month"><span slot="icon" class="c-tabIcon" style="background-color:lightcoral"></span>MONTH</mt-tab-item>
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
