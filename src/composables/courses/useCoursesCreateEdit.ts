import { EditPen, Tools, Picture, Clock, Document } from '@element-plus/icons-vue'
import { saveCourse, getCourseDetail } from '@/api'
import router from '@/router'
import { cloneDeep } from 'lodash'
import { en } from 'element-plus/es/locales.mjs'

export const useCoursesCreateEdit = (props: { courseId: string | undefined }) => {
  const title = computed(() => {
    return props.courseId ? '编辑' : '新建'
  })

  const currentStep = ref<number>(0)
  const steps = [
    { title: '基本信息', icon: EditPen },
    { title: '课程封面', icon: Tools },
    { title: '销售信息', icon: Picture },
    { title: '秒杀活动', icon: Clock },
    { title: '课程详情', icon: Document },
  ]

  const courseInfo = reactive({
    // 课程基本信息
    courseName: '',
    brief: '',
    teacherDTO: {
      teacherName: '',
      position: '',
      description: '',
    },
    previewFirstField: '',
    previewSecondField: '',
    sortNum: 0,

    // 课程封面
    courseListImg: '',
    courseImgUrl: '',

    // 销售信息
    discounts: 0,
    price: 0,
    sales: 0,
    discountsTag: '',

    // 秒杀活动
    activityCourse: false,
    activityCourseDTO: {
      beginTime: '',
      endTime: '',
      amount: 0,
      stock: 0,
    },

    // 课程详情
    courseDescriptionMarkDown: '',
    status: 0,
  })

  onMounted(async () => {
    if (props.courseId) {
      const { data } = await getCourseDetail(Number(props.courseId))
      if (data.code === '000000') {
        Object.assign(courseInfo, cloneDeep(data.data))
      }
    }
  })

  const activityTimeRange = computed({
    get: () => [courseInfo.activityCourseDTO.beginTime, courseInfo.activityCourseDTO.endTime],
    set: ([start, end]) => {
      courseInfo.activityCourseDTO.beginTime = start
      courseInfo.activityCourseDTO.endTime = end
    },
  })

  const onSubmit = async () => {
    const { data } = await saveCourse(courseInfo)
    if (data.code === '000000') {
      ElMessage.success('保存成功')
      router.push({ name: 'courses' })
    } else {
      ElMessage.error('保存失败')
    }
  }

  return {
    steps,
    title,
    currentStep,
    courseInfo,
    activityTimeRange,

    onSubmit,
  }
}
