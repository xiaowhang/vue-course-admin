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
        <el-button>取消</el-button>
        <el-button type="primary"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useResources } from '@/composables'

const { dialogFormVisible, msgText, handleCreate, handleEdit } = useResources()

const formLabelWidth = '80px'

const form = ref({
  name: '',
  sort: 0,
})

defineExpose({
  handleCreate,
  handleEdit,
})
</script>

<style scoped lang="scss"></style>
