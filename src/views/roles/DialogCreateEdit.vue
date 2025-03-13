<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="msgText + '资源'"
    width="500"
    @close="formRef?.resetFields()"
  >
    <el-form :model="form" ref="formRef">
      <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色编码" :label-width="formLabelWidth" prop="url">
        <el-input v-model="form.url" autocomplete="off" />
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button @click="handleSubmit" type="primary"> 提交 </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
const dialogFormVisible = ref(false)

const formRef = ref<FormInstance>()

const msgText = ref('创建')

const form = ref({
  name: '',
  url: '',
  categoryId: '',
  description: '',
})

const onClose = () => {
  dialogFormVisible.value = false
}

const handleSubmit = () => {
  console.log('submit')
}

const formLabelWidth = '80px'

const handleCreate = () => {
  dialogFormVisible.value = true
  msgText.value = '创建'
}

const handleEdit = () => {
  dialogFormVisible.value = true
  msgText.value = '编辑'
}

defineExpose({
  handleCreate,
  handleEdit,
})
</script>

<style scoped lang="scss"></style>
