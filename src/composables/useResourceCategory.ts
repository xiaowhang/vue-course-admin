import { getResourceCategories, saveResourceCategory, deleteResourceCategory } from '@/api'
import { useDialogCreateEdit } from '@/composables'
import type { ResourceCategoryType } from '@/api'

export const useResourceCategory = () => {
  const defaultForm = {
    name: '',
    sort: 0,
  }

  const { handleFormSubmit, handleFormDelete, ...other } = useDialogCreateEdit(defaultForm)

  const ResourceCategories = ref([] as ResourceCategoryType[])

  const loadResourceCategories = async () => {
    const { data } = await getResourceCategories()
    if (data.code === '000000') {
      ResourceCategories.value = data.data
    } else {
      ElMessage.error('获取资源分类失败')
    }
  }

  const handleSubmit = handleFormSubmit(saveResourceCategory, loadResourceCategories)

  const handleDelete = handleFormDelete(deleteResourceCategory, loadResourceCategories)

  return {
    ...other,

    ResourceCategories, // 资源分类列表

    loadResourceCategories,
    handleSubmit,
    handleDelete,
  }
}
