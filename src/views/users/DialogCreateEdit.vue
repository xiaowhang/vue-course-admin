<template>
  <el-dialog v-model="dialogFormVisible" title="分配角色" width="500">
    <!-- <el-form :model="form" ref="formRef">
      <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form> -->
    <template #footer>
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button @click="handleSubmit" type="primary"> 提交 </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useUsersDialog } from '@/composables'

const { dialogFormVisible, handleShow } = useUsersDialog()

const handleSubmit = () => {
  ElMessage.success('提交成功')
  dialogFormVisible.value = false
}

defineExpose({
  handleShow,
})
</script>

<style scoped lang="scss"></style>
