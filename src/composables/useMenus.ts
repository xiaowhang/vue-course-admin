import { getAllMenus, saveMenu, deleteMenu, getEditMenuInfo } from '@/api'
import type { MenuInfoType, saveMenuParams } from '@/api'
import type { FormInstance } from 'element-plus'
import router from '@/router'

export const useMenus = () => {
  const menus = ref([] as MenuInfoType[])

  const getMenus = async () => {
    const { data } = await getAllMenus()
    if (data.code === '000000') menus.value = data.data
  }

  const topMenus = computed(() => menus.value.filter((menu) => menu.level === 0))

  const form = reactive<saveMenuParams>({
    name: '',
    parentId: -1,
    href: '',
    icon: '',
    orderNum: 0,
    description: '',
    shown: true,
  })

  // 绑定 ElForm 组件
  const formRef = ref<FormInstance | null>(null)

  const onSubmit = async () => {
    try {
      const { data } = await saveMenu(form)
      if (data.code === '000000' && data.data) {
        ElMessage.success(`${msgText.value}成功`)
        await router.push({ name: 'menus' })
      } else ElMessage.error(`${msgText.value}失败`)
    } catch (error) {
      console.error('保存菜单失败', error)
    }
  }

  const resetForm = () => {
    if (!formRef.value) return
    formRef.value.resetFields()
  }

  const handleDelete = async (id: number) => {
    try {
      await ElMessageBox.confirm('确定删除该菜单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })

      const { data } = await deleteMenu(id)
      if (data.code === '000000' && data.data) {
        ElMessage.success('删除菜单成功')
        getMenus()
      } else ElMessage.error('删除菜单失败')
    } catch (error) {
      if (error !== 'cancel') {
        console.error('取消删除失败', error)
      }
    }
  }

  const getMenusInfoById = async (id: number) => {
    const { data } = await getEditMenuInfo(id)
    if (data.code === '000000') {
      Object.assign(form, data.data.menuInfo)
    } else {
      ElMessage.error('获取菜单信息失败')
    }
  }

  const isCreate = computed(() => router.currentRoute.value.name === 'menus-create')
  const msgText = computed(() => (isCreate.value ? '创建' : '编辑'))

  return {
    menus,
    topMenus,
    form,
    formRef,
    msgText,

    getMenus,
    onSubmit,
    resetForm,
    handleDelete,
    getMenusInfoById,
  }
}
