import axios from 'axios'
import Qs from 'qs'
import store from '../store/index'
import router from '../router/index'

const http = axios.create({
  baseURL: '/apis',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data, headers) {
    headers.token = store.state.token
    if (headers['Content-type'] === 'multipart/form-data') {
      return data
    } else {
      return Qs.stringify(data)
    }
  }]
})
var loadingInstance

// 请求拦截器
http.interceptors.request.use(config => {
  // 开发环境下，如果请求是 post,put,patch,则打印数据体，方便调试
  if (process.env.NODE_ENV === 'development') {
    const { method } = config
    if (method === 'post' || method === 'put' || method === 'patch') {
      console.log(config.data)
    }
  }

  return config
})

// 响应拦截器
http.interceptors.response.use(res => {
  loadingInstance.close()
  console.log(res)
  return res.data
}, error => {
  loadingInstance.close()
  if (error && error.response) {
    console.log(error.response)

    switch (error.response.status) {
      // 401 token失效
      case 401:
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })

        break

      // 403 服务器拒绝访问
      case 403:
        router.push('views/error/403')
        break

      // 404 访问的资源不存在
      // case 404:
      //   router.push('/error/404');
      //   break;

      // 500 服务器错误
      case 500:
        router.push('views/error/500')
        break
    }
    return Promise.reject(error)
  }
})

export default http
