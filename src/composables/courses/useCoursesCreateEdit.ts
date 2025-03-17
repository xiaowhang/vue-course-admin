import { EditPen, Tools, Picture, Clock, Document } from '@element-plus/icons-vue'

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
    activityDTO: {
      beginTime: '',
      endTime: '',
      amount: 0,
      stock: 0,
    },
  })

  const activityTimeRange = computed({
    get: () => [courseInfo.activityDTO.beginTime, courseInfo.activityDTO.endTime],
    set: ([start, end]) => {
      courseInfo.activityDTO.beginTime = start
      courseInfo.activityDTO.endTime = end
    },
  })

  return {
    steps,
    title,
    currentStep,
    courseInfo,
    activityTimeRange,
  }
}
