<template>
  <el-dialog v-model="dialogVisible" title="课时状态" width="30%">
    <el-result icon="info" :title="title" />
    <el-form :model="form">
      <el-form-item label="课时状态">
        <el-select v-model="form.status" placeholder="请选择课时状态">
          <el-option
            v-for="(item, index) in Object.values(lessonStatus).filter(
              (v) => typeof v === 'string',
            )"
            :key="index"
            :label="item"
            :value="index"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="handleSubmit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useLessonStatusChange } from '@/composables'

const { dialogVisible, form, title, handleShow, handleSubmit, lessonStatus } =
  useLessonStatusChange()

defineExpose({ handleShow })
</script>

<style scoped lang="scss">
.el-form {
  padding: 0 80px;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
