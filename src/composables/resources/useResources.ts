import { getResources, deleteResource } from '@/api'
import type { getResourcesParamsType, ResourcePaginationType } from '@/api'
import type { FormInstance } from 'element-plus'

// 查询参数
const queryParameters = reactive<getResourcesParamsType>({
  name: '',
  url: '',
  categoryId: -1,
  current: 1,
  size: 5,
})

// 资源列表
const resources = reactive<ResourcePaginationType>({
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
    Object.assign(resources, data.data)
  } else {
    ElMessage.error('获取资源失败')
  }
}

const handleDelete = async (id: number) => {
  try {
    await ElMessageBox.confirm('确定删除吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    const { data } = await deleteResource(id)
    if (data.code === '000000' && data.data) {
      ElMessage.success('删除成功')
      queryResources()
    } else ElMessage.error('删除失败')
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error)
    }
  }
}

watch(
  () => [resources.size, resources.current],
  async ([size, current]) => {
    await queryResources({ size, current: current ?? 1 })
  },
)

const queryForm = ref<FormInstance>()

const resetQueryForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

export const useResources = () => {
  return {
    queryParameters,
    resources,
    queryForm,

    queryResources,
    handleDelete,
    resetQueryForm,
  }
}
