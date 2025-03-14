<template>
  <el-container direction="vertical">
    <AllocCategory
      v-for="roleResource in roleResources"
      :key="roleResource.id"
      :roleResource="roleResource"
      @postCheckedIdsRef="handleCheckedIdsRef"
    />
  </el-container>
</template>

<script setup lang="ts">
import { useRoleResource } from '@/composables'
import AllocCategory from '@/views/roles/AllocResourcesCategory.vue'

const props = defineProps({
  roleId: {
    type: Number,
    required: true,
  },
})

const { roleResources, loadRoleResources, handleCheckedIdsRef } = useRoleResource(props.roleId)

onMounted(async () => {
  await loadRoleResources()
})
</script>

<style scoped lang="scss">
::v-deep(.el-card:nth-child(n + 2)) {
  margin-top: 20px;
}

.el-card {
  min-width: 600px;
}
</style>
