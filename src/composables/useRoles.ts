import { getRolePages } from '@/api'
import type { getRolePagesParamsType, RolePaginationType } from '@/api'

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

const handleSizeChange = async (size: number) => {
  await queryRoles({ size, current: 1 })
  console.log(roles.value)
}
const handleCurrentChange = async (current: number) => {
  await queryRoles({ current })
}

export const useRoles = () => {
  return {
    queryParameters,
    roles,

    queryRoles,
    handleSizeChange,
    handleCurrentChange,
  }
}
