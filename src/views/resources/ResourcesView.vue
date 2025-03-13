<template>
  <el-card>
    <template #header>
      <h2>资源管理</h2>
      <el-button type="primary"> 创建类别 </el-button>
    </template>
    <el-button>添加</el-button>
    <el-button>资源类别 </el-button>
    <el-table :data="resources?.records" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column prop="name" label="资源名称" min-width="150" align="center" />
      <el-table-column prop="url" label="资源路径" min-width="90" align="center" />
      <el-table-column prop="description" label="描述" min-width="180" align="center" />
      <el-table-column
        prop="createdTime"
        :formatter="timeFormatter"
        label="创建时间"
        min-width="120"
        align="center"
      />
      <el-table-column label="操作" width="180" align="center" #default="{ row }">
        <el-button type="primary" plain> 编辑 </el-button>
        <el-button type="danger" plain>删除</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { useResources } from '@/composables'
import { timeFormatter } from '@/utils'

const { resources, queryResources } = useResources()

onMounted(() => {
  queryResources()
})
</script>

<style scoped lang="scss">
.el-card {
  margin: 20px;
  width: 90%;

  .el-table {
    margin-top: 20px;
  }

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
