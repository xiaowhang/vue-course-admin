import { request } from '@/utils'

type ApiResponse<T> = {
  code: string
  data: T
  mesg: string
  time: string
}

export type ParamsType = Partial<{
  id: number
  name: string
  startCreateTime: string
  url: string
  categoryId: number
  endCreateTime: string
  current: number
  size: number
}>

export type ResourceType = {
  current: number
  hitCount?: boolean
  optimizeCountSql?: boolean
  orders?: any[]
  pages: number
  records: {
    categoryId: number
    createdBy: string
    createdTime: string
    description: string
    id: number
    name: string
    operatorId: number
    selected: boolean
    updatedBy: string
    updatedTime: string
    url: string
  }[]
  searchCount?: boolean
  size: number
  total: number
}

export const getResources = (data: ParamsType) => {
  return request<ApiResponse<ResourceType>>({
    method: 'POST',
    url: '/api/boss/resource/getResourcePages',
    data,
  })
}
