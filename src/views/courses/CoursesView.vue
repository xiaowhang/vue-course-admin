<template>
  <div>
    <h1>Courses</h1>
    <p>Here is a list of courses</p>
  </div>
</template>

<script setup lang="ts">
import { useCourses } from '@/composables'

const {} = useCourses()
</script>

<style scoped lang="scss"></style>
