import { request } from '@/utils'
import { useAuthStore } from '@/stores'

type ApiResponse<T> = {
  code: string
  data: T
  mesg: string
  time: string
}

export type LoginParamsType = {
  phone: string
  code?: string
  password: string
}

export type LoginInfoType<T> = {
  content: T
  message: string
  state: number
  success: boolean
}

// 用户登录
export const login = (data: LoginParamsType) => {
  return request<LoginInfoType<string>>({
    method: 'POST',
    url: '/api/front/user/login',
    data: {
      phone: data.phone,
      password: data.password,
    },
  })
}

export type AuthInfoType = LoginInfoType<{
  isUpdatePassword: boolean
  portrait: string
  userName: string
}>

// 获取用户信息
export const getUserInfo = () => {
  return request<AuthInfoType>({
    method: 'GET',
    url: '/api/front/user/getInfo',
  })
}

// 退出登录
export const logout = () => {
  return request({
    method: 'POST',
    url: '/api/front/user/logout',
  })
}

// 刷新token
let isRefreshing = false
let requests: Promise<any>
export const refreshToken = () => {
  if (isRefreshing) {
    return requests
  }

  isRefreshing = true
  requests = request<ApiResponse<string>>({
    method: 'POST',
    url: '/api/front/user/refresh_token',
    params: {
      refreshtoken: useAuthStore().token?.refresh_token,
    },
  }).finally(() => {
    isRefreshing = false
  })
  return requests
}
