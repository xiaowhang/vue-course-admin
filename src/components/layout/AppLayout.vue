<template>
  <el-container class="layout">
    <AppAside />
    <el-container direction="vertical">
      <AppHeader />
      <AppMain />
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { AppAside, AppHeader, AppMain } from '@/components'

defineOptions({
  name: 'AppLayout',
})
</script>

<style scoped lang="scss">
.layout {
  height: 100vh;
}
</style>
