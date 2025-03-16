<template>
  <el-container direction="vertical">
    <el-page-header @back="router.back">
      <template #content>
        <span> {{ title }} </span>
      </template>
      <template #extra>
        <div>
          <el-button type="primary">保存</el-button>
        </div>
      </template>
    </el-page-header>
  </el-container>
</template>

<script setup lang="ts">
const props = defineProps<{
  courseId: string
}>()

const router = useRouter()

const title = computed(() => {
  return props.courseId ? '编辑' : '新建'
})
</script>

<style scoped lang="scss"></style>
