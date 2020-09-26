import Vue from 'vue';
import Router from "vue-router";
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import Users from '@/components/user/Users.vue'
import Rights from '@/components/power/Rights.vue'
import Roles from '@/components/power/Roles.vue'
import Cate from '@/components/goods/Cate.vue'
import Params from '@/components/goods/Params.vue'
import GoodsList from '@/components/goods/List.vue'
import Add from '@/components/goods/Add.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        {path: '/', redirect: '/login'},
        {path: '/login', component: Login},
        {
            path: '/home',
            component: Home,
            redirect: "/welcome",
            children: [
                { path: '/welcome', component: Welcome },
                { path: '/users', component: Users },
                { path: '/rights', component: Rights},
                { path: '/roles', component: Roles},
                { path: '/categories', component: Cate},
                { path: '/params', component: Params},
                { path: '/goods', component: GoodsList},
                { path: '/goods/add', component: Add},
            ]
        },
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
