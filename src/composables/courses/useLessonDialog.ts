import { useDialogCreateEdit } from '@/composables'
import { pick } from 'lodash'
import { saveLesson } from '@/api'

const defaultForm = ref({
  courseId: 0,
  sectionId: 0,
  theme: '',
  durationNum: 0,
  isFree: false,
  orderNum: 0,
  status: 0,

  courseName: '',
  sectionName: '',
})

const { handleFormSubmit, dialogFormVisible, msgText, form, ...dialogMethods } =
  useDialogCreateEdit(defaultForm)

const handleShow = (node: any) => {
  dialogFormVisible.value = true
  if (node.level === 1) {
    msgText.value = '创建'
    form.value.sectionName = node.data.sectionName
  } else {
    msgText.value = '编辑'
    Object.assign(form.value, pick(node.data, Object.keys(defaultForm.value)))
    form.value.sectionName = node.parent.data.sectionName
  }
}

const handleSubmit = handleFormSubmit(saveLesson)

export const useLessonDialog = () => {
  return {
    ...dialogMethods,

    dialogFormVisible,
    msgText,
    form,
    defaultForm,

    handleShow,
    handleSubmit,
  }
}
