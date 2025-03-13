import { getResourceCategories, saveResourceCategory, deleteResourceCategory } from '@/api'
import type { ResourceCategoryType } from '@/api'
import type { FormInstance } from 'element-plus'

const allResourceCategories = ref([] as ResourceCategoryType[])

const loadResourceCategories = async () => {
  const { data } = await getResourceCategories()
  if (data.code === '000000') {
    allResourceCategories.value = data.data
  } else {
    ElMessage.error('获取资源分类失败')
  }
}

const form = reactive({
  name: '',
  sort: 0,
})

const dialogFormVisible = ref(false)

const formRef = ref<FormInstance>()

const onClose = () => {
  dialogFormVisible.value = false
  formRef.value?.resetFields()
}

const handleSubmit = async () => {
  try {
    const { data } = await saveResourceCategory(form)
    if (data.code === '000000' && data.data) {
      ElMessage.success(msgText.value + '成功')
      loadResourceCategories()
    } else {
      ElMessage.error(msgText.value + '失败')
    }
  } catch (error) {
    console.log(error)
  } finally {
    onClose()
  }
}

const msgText = ref('创建')

const handleCreate = () => {
  dialogFormVisible.value = true
  msgText.value = '创建'
}
const handleEdit = (id: number) => {
  handleCreate()
  msgText.value = '编辑'
}

const handleDelete = async (id: number) => {
  try {
    await ElMessageBox.confirm('确定删除该资源类型吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    const { data } = await deleteResourceCategory(id)
    if (data.code === '000000' && data.data) {
      ElMessage.success('删除资源类型成功')
      loadResourceCategories()
    } else ElMessage.error('删除资源类型失败')
  } catch (error) {
    if (error !== 'cancel') {
      console.error('取消删除失败', error)
    }
  }
}

export const useResourceCategory = () => {
  return {
    allResourceCategories,
    form,
    dialogFormVisible,
    formRef,
    msgText,

    loadResourceCategories,
    onClose,
    handleSubmit,
    handleCreate,
    handleEdit,
    handleDelete,
  }
}
