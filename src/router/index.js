import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { Toast } from 'vant'
Vue.use(Toast)
Vue.use(VueRouter)

// 导入页面组件
const login = () => import('@/views/login')
const layout = () => import('@/views/layout')
const ask = () => import('@/views/ask')
const home = () => import('@/views/home')
const my = () => import('@/views/my')
const video = () => import('@/views/video')
const edit = () => import('@/views/my/edit')
const detail = () => import('@/views/detail')
const search = () => import('@/views/search')
const result = () => import('@/views/search/result')
const xiaozhi = () => import('@/views/my/xiaozhi')

const routes = [
  { path: '', redirect: '/login' },
  { name: 'login', path: '/login', component: login },
  {
    name: 'layout', path: '/layout', component: layout, children: [
      { name: 'ask', path: 'ask', component: ask },
      { name: 'home', path: 'home', component: home, meta: { needKeep: true } },
      { name: 'my', path: 'my', component: my, meta: { needLogin: true } },
      { name: 'video', path: 'video', component: video }
    ]
  },
  { name: 'edit', path: '/my/edit', component: edit, meta: { needLogin: true } },
  { name: 'detail', path: '/home/detail', component: detail },
  { name: 'search', path: '/home/search', component: search },
  { name: 'result', path: '/search/result', component: result },
  { name: 'xiaozhi', path: '/my/xiaozhi', component: xiaozhi },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  const needLogin = to.meta.needLogin
  if (needLogin) {
    const token = store.state.token.token
    if (token) {
      next()
    } else {
      Toast.fail('您还未登录')
      next(`/login?url=${to.path}`)
    }
  } else {
    next()
  }

})

export default router
