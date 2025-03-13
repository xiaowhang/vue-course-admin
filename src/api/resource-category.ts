import { request } from '@/utils'

type ApiResponse<T> = {
  code: string
  data: T
  mesg: string
  time: string
}

export type ResourceCategoryType = {
  createdBy: string
  createdTime: string
  id: number
  name: string
  operatorId: number | null
  selected: boolean
  sort: number
  updatedBy: string
  updatedTime: string
}

export const getResourceCategories = () => {
  return request<ApiResponse<ResourceCategoryType[]>>({
    method: 'GET',
    url: '/api/boss/resource/category/getAll',
  })
}

type ResourceCategoryParamsType = Pick<ResourceCategoryType, 'name' | 'sort'> & {
  id?: number
}

export const saveResourceCategory = (data: ResourceCategoryParamsType) => {
  return request<ApiResponse<boolean>>({
    method: 'POST',
    url: '/api/boss/resource/category/saveOrderUpdate',
    data,
  })
}
