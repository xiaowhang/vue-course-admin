import { request } from '@/utils'
import { useAuthStore } from '@/stores'

type ApiResponse<T> = {
  code: string
  data: T
  mesg: string
  time: string
}

export type LoginInfoType = {
  phone: string
  code?: string
  password: string
}

// 用户登录
export const login = (data: LoginInfoType) => {
  const params = new URLSearchParams()
  params.append('phone', data.phone)
  params.append('password', data.password)

  return request<ApiResponse<string>>({
    method: 'POST',
    url: '/api/front/user/login',
    data: params,
  })
}

export type UserInfoType = ApiResponse<{
  isUpdatePassword: boolean
  portrait: string
  userName: string
}>

// 获取用户信息
export const getUserInfo = () => {
  return request<UserInfoType>({
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
