import { getUserPages } from '@/api'
import type { UserPageParamsType, UserPageType } from '@/api'

export const useUsers = () => {
  const queryParams = ref({} as UserPageParamsType)

  const userPages = ref({} as UserPageType)

  const getPages = async () => {
    const { data } = await getUserPages(queryParams.value)
    if (data.code === '000000') userPages.value = data.data
    else ElMessage.error(data.mesg)
  }

  onMounted(() => {
    getPages()
  })

  return {
    queryParams,
    userPages,

    getPages,
  }
}
