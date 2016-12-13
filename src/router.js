import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'components/pages/Home.vue'
import ShoppingCart from 'components/pages/ShoppingCart.vue'
import Today from 'components/pages/Today.vue'
import Edit from 'components/pages/Edit.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/today',
    name: 'today',
    component: Today
  }, {
    path: '/edit',
    name: 'edit',
    component: Edit
  }, {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'home',
    component: Home
    /*
    component: resolve => {
      require.ensure(['components/post/PostList.vue'], () => {
        resolve(require('components/post/PostList.vue'));
      }, 'post-list');
    }
    */
  }, {
    path: '/shopping',
    name: 'shopping',
    component: ShoppingCart
  }]
})
