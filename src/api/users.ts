import { request } from '@/utils'

type ApiResponse<T> = {
  code: string
  data: T
  mesg: string
  time: string
}

export type UserPageParamsType = Partial<{
  currentPage: number
  pageSize: number
  phone: string
  userId: string
  startCreateTime: string
  endCreateTime: string
}>

export type UserPageType = {
  current: number
  hitCount: boolean
  optimizeCountSql: boolean
  orders: []
  pages: number
  records: UserInfoType[]
  searchCount: boolean
  size: number
  total: number
}

export type UserInfoType = {
  accountNonExpired: boolean
  accountNonLocked: boolean
  createTime: string
  credentialsNonExpired: boolean
  id: number
  isDel: boolean
  name: string
  password: string
  phone: string
  portrait: string
  regIp: string | null
  status: string
  updateTime: string
}

export const getUserPages = (data: UserPageParamsType) => {
  return request<ApiResponse<UserPageType>>({
    method: 'POST',
    url: '/api/boss/user/getUserPages',
    data,
  })
}

export const enableUser = (userId: number) => {
  return request<ApiResponse<boolean>>({
    method: 'GET',
    url: '/api/boss/user/enableUser',
    params: { userId },
  })
}

export const forbidUser = (data: number) => {
  return request<ApiResponse<boolean>>({
    method: 'POST',
    url: '/api/boss/user/forbidUser',
    data,
  })
}
