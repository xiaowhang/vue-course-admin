<template>
  <el-card>
    <el-tree
      :props="nodeStruct"
      :data="roleMenus"
      show-checkbox
      node-key="id"
      :default-checked-keys="CheckedIds"
    />
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

const { roleMenus, loadRoleMenus, nodeStruct, CheckedIds, getCheckedIds } = useRoleMenu()

onMounted(async () => {
  await loadRoleMenus(props.roleId)
})
</script>

<style scoped lang="scss">
.el-card {
  margin: 20px;
  width: 80%;
  min-height: 60vh;
}
</style>
