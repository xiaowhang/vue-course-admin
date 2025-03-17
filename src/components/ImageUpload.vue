<template>
  <el-progress v-show="isShowProgress" type="circle" :percentage="percentage" :width="200" />
  <el-upload
    v-show="!isShowProgress"
    class="uploader"
    action="/api/boss/course/upload"
    :show-file-list="false"
    :on-success="handleSuccess"
    :before-upload="beforeUpload"
    :on-progress="handleProgress"
    :on-change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" class="image" />
    <el-icon v-else class="uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup lang="ts">
import { useImageUpload } from '@/composables'
import { Plus } from '@element-plus/icons-vue'

const courseListImg = defineModel('courseListImg', { type: String, required: true })
const courseImgUrl = defineModel('courseImgUrl', { type: String, required: true })

const {
  imageUrl,
  handleSuccess,
  beforeUpload,
  isShowProgress,
  percentage,
  handleProgress,
  handleChange,
} = useImageUpload(courseListImg, courseImgUrl)
</script>

<style scoped lang="scss">
.uploader .image {
  height: 200px;
}

.el-progress {
  width: 200px;
  height: 200px;
  margin-bottom: 8px;
}

:global(.uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  margin-bottom: 8px;
}

:global(.uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

::v-deep(.el-icon.uploader-icon) {
  font-size: 28px;
  color: #b1bfd2;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
