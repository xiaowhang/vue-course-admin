<template>
  <div>{{ props }}</div>
</template>

<script setup lang="ts">
import { useCourseContent } from '@/composables'

const props = defineProps<{
  courseId: string
}>()

const { courseDetail } = useCourseContent(props)
</script>

<style scoped lang="scss"></style>
