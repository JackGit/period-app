import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter();

router.map({
  '/today': {
    name: 'today',
    component: function (resolve) {
      require(['components/today/Today.vue'], resolve);
    }
  },
  '/week': {
    name: 'week',
    component: function (resolve) {
      require(['components/week/Week.vue'], resolve);
    }
  },
  '/month': {
    name: 'month',
    component: function (resolve) {
      require(['components/month/Month.vue'], resolve);
    }
  },
  '/edit/:id': {
    name: 'edit',
    component: function (resolve) {
      require(['components/EditPage.vue'], resolve);
    }
  }
});

router.redirect({
  '/': '/today'
});

export default router;
