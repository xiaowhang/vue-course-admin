import { getResources, saveResource, deleteResource, getResourcesById } from '@/api'
import type { ParamsType, PaginationType } from '@/api'
import type { FormInstance } from 'element-plus'
import { pick } from 'lodash'

const queryParameters = reactive<ParamsType>({
  name: '',
  url: '',
  categoryId: -1,
  current: 1,
  size: 5,
})

const resources = ref<PaginationType>({
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
  queryResources({ size, current: 1 })
}
const handleCurrentChange = (current: number) => {
  queryResources({ current })
}

const dialogFormVisible = ref(false)

const onClose = () => {
  dialogFormVisible.value = false
}

const msgText = ref('创建')

const handleCreate = () => {
  dialogFormVisible.value = true
  msgText.value = '创建'
}
const handleEdit = async (id: number) => {
  handleCreate()
  msgText.value = '编辑'

  const { data } = await getResourcesById(id)
  if (data.code === '000000')
    form.value = pick(data.data, ['id', 'name', 'categoryId', 'url', 'description'])
  else ElMessage.error('获取资源信息失败')
}

const defaultForm = {
  name: '',
  categoryId: 1,
  url: '',
  description: '',
}

const form = ref({ ...defaultForm })

const handleSubmit = async () => {
  try {
    const { data } = await saveResource(form.value)
    form.value = { ...defaultForm }
    if (data.code === '000000' && data.data) {
      ElMessage.success(msgText.value + '成功')
      queryResources({ current: 1 })
    } else {
      ElMessage.error(msgText.value + '失败')
    }
  } catch (error) {
    console.log(error)
  } finally {
    onClose()
  }
}

const handleDelete = async (id: number) => {
  try {
    await ElMessageBox.confirm('确定删除该资源吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    const { data } = await deleteResource(id)
    if (data.code === '000000' && data.data) {
      ElMessage.success('删除资源成功')
      queryResources()
    } else ElMessage.error('删除资源失败')
  } catch (error) {
    console.error(error)
  }
}

export const useResources = () => {
  return {
    queryParameters,
    resources,
    formRef,
    dialogFormVisible,
    msgText,
    form,

    queryResources,
    resetForm,
    handleSizeChange,
    handleCurrentChange,
    handleCreate,
    handleEdit,
    onClose,
    handleSubmit,
    handleDelete,
  }
}
