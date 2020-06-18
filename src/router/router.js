import Vue from 'vue';
import Router from "vue-router";
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        {path: '/', redirect: '/login'},
        {path: '/login', component: Login},
        {path: '/home', component: Home}
    ]
})

router.beforeEach((to, form, next) => {
    // to: Route: 即将要进入的目标 路由对象
    // from: Route: 当前导航正要离开的路由
    // next 是一个函数 ，表示放行
    // next() 放行   next('/login') 强制跳转
    if (to.path === '/login') return next()
    //获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})

export default router