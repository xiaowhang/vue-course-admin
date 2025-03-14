<template>
  <el-card>
    <template #header>
      <el-form :inline="true" :model="queryParams">
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="queryParams.phone"
            placeholder="请输入手机号"
            clearable
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="注册时间" :prop="['createTime', 'updateTime']">
          <el-date-picker
            v-model="timeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getPages()">搜索</el-button>
        </el-form-item>
      </el-form>
    </template>

    <template #default>
      <el-table :data="userPages?.records" border style="width: 100%">
        <el-table-column prop="id" label="用户ID" width="60" align="center" />
        <el-table-column label="头像" width="80" align="center" #default="{ row }">
          <el-avatar :src="row.portrait || circleUrl" />
        </el-table-column>
        <el-table-column prop="name" label="用户名" min-width="180" align="center" />
        <el-table-column prop="phone" label="手机号" min-width="180" align="center" />
        <el-table-column
          prop="createTime"
          :formatter="formatDate"
          label="注册时间"
          min-width="120"
          align="center"
        />
        <el-table-column prop="status" label="状态" width="150" align="center" #default="{ row }">
          <el-switch
            v-model="row.status"
            style="--el-switch-on-color: #13ce66"
            active-value="ENABLE"
            inactive-value="DISABLE"
            active-text="启用"
            inactive-text="禁用"
            @change="handleChange($event as 'ENABLE' | 'DISABLE', row.id)"
          />
        </el-table-column>
        <el-table-column label="操作" width="120" align="center" #default="{ row }">
          <el-button @click="dialogRef?.handleEdit(row.id)">分配角色</el-button>
        </el-table-column>
      </el-table>
    </template>

    <template #footer>
      <el-pagination
        v-model:page-size="userPages.size"
        v-model:current-page="userPages.current"
        size="large"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[5, 10, 20, 50]"
        :total="userPages?.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </el-card>
  <DialogCreateEdit ref="dialogRef" />
</template>

<script setup lang="ts">
import { useUsers } from '@/composables'
import { formatDate } from '@/utils'
import DialogCreateEdit from '@/views/users/DialogCreateEdit.vue'

const {
  userPages,
  handleChange,
  queryParams,
  getPages,
  timeRange,
  handleSizeChange,
  handleCurrentChange,
} = useUsers()

console.log(userPages)

const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const dialogRef = ref<InstanceType<typeof DialogCreateEdit>>()
</script>

<style scoped lang="scss">
.el-card {
  margin: 20px;
  width: 90%;
}
</style>
