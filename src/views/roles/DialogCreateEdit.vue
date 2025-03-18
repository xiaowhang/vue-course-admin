<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '资源'" width="500" @closed="resetForm">
    <el-form :model="form" ref="formRef">
      <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色编码" :label-width="formLabelWidth" prop="code">
        <el-input v-model="form.code" autocomplete="off" />
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
import { useRolesDialog } from '@/composables'

const {
  form,
  dialogFormVisible,
  msgText,
  handleShow,
  onClose,
  resetForm,
  handleSubmit,
  formLabelWidth,
} = useRolesDialog()

defineExpose({ handleShow })
</script>

<style scoped lang="scss"></style>
