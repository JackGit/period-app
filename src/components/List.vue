<style>
    .slide-transition {
      transition: all .3s ease;
      transform: translateY(0);
      opacity: 1;
    }
    .slide-enter, .slide-leave {
      transform: translateY(-20%);
      opacity: 0;
    }
    li.collection-item:active {
      background: #f7f7f7;
    }
</style>

<template>
  <collection style="border: none">
    <collection-item v-for="item in data" style="padding: 15px 20px;">
      <div v-touch:tap="edit(item)">
        {{item.date | dateFormat}}
        <span v-if="item.period" class="secondary-content red light-2 white-text">{{item.temperature | tempFormat}} &deg;C</span>
        <span v-else class="secondary-content">{{item.temperature | tempFormat}} &deg;C</span>
      </div>
    </collection-item>
  </collection>
</template>

<script>
  import Collection from 'material-ui-vue/components/collections/collection.vue';
  import CollectionItem from 'material-ui-vue/components/collections/collection-item.vue';
  import moment from 'moment';
  import {
    updateTemperature,
    updatePeriod,
    updateDate
  } from 'actions/edit.js';

  export default {
    components: {
      'collection': Collection,
      'collection-item': CollectionItem
    },

    props: {
      data: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },

    vuex: {
      actions: {
        updateTemperature: updateTemperature,
        updatePeriod: updatePeriod,
        updateDate: updateDate
      }
    },

    filters: {
      dateFormat: function (value) {
        return moment(value).format('YYYY-MM-DD');
      },
      tempFormat: function (value) {
        return value.toFixed(1);
      }
    },

    methods: {
      edit: function (temp) {
        this.updateTemperature(temp.temperature);
        this.updatePeriod(temp.period);
        this.updateDate(temp.date);
        this.$router.go({name: 'edit', params: {id: temp.id}});
      }
    }
  };
</script>
