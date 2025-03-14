import { getRolePages, saveRole, deleteRole } from '@/api'
import type { getRolePagesParamsType, RolePaginationType } from '@/api'
import { useDialogCreateEdit } from '@/composables'
import type { FormInstance } from 'element-plus'

export const useRoles = () => {
  const defaultForm = {
    code: '',
    name: '',
    description: '',
  }

  const { handleFormSubmit, handleFormDelete, ...other } = useDialogCreateEdit(defaultForm)

  const queryParameters = reactive<getRolePagesParamsType>({
    code: '',
    name: '',
    current: 1,
    size: 5,
  })

  const roles = ref<RolePaginationType>({
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
      roles.value = data.data
      roles.value.total = Math.max(roles.value.total, roles.value.records.length)
    } else {
      ElMessage.error('获取角色失败')
    }
  }

  onMounted(() => {
    queryRoles()
  })

  const handleSizeChange = async (size: number) => {
    await queryRoles({ size, current: 1 })
  }
  const handleCurrentChange = async (current: number) => {
    await queryRoles({ current })
  }

  const handleSubmit = handleFormSubmit(saveRole, queryRoles)

  const handleDelete = handleFormDelete(deleteRole, queryRoles)

  const formRef = ref<FormInstance>()

  const onClear = () => {
    formRef.value?.resetFields()
  }

  return {
    ...other,

    queryParameters,
    roles,
    formRef,

    queryRoles,
    handleSizeChange,
    handleCurrentChange,
    handleSubmit,
    handleDelete,
    onClear,
  }
}
