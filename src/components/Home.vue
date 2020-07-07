<template>
    <el-container class="home-container">
        <el-header>
            <div>
                <img src="../assets/heima.jpg" alt="">
                <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!--  页面主题区域  -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 侧边栏菜单区域 -->
                <el-menu unique-opened :default-active="activePath" :collapse="isCollapse" :collapse-transition="false" router background-color="#333744" text-color="#fff" active-text-color="#409eff">
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id + '' " v-for="item in menulsit" :key="item.id">
                        <!-- 一级菜单的模板区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="iconsObj[item.id]"></i>
                            <!-- 文本 -->
                            <span>{{ item.authName }}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index=" '/' + subitme.path" v-for="subitme in item.children" :key="subitme.id" @click="saveNavState('/' + subitme.path)">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>{{ subitme.authName }}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>

                </el-menu>
            </el-aside>
            <!-- 右侧内容主题 -->
            <el-main>
                <!-- 路由展位费 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Home",
        data(){
            return {
                // 左菜单数据
                menulsit: [],
                iconsObj: {
                    '125': 'el-icon-user',
                    '103': 'el-icon-box',
                    '101': 'el-icon-shopping-bag-2',
                    '102': 'el-icon-tickets',
                    '145': 'el-icon-s-platform',
                },
                // 是否折叠
                isCollapse: false,
                //被激活的链接地址
                activePath: ''
            };
        },
        created() {
            this.getMenuList()
            this.activePath = window.sessionStorage.getItem('activePath')
        },
        methods: {
            logout() {
                window.sessionStorage.clear()
                this.$router.push('/login')
            },
            //获取所有菜单
            async getMenuList(){
                const { data:res } = await this.$http.get('menus')
                if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
                this.menulsit = res.data
            },
            // 点击按钮 切换菜单的折叠与展开
            toggleCollapse() {
                this.isCollapse = !this.isCollapse
            },
            //保存链接的激活状态
            saveNavState(activePath){
                window.sessionStorage.setItem('activePath',activePath)
                this.activePath = activePath
            }
        }
    }
</script>

<style lang="less" scoped>
    .home-container {
        height: 100%;
    }
    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        padding-left: 10px;
        color: #fff;
        font-size: 20px;

        > div {
            display: flex;
            align-items: center;

            span {
                margin-left: 15px;
            }
        }
        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }

    .el-aside {
        background-color: #333744;
        .el-menu{
            border-right: none;
        }
    }
    .el-main {
        background-color: #edeaf1;
    }
    .toggle-button {
        background-color: #4A5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
</style>
