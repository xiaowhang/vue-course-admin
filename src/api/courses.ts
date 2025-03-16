import { request } from '@/utils'

type ApiResponse<T> = {
  code: string
  data: T
  mesg: string
  time: string
}

export type CoursePageParamsType = {
  currentPage: number
  pageSize: number
  courseName?: string
  status?: string
}

export type CoursePageType = {
  current: number
  pages: number
  records: CourseInfoType[]
  size: number
  total: number
}

export type CourseInfoType = {
  courseName: string
  id: number
  price: string
  sortNum: number
  status: string
}

export function getCoursesPages(data: CoursePageParamsType) {
  return request<ApiResponse<CoursePageType>>({
    method: 'POST',
    url: '/api/boss/course/getQueryCourses',
    data,
  })
}

export function changeStatu(courseId: number, status: number) {
  return request<ApiResponse<null>>({
    method: 'GET',
    url: '/api/boss/course/changeState',
    params: { courseId, status },
  })
}
