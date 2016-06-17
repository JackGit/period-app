import Vue from 'vue';
import VueRouter from 'vue-router';
import Today from 'components/today.vue';
import Week from 'components/week.vue';
import Month from 'components/month.vue';

Vue.use(VueRouter);

const router = new VueRouter();

router.map({
  '/today': {
    name: 'today',
    component: Today
  },
  '/week': {
    name: 'week',
    component: Week
  },
  '/month': {
    name: 'month',
    component: Month
  }
});

export default router;
