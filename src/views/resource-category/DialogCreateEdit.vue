<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="msgText + '资源类别'"
    width="500"
    @closed="resetForm"
  >
    <el-form :model="form" ref="formRef">
      <el-form-item label="类别名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
        <el-input v-model="form.sort" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit"> 提交 </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useResourceCategory } from '@/composables'

const {
  form,
  dialogFormVisible,
  msgText,
  resetForm,
  onClose,
  handleSubmit,
  handleCreate,
  handleEdit,
} = useResourceCategory()

const formLabelWidth = '80px'

defineExpose({
  handleCreate,
  handleEdit,
})
</script>

<style scoped lang="scss"></style>
