import type { FormInstance } from 'element-plus'
import { pick } from 'lodash'

const defaultFormData = reactive({})
const form = ref()

const initializeForm = (newData: any) => {
  Object.assign(defaultFormData, newData)
  form.value = { ...defaultFormData }
}

const dialogFormVisible = ref(false)

const onClose = () => {
  dialogFormVisible.value = false
}

const msgText = ref('创建')

const handleCreate = () => {
  dialogFormVisible.value = true
  msgText.value = '创建'
}
const handleEdit = (row: any) => {
  handleCreate()
  msgText.value = '编辑'

  if (row) form.value = pick(row, Object.keys(defaultFormData))
}

const formRef = ref<FormInstance>()

const resetForm = () => {
  formRef.value?.resetFields()
}

const handleFormSubmit = (saveFn: any, loadFn: any) => {
  return async () => {
    try {
      const { data } = await saveFn(form.value)
      form.value = { ...defaultFormData }
      if (data.code === '000000' && data.data) {
        ElMessage.success(msgText.value + '成功')
        loadFn()
      } else {
        ElMessage.error(msgText.value + '失败')
      }
    } catch (error) {
      console.log(error)
    } finally {
      onClose()
    }
  }
}

const handleFormDelete = (deleteFn: any, loadFn: any) => {
  return async (id: number) => {
    try {
      await ElMessageBox.confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })

      const { data } = await deleteFn(id)
      if (data.code === '000000' && data.data) {
        ElMessage.success('删除成功')
        loadFn()
      } else ElMessage.error('删除失败')
    } catch (error) {
      if (error !== 'cancel') {
        console.error(error)
      }
    }
  }
}

export const useDialogCreateEdit = () => {
  return {
    form,
    formRef,
    dialogFormVisible,
    msgText,

    initializeForm,
    resetForm,
    onClose,
    handleCreate,
    handleEdit,
    handleFormSubmit,
    handleFormDelete,
  }
}
