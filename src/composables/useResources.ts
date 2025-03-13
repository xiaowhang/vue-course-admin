import { getResources } from '@/api'
import type { ParamsType, ResourceType } from '@/api'

const defaultQueryParameters: ParamsType = {
  current: 1,
  size: 5,
}

const resources = ref<ResourceType>()

const queryResources = async (param: ParamsType = {}) => {
  const queryParameters = { ...defaultQueryParameters, ...param }
  const { data } = await getResources(queryParameters)
  if (data.code === '000000') {
    resources.value = data.data
  } else {
    ElMessage.error('获取资源失败')
  }
}

export const useResources = () => {
  return {
    resources,
    queryResources,
  }
}
