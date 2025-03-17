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

export const getCoursesPages = (data: CoursePageParamsType) => {
  return request<ApiResponse<CoursePageType>>({
    method: 'POST',
    url: '/api/boss/course/getQueryCourses',
    data,
  })
}

export const changeStatu = (courseId: number, status: number) => {
  return request<ApiResponse<null>>({
    method: 'GET',
    url: '/api/boss/course/changeState',
    params: { courseId, status },
  })
}

export type CourseDetailType = {
  // 课程基本信息
  courseName: string
  brief: string
  teacherDTO: teacherDTOType
  previewFirstField: string
  previewSecondField: string
  sortNum: number

  // 课程封面
  courseListImg: string
  courseImgUrl: string

  // 销售信息
  discounts: number
  price: number
  sales: number
  discountsTag: string

  // 秒杀活动
  activityCourse: boolean
  activityCourseDTO: activityCourseDTOType

  // 课程详情
  courseDescriptionMarkDown: string
  status: number
}

export type teacherDTOType = {
  teacherName: string
  position: string
  description: string
}

export type activityCourseDTOType = {
  beginTime: string
  endTime: string
  amount: number
  stock: number
}

export const saveCourse = (data: CourseDetailType) => {
  return request<ApiResponse<boolean>>({
    method: 'POST',
    url: '/api/boss/course/saveOrUpdateCourse',
    data,
  })
}

export const getCourseDetail = (courseId: number) => {
  return request<ApiResponse<CourseDetailType>>({
    method: 'GET',
    url: '/api/boss/course/getCourseById',
    params: { courseId },
  })
}

export type SectionType = {
  courseId: number
  createTime: string
  description: string
  id: number
  isDe: boolean
  isVisible: boolean
  lastOperatorId: number | null
  lessonDTOS: lessonDTOType[]
  orderNum: number
  sectionName: string
  status: number
  updateTime: string
}

export type lessonDTOType = {
  courseId: number
  duration: number
  durationNum: number
  fileId: number
  id: number
  isFree: boolean
  isTimingPublish: boolean
  orderNum: number
  publishTime: string
  sectionId: number
  startImgUrl: string
  status: number
  theme: string
}

export const getSectionAndLesson = (courseId: number) => {
  return request<ApiResponse<SectionType[]>>({
    method: 'GET',
    url: '/api/boss/course/section/getSectionAndLesson',
    params: {
      courseId,
    },
  })
}

export type SectionParamsType = Pick<
  Partial<SectionType>,
  'sectionName' | 'description' | 'orderNum' | 'status' | 'id'
> & { courseId: number; courseName: string }

export const saveSection = (data: SectionParamsType) => {
  return request<ApiResponse<boolean>>({
    method: 'POST',
    url: '/api/boss/course/section/saveOrUpdateSection',
    data,
  })
}
