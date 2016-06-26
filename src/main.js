import Vue from 'vue';
import VueTouch from 'vue-touch';
import App from './App';
import router from './router.js';

Vue.use(VueTouch);
router.start(App, 'body');
