<template>
  <el-card>
    <template #header>
      <el-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
        size="large"
      >
        {{ roleResource.name }}
      </el-checkbox>
    </template>
    <el-checkbox-group v-model="checkedList" @change="handleCheckedCitiesChange">
      <el-row>
        <el-col :span="6" v-for="resource in resourceList" :key="resource.id">
          <el-checkbox :label="resource.name" :value="resource.id" />
        </el-col>
      </el-row>
    </el-checkbox-group>
  </el-card>
</template>

<script setup lang="ts">
import type { roleResourcesItemType } from '@/api'
import { useRoleResourceCategory } from '@/composables'

const props = defineProps({
  roleResource: {
    type: Object as PropType<roleResourcesItemType>,
    required: true,
  },
})

const {
  checkAll,
  isIndeterminate,
  resourceList,
  checkedList,

  handleCheckAllChange,
  handleCheckedCitiesChange,
} = useRoleResourceCategory(props.roleResource)

onMounted(() => {
  checkedList.value = resourceList.value
    .filter((resource) => resource.selected)
    .map((resource) => resource.id)
})
</script>

<style scoped lang="scss"></style>
