import { getResourceCategories, deleteResourceCategory } from '@/api'
import type { ResourceCategoryType } from '@/api'

const ResourceCategories = ref([] as ResourceCategoryType[])

const loadResourceCategories = async () => {
  const { data } = await getResourceCategories()
  if (data.code === '000000') {
    ResourceCategories.value = data.data
  } else {
    ElMessage.error('获取资源分类失败')
  }
}

const handleDelete = async (id: number) => {
  try {
    await ElMessageBox.confirm('确定删除吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    const { data } = await deleteResourceCategory(id)
    if (data.code === '000000' && data.data) {
      ElMessage.success('删除成功')
      getResourceCategories()
    } else ElMessage.error('删除失败')
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error)
    }
  }
}

export const useResourceCategories = () => {
  return {
    ResourceCategories, // 资源分类列表

    loadResourceCategories,
    handleDelete,
  }
}
