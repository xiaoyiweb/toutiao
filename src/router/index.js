import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { Toast } from 'vant'
Vue.use(Toast)
Vue.use(VueRouter)

// 导入页面组件
import login from '@/views/login'
import layout from '@/views/layout'
import ask from '@/views/ask'
import home from '@/views/home'
import my from '@/views/my'
import video from '@/views/video'
import edit from '@/views/my/edit'

const routes = [
  { path: '', redirect: '/login' },
  { name: 'login', path: '/login', component: login },
  {
    name: 'layout', path: '/layout', component: layout, children: [
      { name: 'ask', path: 'ask', component: ask },
      { name: 'home', path: 'home', component: home },
      { name: 'my', path: 'my', component: my, meta: { needLogin: true } },
      { name: 'video', path: 'video', component: video }
    ]
  },
  { name: 'edit', path: '/my/edit', component: edit, meta: { needLogin: true } },
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
