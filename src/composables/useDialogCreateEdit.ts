import { pick } from 'lodash'

export const useDialogCreateEdit = (defaultFormData: Ref) => {
  const form = ref({ ...defaultFormData.value })

  const dialogFormVisible = ref(false)
  const formLabelWidth = ref('80px')

  const onClose = () => {
    dialogFormVisible.value = false
  }

  const msgText = ref('创建')

  const handleShow = (data?: any) => {
    dialogFormVisible.value = true
    if (data) {
      msgText.value = '编辑'
      Object.assign(form.value, pick(data, Object.keys(defaultFormData.value)))
    } else {
      msgText.value = '创建'
    }
  }

  const resetForm = () => {
    form.value = { ...defaultFormData.value }
  }

  const handleFormSubmit = (saveFn: any, loadFn?: any) => {
    return async () => {
      try {
        const { data } = await saveFn(form.value)
        if (data.code === '000000' && data.data) {
          if (loadFn) await loadFn()
          ElMessage.success(msgText.value + '成功')
        } else {
          ElMessage.error(msgText.value + '失败')
        }
      } catch (error) {
        console.error(error)
      } finally {
        onClose()
      }
    }
  }

  const handleFormDelete = (deleteFn: any, loadFn?: any) => {
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
          if (loadFn) loadFn()
        } else ElMessage.error('删除失败')
      } catch (error) {
        if (error !== 'cancel') {
          console.error(error)
        }
      }
    }
  }

  return {
    form,
    dialogFormVisible,
    msgText,
    formLabelWidth,

    resetForm,
    onClose,
    handleShow,
    handleFormSubmit,
    handleFormDelete,
  }
}
