<template>
  <el-card>
    <template #header>
      <h2>资源类别管理</h2>
      <el-button type="primary" :icon="Plus" @click="dialogRef?.handleCreate"> 创建类别 </el-button>
    </template>
    <el-table :data="allResourceCategories" border style="width: 100%">
      <el-table-column type="index" label="编号" width="60" align="center" />
      <el-table-column prop="name" label="类别名称" min-width="180" align="center" />
      <el-table-column
        prop="createdTime"
        :formatter="timeFormatter"
        label="创建时间"
        min-width="120"
        align="center"
      />
      <el-table-column prop="sort" label="排序" min-width="60" align="center" />
      <el-table-column label="操作" width="180" align="center" #default="{ row }">
        <el-button type="primary" plain @click="dialogRef?.handleEdit(row.id)"> 编辑 </el-button>
        <el-button type="danger" plain @click="handleDelete(row.id)">删除</el-button>
      </el-table-column>
    </el-table>
    <DialogCreateEdit ref="dialogRef" />
  </el-card>
</template>

<script setup lang="ts">
import { useResourceCategory } from '@/composables'
import { Plus } from '@element-plus/icons-vue'
import { timeFormatter } from '@/utils'
import DialogCreateEdit from '@/views/resource-category/DialogCreateEdit.vue'

const { allResourceCategories, loadResourceCategories, handleDelete } = useResourceCategory()

onMounted(() => {
  loadResourceCategories()
})

const dialogRef = useTemplateRef<InstanceType<typeof DialogCreateEdit>>('dialogRef')
</script>

<style scoped lang="scss">
.el-card {
  margin: 20px;
  width: 80%;

  ::v-deep(.el-card__header) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 24px;
      font-weight: 600;
    }
  }
}
</style>
