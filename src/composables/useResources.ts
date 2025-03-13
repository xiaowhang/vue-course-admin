import { getResources } from '@/api'
import type { ParamsType, ResourceType } from '@/api'
import type { FormInstance } from 'element-plus'

const queryParameters = reactive<ParamsType>({
  name: '',
  url: '',
  categoryId: -1,
  current: 1,
  size: 10,
})

const resources = ref<ResourceType>()

const queryResources = async (param: ParamsType = {}) => {
  Object.assign(queryParameters, param)
  const { data } = await getResources(queryParameters)
  if (data.code === '000000') {
    resources.value = data.data
  } else {
    ElMessage.error('获取资源失败')
  }
}

const fromRef = ref<FormInstance>()

const resetForm = () => {
  fromRef.value?.resetFields()
}

export const useResources = () => {
  return {
    queryParameters,
    resources,
    fromRef,

    queryResources,
    resetForm,
  }
}
