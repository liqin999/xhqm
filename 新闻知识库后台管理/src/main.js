// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import "./assets/css/reset.css"
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import $api from './server/server.js'
// 全局公共函数
import $Fn from './utils/public'

Vue.prototype.$Fn = $Fn;

Vue.prototype.$api = $api;
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
