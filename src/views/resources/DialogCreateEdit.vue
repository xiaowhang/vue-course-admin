<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '资源'" width="500" @closed="resetForm">
    <el-form :model="form" ref="formRef">
      <el-form-item label="资源名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="资源路径" :label-width="formLabelWidth" prop="url">
        <el-input v-model="form.url" autocomplete="off" />
      </el-form-item>
      <el-form-item label="资源类别" :label-width="formLabelWidth" prop="categoryId">
        <el-select v-model="form.categoryId" placeholder="资源类别">
          <el-option
            v-for="category in ResourceCategories"
            :label="category.name"
            :value="category.id"
            :key="category.id"
          />
        </el-select>
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
import { useResourcesDialog } from '@/composables'
import type { ResourceCategoryType } from '@/api'

defineProps({
  ResourceCategories: Array as PropType<ResourceCategoryType[]>,
})

const {
  dialogFormVisible,
  msgText,
  handleShow,
  form,
  onClose,
  handleSubmit,
  resetForm,
  formLabelWidth,
} = useResourcesDialog()

defineExpose({
  handleShow,
})
</script>

<style scoped lang="scss"></style>
