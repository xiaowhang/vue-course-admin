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
  })
  return {
    steps,
    title,
    currentStep,
    courseInfo,
  }
}
