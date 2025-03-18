<template>
  <el-container direction="vertical">
    <el-page-header @back="router.back">
      <template #content>
        <div>{{ courseDetail.courseName }}</div>
      </template>
      <template #extra>
        <div>
          <el-button type="primary" :icon="Plus" @click="sectionDialogRef?.handleShow()">
            添加章节
          </el-button>
        </div>
      </template>
    </el-page-header>
    <el-card>
      <el-tree :data="sectionAndLesson" :props="treeProps">
        <template #default="{ node, data }">
          <div class="custom-tree-node">
            <span>{{ node.label }}</span>
            <div v-if="node.level === 1">
              <el-button @click.stop="sectionDialogRef?.handleShow(data)"> 编辑 </el-button>
              <el-button type="primary" @click.stop="lessonDialogRef?.handleShow(node)">
                添加课时
              </el-button>
              <el-button
                text
                style="width: 80px"
                @click.stop="sectionStatusDialogRef?.handleShow(courseDetail, data)"
              >
                {{ sectionStatus[data.status] }}
              </el-button>
            </div>
            <div v-else>
              <el-button @click.stop="lessonDialogRef?.handleShow(node)"> 编辑 </el-button>
              <el-button type="success" plain> 上传视频 </el-button>
              <el-button text type="info" style="width: 80px">
                {{ lessonStatus[data.status] }}
              </el-button>
            </div>
          </div>
        </template>
      </el-tree>
    </el-card>
    <SectionDialogCreateEdit ref="sectionDialogRef" :courseName="courseDetail.courseName" />
    <SectionStatusChange ref="sectionStatusDialogRef" />
    <LessonDialogCreateEdit ref="lessonDialogRef" :courseName="courseDetail.courseName" />
  </el-container>
</template>

<script setup lang="ts">
import { useCourseContent } from '@/composables'
import { Plus } from '@element-plus/icons-vue'
import SectionDialogCreateEdit from '@/views/courses/SectionDialogCreateEdit.vue'
import SectionStatusChange from '@/views/courses/SectionStatusChange.vue'
import LessonDialogCreateEdit from '@/views/courses/LessonDialogCreateEdit.vue'

const router = useRouter()

const props = defineProps<{
  courseId: string
}>()

const { courseDetail, sectionAndLesson, treeProps } = useCourseContent(props)

const sectionDialogRef = ref<InstanceType<typeof SectionDialogCreateEdit>>()
const sectionStatusDialogRef = ref<InstanceType<typeof SectionStatusChange>>()
const lessonDialogRef = ref<InstanceType<typeof LessonDialogCreateEdit>>()

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
