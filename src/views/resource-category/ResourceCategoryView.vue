<template>
  <el-card>
    <template #header>
      <h2>资源类别管理</h2>
      <el-button type="primary" :icon="Plus" @click="dialogRef?.handleCreate"> 创建类别 </el-button>
    </template>
    <el-table :data="ResourceCategories" border style="width: 100%">
      <el-table-column type="index" label="编号" width="60" align="center" />
      <el-table-column prop="name" label="类别名称" min-width="180" align="center" />
      <el-table-column
        prop="createdTime"
        :formatter="formatDateTime"
        label="创建时间"
        min-width="120"
        align="center"
      />
      <el-table-column prop="sort" label="排序" min-width="60" align="center" />
      <el-table-column label="操作" width="180" align="center" #default="{ row }">
        <el-button @click="dialogRef?.handleEdit(row)" type="primary" plain> 编辑 </el-button>
        <el-button @click="handleDelete(row.id)" type="danger" plain> 删除 </el-button>
      </el-table-column>
    </el-table>
  </el-card>
  <DialogCreateEdit ref="dialogRef" />
</template>

<script setup lang="ts">
import { useResourceCategory } from '@/composables'
import { Plus } from '@element-plus/icons-vue'
import { formatDateTime } from '@/utils'
import DialogCreateEdit from '@/views/resource-category/DialogCreateEdit.vue'

const { ResourceCategories, loadResourceCategories, handleDelete } = useResourceCategory()

onMounted(() => {
  loadResourceCategories()
})

const dialogRef = ref<InstanceType<typeof DialogCreateEdit>>()
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
