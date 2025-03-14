import { getResources, saveResource, deleteResource } from '@/api'
import type { getResourcesParamsType, ResourcePaginationType } from '@/api'
import { useDialogCreateEdit } from '@/composables'

export const useResources = () => {
  const defaultForm = {
    name: '',
    categoryId: 1,
    url: '',
    description: '',
  }

  const { handleFormSubmit, handleFormDelete, ...other } = useDialogCreateEdit(defaultForm)

  const queryParameters = reactive<getResourcesParamsType>({
    name: '',
    url: '',
    categoryId: -1,
    current: 1,
    size: 5,
  })

  const resources = ref<ResourcePaginationType>({
    size: 5,
    current: 1,
    pages: 1,
    total: 0,
    records: [],
  })

  const queryResources = async (param: getResourcesParamsType = { current: 1 }) => {
    Object.assign(queryParameters, param)
    const { data } = await getResources(queryParameters)
    if (data.code === '000000') {
      resources.value = data.data
    } else {
      ElMessage.error('获取资源失败')
    }
  }

  const handleSizeChange = async (size: number) => {
    await queryResources({ size, current: 1 })
  }
  const handleCurrentChange = async (current: number) => {
    await queryResources({ current })
  }

  const handleSubmit = handleFormSubmit(saveResource, queryResources)

  const handleDelete = handleFormDelete(deleteResource, queryResources)

  return {
    ...other,

    queryParameters,
    resources,

    queryResources,
    handleSizeChange,
    handleCurrentChange,

    handleSubmit,
    handleDelete,
  }
}
