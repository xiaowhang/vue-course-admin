import { useDialogCreateEdit, useResources } from '@/composables'
import { saveResource } from '@/api'

const { queryResources } = useResources()

const defaultForm = ref({
  name: '',
  categoryId: 1,
  url: '',
  description: '',
})

const { handleFormSubmit, ...dialogMethods } = useDialogCreateEdit(defaultForm)

const handleSubmit = handleFormSubmit(saveResource, queryResources)

export const useResourcesDialog = () => {
  return {
    ...dialogMethods,

    handleSubmit,
  }
}
