<style>
  footer .tabs {
    background-color: #e8e8e8;
  }
</style>

<template>
  <footer>
    <tabs>
      <tab v-for="tab in tabs" :label="tab" :active="$route.name === tab" @click="handleClickTab(tab)">
      </tab>
    </tabs>
  </footer>
</template>

<script>
  import Tab from 'material-ui-vue/components/tabs/tab.vue';
  import Tabs from 'material-ui-vue/components/tabs/tabs.vue';

  export default {
    components: {
      'tabs': Tabs,
      'tab': Tab
    },

    data: function () {
      return {
        tabs: ['today', 'week', 'month']
      };
    },

    methods: {
      handleClickTab: function (tab) {
        this.$router.go({name: tab});
      }
    }
  };
</script>
