import { getCourseDetail, getSectionAndLesson } from '@/api'
import type { CourseDetailType, SectionType } from '@/api'

export const useCourseContent = ({ courseId }: { courseId: string }) => {
  const courseDetail = reactive<CourseDetailType>({} as CourseDetailType)
  const sectionAndLesson = ref<SectionType[]>([] as SectionType[])

  const loadSectionAndLesson = async () => {
    const { data: courseData } = await getCourseDetail(Number(courseId))
    if (courseData.code === '000000') {
      Object.assign(courseDetail, courseData.data)
    } else {
      ElMessage.error(courseData.mesg || '获取课程详情失败')
      return
    }
    const { data: SectionData } = await getSectionAndLesson(Number(courseId))
    if (SectionData.code === '000000') {
      sectionAndLesson.value = SectionData.data
    } else {
      ElMessage.error(SectionData.mesg || '获取章节信息失败')
    }
  }

  onMounted(() => {
    loadSectionAndLesson()
  })

  return {
    courseDetail,

    sectionAndLesson,
  }
}
