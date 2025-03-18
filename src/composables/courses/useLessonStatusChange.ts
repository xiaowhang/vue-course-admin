import { saveLesson } from '@/api'
import { pick } from 'lodash'

const dialogVisible = ref(false)

const form = ref({
  courseId: 0,
  courseName: '',
  sectionId: 0,
  status: 0,
})

const title = ref('')

const handleShow = (course: any, section: any) => {
  dialogVisible.value = true
  title.value = '当前课时状态：' + lessonStatus[section.status]
  Object.assign(form.value, pick(course, ['courseId', 'courseName']))
  Object.assign(form.value, pick(section, 'status'))
}

const handleSubmit = async () => {
  try {
    const { data } = await saveLesson(form.value)
    if (data.code === '000000' && data.data) {
      ElMessage.success('更新状态成功')
    } else {
      ElMessage.error('更新状态失败')
    }
  } catch (error) {
    console.error(error)
  } finally {
    dialogVisible.value = false
  }
}

enum lessonStatus {
  '隐藏',
  '未发布',
  '已发布',
}

export const useLessonStatusChange = () => {
  return {
    dialogVisible,
    form,
    title,
    lessonStatus,

    handleShow,
    handleSubmit,
  }
}
