<template>
  <mt-header fixed :title="title">
    <span slot="left"><slot name="left"></slot></span>
    <span slot="right"><slot name="right"></slot></span>
  </mt-header>
</template>

<script>
  import { Header } from 'mint-ui'
  export default {
    components: {
      [Header.name]: Header
    },

    props: {
      title: String
    }
  }
</script>
