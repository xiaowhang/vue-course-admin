<template>
  <el-container direction="vertical" style="height: 400px">
    <QuillEditor theme="snow" />
  </el-container>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
:deep(.ql-editor) {
  max-height: 350px;
}
</style>
