import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//全局样式
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'

//导入富文本
import VueQuillEditor from 'vue-quill-editor'
//导入富文本的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import axios from 'axios'

axios.defaults.baseURL = "http://www.ysqorz.top:8888/api/private/v1/"
//Axios请求拦截器，请求头
axios.interceptors.request.use( config => {
    // console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
    //在最后必须 return config
    return config
})
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(VueRouter)
Vue.use(ElementUi)
Vue.use(VueQuillEditor)

Vue.component('tree-table',TreeTable)
Vue.filter('dateFormat',function (originVal) {
    const dt = new Date(originVal*1000)

    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2,'0')
    const d = (dt.getDate() + '').padStart(2,'0')

    const hh = (dt.getHours() + '').padStart(2,'0')
    const mm = (dt.getMinutes() + '').padStart(2,'0')
    const ss = (dt.getSeconds() + '').padStart(2,'0')

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
