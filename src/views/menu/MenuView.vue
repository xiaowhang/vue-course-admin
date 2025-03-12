<template>
  <el-card>
    <template #header>
      <el-button type="primary" :icon="Plus">添加菜单</el-button>
    </template>
    <el-table :data="menus" border style="width: 100%">
      <el-table-column type="index" label="编号" width="60" align="center" />
      <el-table-column prop="name" label="菜单名称" min-width="180" align="center" />
      <el-table-column prop="level" label="菜单层级" min-width="60" align="center" />
      <el-table-column prop="icon" label="菜单图标" min-width="90" align="center" />
      <el-table-column prop="orderNum" label="排序" min-width="60" align="center" />
      <el-table-column label="操作" width="180" align="center">
        <el-button type="primary" plain>编辑</el-button>
        <el-button type="danger" plain>删除</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { getAllMenus } from '@/api/menus'
import type { MenuType } from '@/api/menus'

defineOptions({
  name: 'MenuView',
})

const menus = ref([] as MenuType[])

onMounted(async () => {
  const { data } = await getAllMenus()
  if (data.code === '000000') menus.value = data.data
})
</script>

<style scoped lang="scss">
.el-card {
  margin: 20px;
  width: auto;
}
</style>
