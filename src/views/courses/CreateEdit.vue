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
      <el-form label-width="auto">
        <!-- 基本信息 -->
        <div v-show="currentStep === 0">
          <el-form-item label="课程名称">
            <el-input v-model="courseInfo.courseName" maxlength="100" show-word-limit />
          </el-form-item>
          <el-form-item label="课程简介">
            <el-input v-model="courseInfo.brief" />
          </el-form-item>
          <el-form-item label="讲师姓名">
            <el-input v-model="courseInfo.teacherDTO.teacherName" />
          </el-form-item>
          <el-form-item label="讲师职位">
            <el-input v-model="courseInfo.teacherDTO.position" />
          </el-form-item>
          <el-form-item label="讲师简介">
            <el-input v-model="courseInfo.teacherDTO.description" />
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input v-model="courseInfo.previewFirstField" style="flex: 1; margin-right: 10px" />
            <el-input v-model="courseInfo.previewSecondField" style="flex: 1" />
          </el-form-item>
          <el-form-item label="课程排序">
            <el-input-number v-model="courseInfo.sortNum" :min="0" />
          </el-form-item>
        </div>
        <!-- 课程封面 -->
        <div v-show="currentStep === 1" class="course-cover">
          课程封面：
          <ImageUpload
            v-model:courseListImg="courseInfo.courseListImg"
            v-model:courseImgUrl="courseInfo.courseImgUrl"
          />
        </div>
        <div v-show="currentStep === 2">
          <el-form-item label="销售价格">
            <el-input-number v-model="courseInfo.discounts" controls-position="right" :min="0" />
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input-number v-model="courseInfo.price" controls-position="right" :min="0" />
          </el-form-item>
          <el-form-item label="销量">
            <el-input-number v-model="courseInfo.sales" controls-position="right" :min="0" />
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input v-model="courseInfo.discountsTag" />
          </el-form-item>
        </div>
        <div v-show="currentStep === 3">
          <el-form-item label="限时秒杀">
            <el-switch v-model="courseInfo.activityCourse" />
          </el-form-item>
          <div v-show="courseInfo.activityCourse">
            <el-form-item label="活动时间">
              <el-date-picker
                v-model="activityTimeRange"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </el-form-item>
            <el-form-item label="活动价格">
              <el-input-number
                v-model="courseInfo.activityDTO.amount"
                controls-position="right"
                :min="0"
              />
            </el-form-item>
            <el-form-item label="库存量">
              <el-input-number
                v-model="courseInfo.activityDTO.stock"
                controls-position="right"
                :min="0"
              />
            </el-form-item>
          </div>
        </div>
        <div v-show="currentStep === 4">
          <el-form-item label="课程详情">
            <TextEditor v-model="courseInfo.courseDescriptionMarkDown" />
          </el-form-item>
          <el-form-item label="是否上架">
            <el-switch v-model="courseInfo.status" :active-value="1" :inactive-value="0" />
          </el-form-item>
        </div>
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
import { useCoursesCreateEdit } from '@/composables'
import { ImageUpload, TextEditor } from '@/components'

const props = defineProps<{
  courseId?: string
}>()

const router = useRouter()
const { title, steps, currentStep, courseInfo, activityTimeRange } = useCoursesCreateEdit(props)
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

  .course-cover {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .el-form {
    padding: 0 40px;
  }
}
</style>
