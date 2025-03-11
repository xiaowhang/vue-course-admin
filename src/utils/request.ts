import axios from 'axios'
import { useAuthStore } from '@/stores'

const request = axios.create({
  timeout: 5000,
})

request.interceptors.request.use((config) => {
  // 在请求头中添加token
  const authStore = useAuthStore()
  config.headers['Authorization'] = authStore.token.access_token

  return config
})

export default request
