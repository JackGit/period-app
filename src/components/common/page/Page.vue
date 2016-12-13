<style>
  .c-page {
    margin-top: 50px;
  }
</style>

<template>
  <div class="c-page">
    <page-header></page-header>
    <slot></slot>
    <page-footer></page-footer>
  </div>
</template>

<script>
  import PageHeader from './PageHeader.vue'
  import PageFooter from './PageFooter.vue'
  export default {
    components: {
      'page-header': PageHeader,
      'page-footer': PageFooter
    }
  }
</script>
