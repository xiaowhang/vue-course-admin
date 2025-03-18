import { useDialogCreateEdit } from '@/composables'

const defaultForm = ref({})

export const useUsersDialog = () => {
  return {
    ...useDialogCreateEdit(defaultForm),
  }
}
