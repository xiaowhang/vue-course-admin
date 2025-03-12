import { getAllMenus, saveMenu } from '@/api'
import type { MenuType, saveMenuParams } from '@/api'
import type { FormInstance } from 'element-plus'
import router from '@/router'

const menus = ref([] as MenuType[])

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
  const { data } = await saveMenu(form)
  if (data.code === '000000' && data.data) {
    ElMessage.success('提交成功')
    router.push({ name: 'menus' })
  } else ElMessage.error('提交失败')
  resetForm()
}

const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}

export const useMenus = () => {
  return {
    menus,
    topMenus,
    form,
    formRef,

    getMenus,
    onSubmit,
    resetForm,
  }
}
