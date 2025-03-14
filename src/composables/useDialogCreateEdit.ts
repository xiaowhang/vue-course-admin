import { pick } from 'lodash'

export const useDialogCreateEdit = (defaultFormData: any) => {
  const form = ref(defaultFormData)

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
    console.log('row', row)
    handleCreate()
    msgText.value = '编辑'

    if (row) form.value = pick(row, Object.keys(defaultFormData))
  }

  const resetForm = () => {
    form.value = { ...defaultFormData }
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

  return {
    form,
    dialogFormVisible,
    msgText,

    resetForm,
    onClose,
    handleCreate,
    handleEdit,
    handleFormSubmit,
    handleFormDelete,
  }
}
