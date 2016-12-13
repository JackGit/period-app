<template>
  <div>
    <mt-cell title="2016-12-12">
      <mt-badge color="#888">36.5</mt-badge>
    </mt-cell>
    <mt-cell title="2016-12-12" value="36.6"></mt-cell>
    <mt-cell title="2016-12-12" value="36.6"></mt-cell>
    <mt-cell title="2016-12-12" value="36.6"></mt-cell>
  </div>
</template>

<script>
  import { Cell, Badge } from 'mint-ui'

  export default {
    components: {
      [Badge.name]: Badge,
      [Cell.name]: Cell
    }
  }
</script>
