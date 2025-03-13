import { getResourceCategories } from '@/api'
import type { ResourceCategoryType } from '@/api'

const allResourceCategories = ref([] as ResourceCategoryType[])

const loadResourceCategories = async () => {
  const { data } = await getResourceCategories()
  if (data.code === '000000') {
    allResourceCategories.value = data.data
  } else {
    ElMessage.error('获取资源分类失败')
  }
}

export const useResourceCategory = () => {
  return {
    allResourceCategories,
    loadResourceCategories,
  }
}
