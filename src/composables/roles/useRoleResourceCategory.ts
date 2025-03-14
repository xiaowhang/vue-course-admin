import type { roleResourcesItemType } from '@/api'
import type { CheckboxValueType } from 'element-plus'

export const useRoleResourceCategory = (roleResource: roleResourcesItemType) => {
  const checkAll = ref(false)
  const isIndeterminate = ref(true)
  const resourceList = computed(() => roleResource.resourceList)
  const resourceIds = computed(() => resourceList.value.map((resource) => resource.id))
  const checkedList = ref([] as number[])

  const handleCheckAllChange = (val: CheckboxValueType) => {
    checkedList.value = val ? resourceIds.value : []
    isIndeterminate.value = false
  }
  const handleCheckedCitiesChange = (value: CheckboxValueType[]) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === resourceIds.value.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < resourceIds.value.length
  }

  return {
    checkAll,
    isIndeterminate,
    resourceList,
    resourceIds,
    checkedList,

    handleCheckAllChange,
    handleCheckedCitiesChange,
  }
}
