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

export type saveMenuParams = Pick<
  MenuType,
  'parentId' | 'name' | 'href' | 'icon' | 'orderNum' | 'description' | 'shown'
> & { id?: number }

export const saveMenu = (data: saveMenuParams) => {
  return request<ApiResponse<boolean>>({
    method: 'POST',
    url: '/api/boss/menu/saveOrUpdate',
    data,
  })
}

export const deleteMenu = (id: number) => {
  return request<ApiResponse<boolean>>({
    method: 'DELETE',
    url: `/api/boss/menu/${id}`,
  })
}
