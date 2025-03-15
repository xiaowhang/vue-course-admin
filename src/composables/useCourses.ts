import { getCoursesPages } from '@/api'
import type { CoursePageParamsType, CoursePageType } from '@/api'

export const useCourses = () => {
  const queryParams = reactive<CoursePageParamsType>({
    currentPage: 1,
    pageSize: 5,
  })

  const coursePages = ref<CoursePageType>({} as CoursePageType)

  const getPages = async (params: Partial<CoursePageParamsType> = {}) => {
    Object.assign(queryParams, params)
    const { data } = await getCoursesPages(queryParams)
    if (data.code === '000000') coursePages.value = data.data
    else ElMessage.error(data.mesg)
  }

  onMounted(() => {
    getPages()
  })

  return {
    queryParams,
    coursePages,

    getPages,
  }
}
