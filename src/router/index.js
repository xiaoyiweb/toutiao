import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 导入页面组件
import login from '@/views/login'

const routes = [
  {name:login,path:'/login',component:login}
]

const router = new VueRouter({
  routes
})

export default router
