<template>
  <navbar :logo="$route.name | uppercase " logo-href='javascript:void(0)' logo-position="center" :auto-hide="false">
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
