<template>
  <div>{{ props }}</div>
</template>

<script setup lang="ts">
const props = defineProps<{
  courseId: string
}>()
</script>

<style scoped lang="scss"></style>
