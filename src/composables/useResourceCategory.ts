import { getResourceCategories, saveResourceCategory, deleteResourceCategory } from '@/api'
import { useDialogCreateEdit } from '@/composables'
import type { ResourceCategoryType } from '@/api'

const { initializeForm, handleFormSubmit, handleFormDelete } = useDialogCreateEdit()

const ResourceCategories = ref([] as ResourceCategoryType[])

const loadResourceCategories = async () => {
  const { data } = await getResourceCategories()
  if (data.code === '000000') {
    ResourceCategories.value = data.data
  } else {
    ElMessage.error('获取资源分类失败')
  }
}

initializeForm({
  name: '',
  sort: 0,
})

const handleSubmit = handleFormSubmit(saveResourceCategory, loadResourceCategories)

const handleDelete = handleFormDelete(deleteResourceCategory, loadResourceCategories)

export const useResourceCategory = () => {
  return {
    ...useDialogCreateEdit(),

    ResourceCategories, // 资源分类列表

    loadResourceCategories,
    handleSubmit,
    handleDelete,
  }
}
