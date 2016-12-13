<template>
  <div>
    <mt-header fixed title="TODAY"></mt-header>
    <h1>home page</h1>
    <div>
      <router-link to="/shopping">Go To ShoppingCart</router-link>
      <mt-button type="primary">This is my button</mt-button>
    </div>
  </div>
</template>

<script>
  import { Button, Header } from 'mint-ui'
  export default {
    components: {
      [Button.name]: Button,
      [Header.name]: Header
    }
  }
</script>
