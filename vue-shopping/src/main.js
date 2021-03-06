// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll';
import axios from 'axios';

// import './assets/css/base.css'
// import './assets/css/checkout.css'
// import './assets/css/product.css'

Vue.config.productionTip = false;

Vue.use(vueLazyLoad);
Vue.use(infiniteScroll);

Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
});
