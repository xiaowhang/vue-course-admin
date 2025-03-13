<template>
  <el-card>
    <template #header>
      <el-button @click="dialogRef?.handleCreate">添加角色</el-button>
      <el-form :inline="true" :model="queryParameters" ref="formRef">
        <el-form-item label="筛选" prop="name">
          <el-input v-model="queryParameters.name" placeholder="角色名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button>重置</el-button>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #default>
      <el-table :data="roles?.records" border style="width: 100%">
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="name" label="资源名称" min-width="120" align="center" />
        <el-table-column prop="description" label="描述" min-width="180" align="center" />
        <el-table-column
          prop="createdTime"
          :formatter="timeFormatter"
          label="创建时间"
          min-width="90"
          align="center"
        />
        <el-table-column label="操作" width="180" align="center" #default="{ row }">
          <el-button type="primary" plain link> 分配菜单 </el-button>
          <el-button type="primary" plain link> 分配资源 </el-button>
          <el-button type="primary" plain link> 编辑 </el-button>
          <el-button type="danger" plain link>删除</el-button>
        </el-table-column>
      </el-table>
    </template>

    <template #footer>
      <el-pagination
        v-model:page-size="roles.size"
        v-model:current-page="roles.current"
        size="large"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[5, 10, 20, 50]"
        :total="roles?.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </el-card>
  <DialogCreateEdit ref="dialogRef" />
</template>

<script setup lang="ts">
import { useRoles } from '@/composables'
import { timeFormatter } from '@/utils'
import DialogCreateEdit from '@/views/roles/DialogCreateEdit.vue'

const { queryParameters, roles, queryRoles, handleSizeChange, handleCurrentChange } = useRoles()

onMounted(() => {
  queryRoles()
})

const dialogRef = useTemplateRef<InstanceType<typeof DialogCreateEdit>>('dialogRef')
</script>

<style scoped lang="scss">
.el-card {
  margin: 20px;
  width: 90%;

  .el-form {
    float: right;
  }

  .el-table {
    margin-top: 20px;
  }

  .el-input {
    --el-input-width: 220px;
  }
  .el-select {
    --el-select-width: 150px;
    margin-right: 70px;
  }
}
</style>
