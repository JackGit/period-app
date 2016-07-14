import Vue from 'vue';
import Vuex from 'vuex';
import today from './modules/today.js';
import week from './modules/week.js';
import month from './modules/month.js';
import edit from './modules/edit.js';

Vue.use(Vuex);

export default window.store = new Vuex.Store({
  modules: {
    today,
    week,
    month,
    edit
  }
});
