import Vue from 'vue'
import VueRouter from 'vue-router'
import Today from 'components/pages/Today.vue'
import Week from 'components/pages/Week.vue'
import Month from 'components/pages/Month.vue'
import Edit from 'components/pages/Edit.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/today',
    name: 'today',
    component: Today
  }, {
    path: '/week',
    name: 'week',
    component: Week
  }, {
    path: '/month',
    name: 'month',
    component: Month
  }, {
    path: '/edit',
    name: 'edit',
    component: Edit
  }, {
    path: '/',
    redirect: '/today'
  }]
})
