<template>
  <el-card>
    <template #header>
      <el-form :inline="true" :model="queryParameters" ref="formRef">
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="queryParameters.name" placeholder="资源名称" clearable />
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input v-model="queryParameters.url" placeholder="资源路径" clearable />
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select v-model="queryParameters.categoryId" placeholder="资源分类">
            <el-option label="不限" :value="-1" />
            <el-option
              v-for="category in allResourceCategories"
              :label="category.name"
              :value="category.id"
              :key="category.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm">重置</el-button>
          <el-button @click="queryResources()" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #default>
      <el-button>添加</el-button>
      <el-button @click="router.push({ name: 'resource-category' })">资源类别 </el-button>
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
    </template>

    <template #footer>
      <el-pagination
        v-model:page-size="resources.size"
        v-model:current-page="resources.current"
        size="large"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[5, 10, 20, 50]"
        :total="resources?.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { useResources, useResourceCategory } from '@/composables'
import { timeFormatter } from '@/utils'

const {
  queryParameters,
  resources,
  queryResources,
  formRef,
  resetForm,
  handleSizeChange,
  handleCurrentChange,
} = useResources()
const { allResourceCategories, loadResourceCategories } = useResourceCategory()

const router = useRouter()

onMounted(() => {
  queryResources()
  loadResourceCategories()
})
</script>

<style scoped lang="scss">
.el-card {
  margin: 20px;
  width: 90%;

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
