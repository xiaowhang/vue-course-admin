import { useDialogCreateEdit, useResourceCategories } from '@/composables'
import { saveResourceCategory } from '@/api'

const defaultForm = ref({
  name: '',
  sort: 0,
})

const { handleFormSubmit, ...dialogMethods } = useDialogCreateEdit(defaultForm)

const { loadResourceCategories } = useResourceCategories()

const handleSubmit = handleFormSubmit(saveResourceCategory, loadResourceCategories)

export const useResourceCategoriesDialog = () => {
  return {
    ...dialogMethods,

    handleSubmit,
  }
}
