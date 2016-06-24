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
</style>

<template>
  <collection style="border: none">
    <collection-item v-for="item in data" style="padding: 15px 20px;" transition="slide" stagger="300">
      <div>
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

    filters: {
      dateFormat: function (value) {
        return moment(value).format('YYYY-MM-DD');
      },
      tempFormat: function (value) {
        return value.toFixed(1);
      }
    }
  };
</script>
