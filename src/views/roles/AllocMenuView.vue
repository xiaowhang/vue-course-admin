<template>
  <el-card>
    <el-tree
      :props="nodeStruct"
      :data="roleMenus"
      show-checkbox
      node-key="id"
      :default-checked-keys="CheckedIds"
      ref="treeRef"
    />

    <template #header>
      <el-button @click="onSave" type="primary">保存</el-button>
      <el-button @click="onClear" type="info" plain>清空</el-button>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { useRoleMenu } from '@/composables'

const props = defineProps({
  roleId: {
    type: Number,
    required: true,
  },
})

const { roleMenus, loadRoleMenus, nodeStruct, CheckedIds, treeRef, onSave, onClear } = useRoleMenu(
  props.roleId,
)

onMounted(async () => {
  await loadRoleMenus()
})
</script>

<style scoped lang="scss">
.el-card {
  margin: 20px;
  width: 80%;
  min-width: 200px;

  .el-tree {
    min-height: 60vh;
    max-height: 80%;
  }
}
</style>
