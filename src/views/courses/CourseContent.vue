<template>
  <el-container direction="vertical">
    <el-page-header @back="router.back">
      <template #content>
        <div>{{ courseDetail.courseName }}</div>
      </template>
      <template #extra>
        <div>
          <el-button type="primary" :icon="Plus">添加章节</el-button>
        </div>
      </template>
    </el-page-header>
    <el-card>
      <el-tree :data="sectionAndLesson" :props="treeProps">
        <template #default="{ node, data }">
          <div class="custom-tree-node">
            <span>{{ node.label }}</span>
            <div v-if="node.level === 1">
              <el-button> 编辑 </el-button>
              <el-button type="primary"> 添加课时 </el-button>
              <el-button plain style="width: 80px"> {{ sectionStatus[data.status] }} </el-button>
            </div>
            <div v-else>
              <el-button> 编辑 </el-button>
              <el-button type="success" plain> 上传视频 </el-button>
              <el-button plain style="width: 80px"> {{ lessonStatus[data.status] }} </el-button>
            </div>
          </div>
        </template>
      </el-tree>
    </el-card>
  </el-container>
</template>

<script setup lang="ts">
import { useCourseContent } from '@/composables'
import { Plus } from '@element-plus/icons-vue'

const router = useRouter()

const props = defineProps<{
  courseId: string
}>()

const { courseDetail, sectionAndLesson, treeProps } = useCourseContent(props)

enum sectionStatus {
  '隐藏',
  '待更新',
  '已发布',
}

enum lessonStatus {
  '隐藏',
  '未发布',
  '已发布',
}
</script>

<style scoped lang="scss">
.el-page-header {
  margin-bottom: 20px;
}

:deep(.el-tree-node__content) {
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  font-size: 18px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
