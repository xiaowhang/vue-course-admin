import { request } from '@/utils'

type ApiResponse<T> = {
  code: string
  data: T
  mesg: string
  time: string
}

export type getRolePagesParamsType = Partial<{
  code: string
  id: number
  name: string
  startCreateTime: string
  endCreateTime: string
  size: number
  current: number
}>

export type RoleType = {
  code: string
  createdBy: string
  createdTime: string
  description: string
  id: number
  name: string
  operatorId: number | null
  updatedBy: string
  updatedTime: string
}

export type RolePaginationType = {
  current: number
  hitCount?: boolean
  optimizeCountSql?: boolean
  orders?: any[]
  pages: number
  records: RoleType[]
  searchCount?: boolean
  size: number
  total: number
}

export const getRolePages = (data: getRolePagesParamsType) => {
  return request<ApiResponse<RolePaginationType>>({
    method: 'POST',
    url: '/api/boss/role/getRolePages',
    data,
  })
}

export type roleFormType = Partial<Pick<RoleType, 'code' | 'name'>> & {
  id?: number
  description?: string
}

export const saveRole = (data: roleFormType) => {
  return request<ApiResponse<boolean>>({
    method: 'POST',
    url: '/api/boss/role/saveOrUpdate',
    data,
  })
}

export const deleteRole = (id: number) => {
  return request<ApiResponse<boolean>>({
    method: 'DELETE',
    url: `/api/boss/role/${id}`,
  })
}

export type roleMenuItemType = {
  createdBy: string
  createdTime: string
  description: string
  href: string
  icon: string
  id: number
  level: number
  name: string
  operatorId: number
  orderNum: number
  parentId: number
  selected: boolean
  shown: boolean
  subMenuList: roleMenuItemType[]
  updatedBy: string
  updatedTime: string
}

export const getRoleMenus = (roleId: number) => {
  return request<ApiResponse<roleMenuItemType[]>>({
    method: 'GET',
    url: '/api/boss/menu/getRoleMenus',
    params: {
      roleId,
    },
  })
}
