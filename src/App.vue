<style lang="scss">
  $backgroundColor: #efefef;
  body {
    background-color: $backgroundColor;
    font-family: arial;
    margin: 0;
    color: rgba(0,0,0,.87);
  }
</style>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import 'mint-ui/lib/style.css'
  export default {}
</script>
