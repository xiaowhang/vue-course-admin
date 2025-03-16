import { getCoursesPages, changeStatu } from '@/api'
import type { CoursePageParamsType, CoursePageType } from '@/api'

export const useCourses = () => {
  const queryParams = reactive<CoursePageParamsType>({
    currentPage: 1,
    pageSize: 5,
    status: 'all',
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

  const handleSizeChange = (pageSize: number) => {
    getPages({ pageSize, currentPage: 1 })
  }

  const handleCurrentChange = (currentPage: number) => {
    getPages({ currentPage })
  }

  const handleChangeStatu = (courseId: number, status: string) => {
    return async () => {
      try {
        const { data } = await changeStatu(courseId, status === 'ENABLE' ? 0 : 1)
        console.log(data)
        if (data.code === '000000') {
          ElMessage.success('修改成功')
          return true
        } else {
          ElMessage.error(data.mesg)
          return false
        }
      } catch (error) {
        ElMessage.error('修改失败')
        return false
      }
    }
  }

  return {
    queryParams,
    coursePages,

    getPages,
    handleSizeChange,
    handleCurrentChange,
    handleChangeStatu,
  }
}
