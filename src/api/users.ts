import request from '@/utils/request'

type LoginInfoType = {
  phone: string
  code?: string
  password: string
}

type LoginResultType = {
  success: boolean
  state: number
  message: string
  content: string
}

// 用户登录
export const login = (data: LoginInfoType) => {
  const params = new URLSearchParams()
  params.append('phone', data.phone)
  params.append('password', data.password)

  return request<LoginResultType>({
    method: 'POST',
    url: '/api/front/user/login',
    data: params,
  })
}

type UserInfoType = {
  success: boolean
  state: number
  message: string
  content: {
    isUpdatePassword: boolean
    portrait: string
    userName: string
  }
}

export const getUserInfo = () => {
  return request<UserInfoType>({
    method: 'GET',
    url: '/api/front/user/getInfo',
  })
}
