import { saveSection } from '@/api'
import { pick } from 'lodash'

const dialogVisible = ref(false)

const form = ref({
  courseId: 0,
  courseName: '',
  status: 0,
})

const title = ref('')

const handleShow = (course: any, section: any) => {
  dialogVisible.value = true
  title.value = '当前章节状态：' + sectionStatus[section.status]
  Object.assign(form.value, pick(course, ['courseId', 'courseName']))
  Object.assign(form.value, pick(section, 'status'))
}

const handleSubmit = async () => {
  try {
    const { data } = await saveSection(form.value)
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

enum sectionStatus {
  '隐藏',
  '待更新',
  '已发布',
}

export const useSectionStatusChange = () => {
  return {
    dialogVisible,
    form,
    title,
    sectionStatus,

    handleShow,
    handleSubmit,
  }
}
