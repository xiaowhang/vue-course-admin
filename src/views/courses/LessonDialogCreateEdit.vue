<template>
  <el-dialog v-model="dialogFormVisible" :title="msgText + '课时'" width="500" @closed="resetForm">
    <el-form :model="form" ref="formRef" label-position="top">
      <el-form-item label="课程名称" :label-width="formLabelWidth" prop="courseName">
        <el-input v-model="form.courseName" autocomplete="off" disabled />
      </el-form-item>
      <el-form-item label="章节名称" :label-width="formLabelWidth" prop="sectionName">
        <el-input v-model="form.sectionName" autocomplete="off" disabled />
      </el-form-item>
      <el-form-item label="课时名称" :label-width="formLabelWidth" prop="theme">
        <el-input v-model="form.theme" autocomplete="off" />
      </el-form-item>
      <el-form-item label="时长" :label-width="formLabelWidth" prop="durationNum">
        <el-input-number v-model="form.durationNum" autocomplete="off" controls-position="right" />
      </el-form-item>
      <el-form-item label="是否开放试听" :label-width="formLabelWidth" prop="isFree">
        <el-switch v-model="form.isFree" />
      </el-form-item>
      <el-form-item label="课时排序" :label-width="formLabelWidth" prop="orderNum">
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
import { useLessonDialog } from '@/composables'

const props = defineProps<{
  courseName: string | undefined
}>()

const {
  dialogFormVisible,
  form,
  formLabelWidth,
  msgText,
  resetForm,
  handleSubmit,
  onClose,
  defaultForm,
  handleShow,
} = useLessonDialog()

watch(
  () => props.courseName,
  (newVal) => {
    form.value.courseName = newVal
    defaultForm.value.courseName = newVal!
    stop()
  },
)

defineExpose({ handleShow })
</script>

<style scoped lang="scss"></style>
