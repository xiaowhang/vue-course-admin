<template>
  <el-main>
    <el-scrollbar :view-style="viewStyle">
      <RouterView />
    </el-scrollbar>
  </el-main>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AppMain',
})

const viewStyle = {
  minHeight: '100%',
  padding: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#e6e8eb',
}
</script>

<style scoped lang="scss">
.el-main {
  padding: 0;
}
</style>
