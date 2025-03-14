import { getRoleMenus, saveRoleMenus } from '@/api'
import type { roleMenuItemType } from '@/api'
import type { TreeInstance } from 'element-plus'
import router from '@/router'

export const useRoleMenu = (roleId: number) => {
  const roleMenus = ref<roleMenuItemType[]>([])

  const loadRoleMenus = async () => {
    const { data } = await getRoleMenus(roleId)
    if (data.code === '000000') {
      roleMenus.value = data.data
      getCheckedIds(roleMenus.value)
    } else {
      ElMessage.error('获取角色菜单权限信息失败')
    }
  }

  const nodeStruct = {
    children: 'subMenuList',
    label: 'name',
  }

  const CheckedIds = ref<number[]>([])

  const getCheckedIds = (roleMenuItems: roleMenuItemType[]) => {
    roleMenuItems.forEach((roleMenu) => {
      if (roleMenu.subMenuList && roleMenu.subMenuList.length) {
        getCheckedIds(roleMenu.subMenuList)
      } else if (roleMenu.selected) {
        CheckedIds.value.push(roleMenu.id)
      }
    })
  }

  const treeRef = ref<TreeInstance>()

  const onSave = async () => {
    const currentCheckedIds = treeRef.value?.getCheckedKeys() || []
    try {
      const { data } = await saveRoleMenus(roleId, currentCheckedIds as number[])
      if (data.code === '000000' && data.data) {
        ElMessage.success('更新角色菜单权限成功')
        router.push({ name: 'roles' })
      } else ElMessage.error('更新角色菜单权限失败')
    } catch (error) {
      console.error(error)
    }
  }

  const onClear = () => {
    treeRef.value?.setCheckedKeys([] as number[])
  }

  return {
    roleMenus,
    nodeStruct,
    CheckedIds,
    treeRef,

    loadRoleMenus,
    getCheckedIds,
    onSave,
    onClear,
  }
}
