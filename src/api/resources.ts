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
}

export type PaginationType = {
  current: number
  hitCount?: boolean
  optimizeCountSql?: boolean
  orders?: any[]
  pages: number
  records: ResourceType[]
  searchCount?: boolean
  size: number
  total: number
}

export const getResources = (data: ParamsType) => {
  return request<ApiResponse<PaginationType>>({
    method: 'POST',
    url: '/api/boss/resource/getResourcePages',
    data,
  })
}

export type ResourceFormType = Partial<
  Pick<ResourceType, 'id' | 'categoryId' | 'description' | 'name' | 'url'>
>

export const saveResource = (data: ResourceFormType) => {
  return request<ApiResponse<boolean>>({
    method: 'POST',
    url: '/api/boss/resource/saveOrUpdate',
    data,
  })
}

export const deleteResource = (id: number) => {
  return request<ApiResponse<boolean>>({
    method: 'DELETE',
    url: `/api/boss/resource/${id}`,
  })
}

export const getResourcesById = (id: number) => {
  return request<ApiResponse<ResourceType>>({
    method: 'GET',
    url: `/api/boss/resource/${id}`,
  })
}
