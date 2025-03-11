<template>
  <el-main>
    <el-scrollbar>
      <RouterView />
    </el-scrollbar>
  </el-main>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AppMain',
})
</script>

<style scoped lang="scss">
.el-main {
  padding: 0;
}
</style>
