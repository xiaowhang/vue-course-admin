import axios from 'axios'
import { useAuthStore } from '@/stores'
import { refreshToken } from '@/api'
import router from '@/router'

const request = axios.create({
  timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 在请求头中添加token
  const authStore = useAuthStore()
  config.headers['Authorization'] = authStore.token?.access_token

  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error

    // 处理 401 且不是刷新 token 的请求
    if (response.status === 401 && !config?.url.includes('refresh_token')) {
      const { data } = await refreshToken()
      if (data.success) {
        const authStore = useAuthStore()
        authStore.setToken(data.content)
        return request(config)
      } else {
        ElMessage.error('登录已过期，请重新登录')
        router.push({ name: 'login' })
      }
    }
    return Promise.reject(error)
  },
)

export default request
