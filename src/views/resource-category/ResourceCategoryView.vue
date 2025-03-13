<template>
  <div>
    <h1>ResourceCategroyView</h1>
  </div>
</template>

<script setup lang="ts">
import { useResourceCategory } from '@/composables'

const { allResourceCategories, loadResourceCategories } = useResourceCategory()

loadResourceCategories()
</script>

<style scoped lang="scss"></style>
