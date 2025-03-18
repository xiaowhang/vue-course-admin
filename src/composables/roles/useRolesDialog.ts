import { useDialogCreateEdit, useRoles } from '@/composables'
import { saveRole } from '@/api'

const defaultForm = ref({
  code: '',
  name: '',
  description: '',
})

const { handleFormSubmit, ...dialogMethods } = useDialogCreateEdit(defaultForm)

const { queryRoles } = useRoles()

const handleSubmit = handleFormSubmit(saveRole, queryRoles)

export const useRolesDialog = () => {
  return {
    ...dialogMethods,

    handleSubmit,
  }
}
