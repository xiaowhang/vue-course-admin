import { getRolePages, deleteRole } from '@/api'
import type { getRolePagesParamsType, RolePaginationType } from '@/api'
import type { FormInstance } from 'element-plus'

const queryParameters = reactive<getRolePagesParamsType>({
  code: '',
  name: '',
  current: 1,
  size: 5,
})

const roles = reactive<RolePaginationType>({
  size: 5,
  current: 1,
  pages: 1,
  total: 0,
  records: [],
})

const queryRoles = async (param: getRolePagesParamsType = {}) => {
  Object.assign(queryParameters, param)
  const { data } = await getRolePages(queryParameters)
  if (data.code === '000000') {
    Object.assign(roles, data.data)
    roles.total = Math.max(roles.total, roles.records.length)
  } else {
    ElMessage.error('获取角色失败')
  }
}

onMounted(() => {
  queryRoles()
})

watch(
  () => [queryParameters.size, queryParameters.current],
  async ([size, current]) => {
    await queryRoles({ size, current: current ?? 1 })
  },
)

const handleDelete = async (id: number) => {
  try {
    await ElMessageBox.confirm('确定删除吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    const { data } = await deleteRole(id)
    if (data.code === '000000' && data.data) {
      ElMessage.success('删除成功')
      queryRoles()
    } else ElMessage.error('删除失败')
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error)
    }
  }
}

const queryForm = ref<FormInstance>()

const resetQueryForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

export const useRoles = () => {
  return {
    queryParameters,
    roles,
    queryForm,

    queryRoles,
    handleDelete,
    resetQueryForm,
  }
}
