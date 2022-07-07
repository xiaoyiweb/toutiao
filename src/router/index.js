import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 导入页面组件
import login from '@/views/login'
import layout from '@/views/layout'
import ask from '@/views/ask'
import home from '@/views/home'
import my from '@/views/my'
import video from '@/views/video'


const routes = [
  { path: '', redirect: '/login' },
  { name: 'login', path: '/login', component: login },
  {
    name: 'layout', path: '/layout', component: layout, children: [
      { name: 'ask', path: 'ask', component: ask },
      { name: 'home', path: 'home', component: home },
      { name: 'my', path: 'my', component: my },
      { name: 'video', path: 'video', component: video }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
