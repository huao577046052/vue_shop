import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//全局样式
import './assets/css/global.css'
//
import axios from 'axios'

axios.defaults.baseURL = "http://timemeetyou.com:8889/api/private/v1/"
axios.interceptors.request.use( config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    //在最后必须 return config
    return config
})
Vue.prototype.$http = axios
Vue.use(VueRouter)
Vue.use(ElementUi)
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
