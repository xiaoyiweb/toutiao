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


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
