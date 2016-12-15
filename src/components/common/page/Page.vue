<style>
  .c-page {
    margin-top: 50px;
    margin-bottom: 55px;
  }
</style>

<template>
  <div class="c-page">
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>
  export default {}
</script>
