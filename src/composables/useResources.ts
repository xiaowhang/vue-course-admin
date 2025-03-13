import { getResources } from '@/api'
import type { ParamsType, ResourceType } from '@/api'
import type { FormInstance } from 'element-plus'

const queryParameters = reactive<ParamsType>({
  name: '',
  url: '',
  categoryId: -1,
  current: 1,
  size: 5,
})

const resources = ref<ResourceType>({
  size: 5,
  current: 1,
  pages: 1,
  total: 0,
  records: [],
})

const queryResources = async (param: ParamsType = {}) => {
  Object.assign(queryParameters, param)
  const { data } = await getResources(queryParameters)
  if (data.code === '000000') {
    resources.value = data.data
  } else {
    ElMessage.error('获取资源失败')
  }
}

const formRef = ref<FormInstance>()

const resetForm = () => {
  formRef.value?.resetFields()
}

const handleSizeChange = (size: number) => {
  queryResources({ size })
}
const handleCurrentChange = (current: number) => {
  queryResources({ current })
}

export const useResources = () => {
  return {
    queryParameters,
    resources,
    formRef,

    queryResources,
    resetForm,
    handleSizeChange,
    handleCurrentChange,
  }
}
