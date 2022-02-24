import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from 'axios'

// css样式还是需要全部引入
import 'element-ui/lib/theme-chalk/index.css'
import element from './element/index'

// 大图
import preview from 'vue-preview';

Vue.use(preview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: {
    top: 0,
    bottom: 0
  },
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
})

// import preview from 'vue-photo-preview'
// import 'vue-photo-preview/dist/skin.css'
// let options = {
//   showHideOpacity: true,
//   fullscreenEl: false, //控制是否显示右上角全屏按钮
//   closeEl: false, //控制是否显示右上角关闭按钮
//   tapToClose: true, //点击滑动区域应关闭图库
//   shareEl: false, //控制是否显示分享按钮
//   zoomEl: false, //控制是否显示放大缩小按钮
//   counterEl: false, //控制是否显示左上角图片数量按钮
//   tapToToggleControls: true, //点击应切换控件的可见性
//   clickToCloseNonZoomable: true, //点击图片应关闭图库，仅当图像小于视口的大小时
//   indexIndicatorSep: ' / ' //图片数量的分隔符
// }
// Vue.use(preview, options)
// Vue.use(preview)

// 全局函数
import functions from './utils/globalFunctions.js'

// 防止重复点击
import preventClick from './utils/clickStatefrom'


Vue.use(element)
Vue.use(functions)
Vue.use(preventClick)

Vue.config.productionTip = false

Vue.prototype.$axios = axios

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const type = to.meta.type
  // 判断该路由是否需要登录权限
  if (type === 'login') {
    if (sessionStorage.getItem("token")) {
      next()
    } else {
      next('/')
    }
  } else {
    next() // 确保一定要有next()被调用
  }

  let allowBack = false //    给个默认值true
  if (to.meta.allowBack !== undefined) {
    allowBack = to.meta.allowBack
  }
  if (!allowBack) {
    history.pushState(null, null, location.href)
  }
  store.dispatch('updateAppSetting', { //   updateAppSetting 只是store里面的一个action， 用来改变store里的allowBack的值的，具体怎么改这个值 要根据各位的实际情况而定
    allowBack: allowBack
  })
})

// http 请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求前
  // console.log(location);
  let pathname = location.pathname
  // console.log(pathname);
  if (sessionStorage.getItem('token')) {
    if (pathname !== '#/' && pathname !== '#/login') {
      config.headers.common['token'] = sessionStorage.getItem('token')
    }
  }

  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 这里写清除token的代码
          sessionStorage.setItem("token", null)
          sessionStorage.setItem("role", null)
          console.log(router.currentRoute.fullPath)
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath //登录成功后跳入浏览的当前页面
            }
          })
      }
    }
    return Promise.reject(error.response)
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")