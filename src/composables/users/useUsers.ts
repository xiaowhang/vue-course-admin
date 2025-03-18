import { getUserPages, enableUser, forbidUser } from '@/api'
import type { UserPageParamsType, UserPageType } from '@/api'

const queryParams = reactive({
  currentPage: 1,
  pageSize: 5,
} as UserPageParamsType)

const userPages = reactive({
  current: 1,
  size: 5,
  total: 0,
} as UserPageType)

const getPages = async (params: UserPageParamsType = {}) => {
  Object.assign(queryParams, params)
  const { data } = await getUserPages(queryParams)
  if (data.code === '000000') Object.assign(userPages, data.data)
  else ElMessage.error(data.mesg)
}

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
    queryParams.startCreateTime = newRange[0]
    queryParams.endCreateTime = newRange[1]
  }
})

watch(
  () => [userPages.size, userPages.current],
  async ([pageSize, currentPage]) => {
    await getPages({ pageSize, currentPage: currentPage ?? 1 })
  },
)

export const useUsers = () => {
  return {
    queryParams,
    userPages,
    timeRange,

    getPages,
    handleChange,
  }
}
