
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import store from '@/store/store.js' 

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app
  }
}

// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'


uni.$http = $http

// 请求的根路径
$http.baseUrl = 'https://www.uinav.com'

// 请求拦截器
$http.beforeRequest = function(opt) {
	uni.showLoading({
		title: '数据加载中...'
	})
}

// 响应拦截器
$http.afterRequest = function() {
	uni.hideLoading()
}

// 弹框
uni.$show_msg = function(title, duration = 1500) {
	uni.showToast({
		title, 
		duration,
		icon: 'none'
	})
}

uni.$show_fail_msg = function() {
	uni.$show_msg('数据请求失败')
}

uni.$show_succeed_msg = function() {
	uni.$show_msg('数据请求成功')
}

// #endif