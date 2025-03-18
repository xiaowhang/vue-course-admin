<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '章节'" width="500" @closed="resetForm">
    <el-form :model="form" ref="formRef" label-position="top">
      <el-form-item label="课程名称" :label-width="formLabelWidth" prop="courseName">
        <el-input v-model="form.courseName" autocomplete="off" disabled />
      </el-form-item>
      <el-form-item label="章节名称" :label-width="formLabelWidth" prop="sectionName">
        <el-input v-model="form.sectionName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="章节描述" :label-width="formLabelWidth" prop="description">
        <el-input v-model="form.description" autocomplete="off" type="textarea" />
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth" prop="sort">
        <el-input-number v-model="form.orderNum" autocomplete="off" controls-position="right" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit"> 提交 </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useDialogCreateEdit } from '@/composables'
import { saveSection } from '@/api'

const props = defineProps<{
  courseName: string
}>()

const defaultForm = ref({
  courseName: '',
  sectionName: '',
  description: '',
  orderNum: 0,
})

const {
  handleFormSubmit,
  form,
  dialogFormVisible,
  msgText,
  resetForm,
  onClose,
  handleCreate,
  handleEdit,
} = useDialogCreateEdit(defaultForm)

const handleSubmit = handleFormSubmit(saveSection)

watch(
  () => props.courseName,
  (newVal) => {
    form.value.courseName = newVal
    defaultForm.value.courseName = newVal
  },
)

const formLabelWidth = '80px'

defineExpose({
  handleCreate,
  handleEdit,
})
</script>

<style scoped lang="scss"></style>
