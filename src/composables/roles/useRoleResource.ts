import { getRoleResources } from '@/api'
import type { roleResourcesItemType } from '@/api'

export const useRoleResource = (roleId: number) => {
  const roleResources = ref<roleResourcesItemType[]>([])

  const loadRoleResources = async () => {
    const { data } = await getRoleResources(roleId)
    if (data.code === '000000') {
      roleResources.value = data.data
      console.log('roleResources', roleResources.value)
    } else {
      ElMessage.error('获取角色资源权限信息失败')
    }
  }

  const checkedIdsRefs = ref([] as Ref<number[]>[])
  const handleCheckedIdsRef = (checkedIdsRef: Ref<number[]>) => {
    checkedIdsRefs.value.push(checkedIdsRef)
  }

  const onSave = async () => {}

  const onClear = () => {
    checkedIdsRefs.value.forEach((checkedIdsRef) => {
      checkedIdsRef.value = []
    })
  }

  return {
    roleResources,
    loadRoleResources,
    checkedIdsRefs,

    handleCheckedIdsRef,
    onSave,
    onClear,
  }
}
