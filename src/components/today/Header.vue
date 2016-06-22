<template>
  <navbar logo="today" log-href='#!' logo-position="center">
  </navbar>
</template>

<script>
  import Navbar from 'material-ui-vue/components/navbar/navbar.vue';
  import NavItem from 'material-ui-vue/components/navbar/nav-item.vue';
  import Icon from 'material-ui-vue/components/icons/icon.vue';

  export default {
    components: {
      'navbar': Navbar,
      'nav-item': NavItem,
      'icon': Icon
    }
  };
</script>
