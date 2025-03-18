import { useDialogCreateEdit } from '@/composables'
import { saveSection } from '@/api'

const defaultForm = ref({
  courseName: '',
  sectionName: '',
  description: '',
  orderNum: 0,
})

const { handleFormSubmit, ...dialogMethods } = useDialogCreateEdit(defaultForm)

const handleSubmit = handleFormSubmit(saveSection)

export const useSectionDialog = () => {
  return {
    ...dialogMethods,

    defaultForm,

    handleSubmit,
  }
}
