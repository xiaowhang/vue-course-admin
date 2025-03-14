import { getRoleMenus } from '@/api'
import type { roleMenuItemType } from '@/api'

export const useRoleMenu = () => {
  const roleMenus = ref<roleMenuItemType[]>([])

  const loadRoleMenus = async (roleId: number) => {
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

  let _id = 0
  const CheckedIds = ref<number[]>([])

  const getCheckedIds = (roleMenuItems: roleMenuItemType[]) => {
    roleMenuItems.forEach((roleMenu) => {
      roleMenu.id = ++_id
      if (roleMenu.subMenuList && roleMenu.subMenuList.length) {
        getCheckedIds(roleMenu.subMenuList)
      } else if (roleMenu.selected) {
        CheckedIds.value.push(roleMenu.id)
      }
    })
  }

  return {
    roleMenus,
    nodeStruct,
    CheckedIds,

    loadRoleMenus,
    getCheckedIds,
  }
}
