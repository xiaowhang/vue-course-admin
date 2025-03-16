<template>
  <el-card>
    <template #header>
      <el-form :inline="true" :model="queryParams">
        <el-form-item label="课程名称" prop="courseName">
          <el-input
            v-model="queryParams.courseName"
            placeholder="请输入课程名称"
            clearable
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="状态" :prop="['createTime', 'updateTime']">
          <el-select v-model="queryParams.status" placeholder="请选择状态" style="width: 200px">
            <el-option label="全部" value="all" />
            <el-option label="启用" value="ENABLE" />
            <el-option label="禁用" value="DISABLE" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getPages()">搜索</el-button>
        </el-form-item>
      </el-form>

      <el-button type="primary" plain @click="router.push({ name: 'courses-create' })">
        新建课程
      </el-button>
    </template>

    <template #default>
      <el-table :data="coursePages?.records" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="60" align="center" />
        <el-table-column prop="courseName" label="课程名称" min-width="180" align="center" />
        <el-table-column prop="price" label="价格" min-width="120" align="center" />
        <el-table-column prop="sortNum" label="排序" min-width="80" align="center" />
        <el-table-column prop="status" label="状态" width="150" align="center" #default="{ row }">
          <el-switch
            v-model="row.status"
            style="--el-switch-on-color: #13ce66"
            active-value="ENABLE"
            inactive-value="DISABLE"
            active-text="上架"
            inactive-text="下架"
            :before-change="handleChangeStatu(row.id, row.status)"
          />
        </el-table-column>
        <el-table-column label="操作" width="200" align="center" #default="{ row }">
          <el-button @click="router.push({ name: 'courses-edit', params: { courseId: row.id } })">
            编辑
          </el-button>
          <el-button @click="">内容管理</el-button>
        </el-table-column>
      </el-table>
    </template>

    <template #footer>
      <el-pagination
        v-model:page-size="coursePages.size"
        v-model:current-page="coursePages.current"
        size="large"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[5, 10, 20, 50]"
        :total="coursePages?.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { useCourses } from '@/composables'

const router = useRouter()

const {
  queryParams,
  coursePages,
  handleSizeChange,
  handleCurrentChange,
  getPages,
  handleChangeStatu,
} = useCourses()
</script>

<style scoped lang="scss">
.el-card {
  margin: 20px;
  width: 90%;
}
</style>
