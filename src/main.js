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

axios.defaults.baseURL = "https://www.liulongbin.top:8888/api/private/v1/"
Vue.prototype.$http = axios
Vue.use(VueRouter)
Vue.use(ElementUi)
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
