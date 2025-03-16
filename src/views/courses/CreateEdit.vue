<template>
  <el-container direction="vertical">
    <el-page-header @back="router.back">
      <template #content>
        <span> {{ title }} </span>
      </template>
      <template #extra>
        <div>
          <el-button type="primary">保存</el-button>
        </div>
      </template>
    </el-page-header>
    <el-card>
      <template #header>
        <el-steps :active="currentStep" simple>
          <el-step
            v-for="(step, index) in steps"
            :key="step.title"
            :title="step.title"
            :icon="step.icon"
            @click="currentStep = index"
          />
        </el-steps>
      </template>
      <el-form>
        <div v-show="currentStep === 0">基本信息</div>
        <div v-show="currentStep === 1">课程封面</div>
        <div v-show="currentStep === 2">销售信息</div>
        <div v-show="currentStep === 3">秒杀活动</div>
        <div v-show="currentStep === 4">课程详情</div>
        <div class="form-bottom-btns">
          <el-button @click="currentStep--" v-show="currentStep"> 上一步 </el-button>
          <el-button @click="currentStep++" v-show="currentStep !== 4"> 下一步 </el-button>
          <el-button v-show="currentStep === 4" type="primary"> 提交 </el-button>
        </div>
      </el-form>
    </el-card>
  </el-container>
</template>

<script setup lang="ts">
import { EditPen, Tools, Picture, Clock, Document } from '@element-plus/icons-vue'

const props = defineProps<{
  courseId?: string
}>()

const steps = [
  { title: '基本信息', icon: EditPen },
  { title: '课程封面', icon: Tools },
  { title: '销售信息', icon: Picture },
  { title: '秒杀活动', icon: Clock },
  { title: '课程详情', icon: Document },
]

const router = useRouter()

const title = computed(() => {
  return props.courseId ? '编辑' : '新建'
})

const currentStep = ref<number>(0)
</script>

<style scoped lang="scss">
.el-card {
  margin: 20px;

  .el-step {
    cursor: pointer;
  }

  .form-bottom-btns {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
