import Vue from 'vue'
import App from './App.vue'
// 导入flexible
import 'amfe-flexible'
// 导入路由
import router from './router'
// 导入vant
import '@/utils/vant'
// 导入公共样式
import '@/style/index.less'
// 导入vuex
import store from '@/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
