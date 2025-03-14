import type { roleResourcesItemType } from '@/api'
import type { CheckboxValueType } from 'element-plus'

export const useRoleResourceCategory = (roleResource: roleResourcesItemType) => {
  const resourceList = computed(() => roleResource.resourceList)
  const resourceIds = computed(() => resourceList.value.map((resource) => resource.id))
  const checkedList = ref([] as number[])

  const handleCheckAllChange = (val: CheckboxValueType) => {
    checkedList.value = val ? resourceIds.value : []
  }

  const isIndeterminate = computed(
    () => checkedList.value.length > 0 && checkedList.value.length < resourceIds.value.length,
  )

  const checkAll = computed(
    () => checkedList.value.length === resourceIds.value.length && checkedList.value.length > 0,
  )

  return {
    checkAll,
    isIndeterminate,
    resourceList,
    resourceIds,
    checkedList,

    handleCheckAllChange,
  }
}
