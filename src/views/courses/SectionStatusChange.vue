<template>
  <el-dialog v-model="dialogVisible" title="章节状态" width="30%">
    <el-result icon="info" :title="title" />
    <el-form :model="form">
      <el-form-item label="章节状态">
        <el-select v-model="form.sectionStatus" placeholder="请选择章节状态">
          <el-option
            v-for="(item, index) in Object.values(sectionStatus).filter(
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
        <el-button type="primary" @click="dialogVisible = false"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
const dialogVisible = ref(false)

const form = ref({
  sectionStatus: 0,
})

const title = ref('')

const openDialog = (course: any, section: any) => {
  dialogVisible.value = true
  title.value = '当前章节状态：' + sectionStatus[section.status]
  form.value.sectionStatus = section.status
}

enum sectionStatus {
  '隐藏',
  '待更新',
  '已发布',
}

defineExpose({ openDialog })
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
