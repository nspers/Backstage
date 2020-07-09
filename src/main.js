"use strict";

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview'
import router from './router'
import VueForm from 'vue-form'
import store from './store'
import api from './config'

import 'iview/dist/styles/iview.css'
import './assets/css/reset.css'
import './assets/css/components.scss'

import common from './assets/js/common.js';
import Validate from './assets/js/validate.js';

Vue.prototype.$Common = common;
Vue.prototype.$Validate = Validate;
Vue.prototype.$api = api
Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(api)
Vue.use(iView)
Vue.use(VueForm)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  iView,
  store,
  VueForm,
  components: { App },
  template: '<App/>'

}).$mount('#app')
