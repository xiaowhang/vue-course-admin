<template>
  <el-main>
    <el-scrollbar :view-style="viewStyle">
      <RouterView />
    </el-scrollbar>
    <el-backtop target=".el-main .el-scrollbar__wrap" :right="60" :bottom="60" />
  </el-main>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AppMain',
})

const route = useRoute()

const defaultStyle = {
  minHeight: '100%',
  padding: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#e6e8eb',
}

const viewStyle = computed(() => ({
  ...defaultStyle,
  ...(route.meta.layoutStyle || {}),
}))
</script>

<style scoped lang="scss">
.el-main {
  padding: 0;
}
</style>
