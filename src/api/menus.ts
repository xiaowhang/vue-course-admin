import request from '@/utils/request'

type ApiResponse<T> = {
  code: string
  data: T
  mesg: string
  time: string
}

export type MenuType = {
  createdBy: string
  createdTime: string
  description: string
  href: string
  icon: string
  id: number
  level: number
  name: string
  operatorId: number | null
  orderNum: number
  parentId: number
  shown: boolean
  updatedBy: string
  updatedTime: string
}

export const getAllMenus = () => {
  return request<ApiResponse<MenuType[]>>({
    method: 'GET',
    url: '/api/boss/menu/getAll',
  })
}
