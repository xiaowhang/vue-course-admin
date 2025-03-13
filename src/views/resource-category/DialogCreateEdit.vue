<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '资源类别'" width="500">
    <el-form :model="form" ref="formRef">
      <el-form-item label="类别名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
        <el-input v-model="form.sort" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="close"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'

const dialogFormVisible = ref(false)
const formLabelWidth = '80px'

const form = reactive({
  name: '',
  sort: 0,
})

const formRef = ref<FormInstance>()

const close = () => {
  dialogFormVisible.value = false
  formRef.value?.resetFields()
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

defineExpose({
  handleCreate,
  handleEdit,
})
</script>

<style scoped lang="scss"></style>
