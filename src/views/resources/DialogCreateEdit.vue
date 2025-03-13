<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="msgText + '资源'"
    width="500"
    @close="formRef?.resetFields()"
  >
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
            v-for="category in allResourceCategories"
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
      <el-button type="primary"> 提交 </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useResources, useResourceCategory } from '@/composables'

const { allResourceCategories, loadResourceCategories } = useResourceCategory()
const { dialogFormVisible, msgText, handleCreate, handleEdit, form, onClose, formRef } =
  useResources()

onMounted(() => {
  loadResourceCategories()
})

const formLabelWidth = '80px'

defineExpose({
  handleCreate,
  handleEdit,
})
</script>

<style scoped lang="scss"></style>
