import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import error from '../views/error/index'
// import { setTitle } from 'src/assets/js/util'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'HelloWorld', component: HelloWorld },
    { path: '/error/404', name: '404', code: '404', component: error }
  ]
})

router.beforeEach((to, form, next) => { // to: Route: 即将要进入的目标 路由对象 , from: Route: 当前导航正要离开的路由
  // 设置window.document.title 的名称
  // setTitle(to.meta.title)
  if (!to.matched.length) { // 是否能找到页面
    next({ // 将要进行的钩子
      path: '/error/404',
      replace: true
    })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  // 解决某些情况下loading无法关闭的情况

})

export default router
