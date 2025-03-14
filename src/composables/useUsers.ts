import { getUserPages, enableUser, forbidUser, getRoleWithUserPermission } from '@/api'
import type { UserPageParamsType, UserPageType } from '@/api'

export const useUsers = () => {
  const queryParams = ref({
    currentPage: 1,
    pageSize: 5,
  } as UserPageParamsType)

  const userPages = ref({} as UserPageType)

  const getPages = async (params: UserPageParamsType = {}) => {
    queryParams.value = { ...queryParams.value, ...params }
    const { data } = await getUserPages(queryParams.value)
    if (data.code === '000000') userPages.value = data.data
    else ElMessage.error(data.mesg)
  }

  onMounted(() => {
    getPages()
  })

  const handleChange = async (status: 'ENABLE' | 'DISABLE', id: number) => {
    const action = {
      ENABLE: { msg: '启用', fn: enableUser },
      DISABLE: { msg: '禁用', fn: forbidUser },
    }[status]

    try {
      const { data } = await action.fn(id)
      if (data.code === '000000') {
        ElMessage.success(`${action.msg}成功`)
      } else {
        ElMessage.error(`${action.msg}失败` + data.mesg)
      }
    } catch (error) {
      ElMessage.error('操作失败，请稍后再试')
    }
  }

  const timeRange = ref<string[]>([])

  watch(timeRange, (newRange) => {
    if (Array.isArray(timeRange.value)) {
      queryParams.value.startCreateTime = newRange[0]
      queryParams.value.endCreateTime = newRange[1]
    }
  })

  const handleSizeChange = (pageSize: number) => {
    getPages({ pageSize, currentPage: 1 })
  }
  const handleCurrentChange = (currentPage: number) => {
    getPages({ currentPage })
  }

  const dialogFormVisible = ref(false)

  const handleEdit = async (id: number) => {
    dialogFormVisible.value = true
    try {
      const { data } = await getRoleWithUserPermission(id)
      if (data.code === '000000') {
        console.log(data.data)
      } else {
        ElMessage.error('获取用户信息失败')
      }
    } catch (error) {
      ElMessage.error('获取用户信息失败')
    }
  }

  const handleSubmit = () => {
    ElMessage.success('提交成功')
    dialogFormVisible.value = false
  }

  return {
    queryParams,
    userPages,
    timeRange,
    dialogFormVisible,

    getPages,
    handleChange,
    handleSizeChange,
    handleCurrentChange,
    handleEdit,
    handleSubmit,
  }
}
