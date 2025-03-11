<template>
  <div class="login-container">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="auto"
      label-position="top"
      size="large"
    >
      <div class="el-form__label">登录</div>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit(formRef)" :loading="isLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { login } from '@/api'
import { useAuthStore } from '@/stores'

const formRef = ref<FormInstance>()
const form = reactive({
  phone: '18201288771',
  password: '111111',
})

// 表单验证规则
const rules = reactive<FormRules>({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'change' },
  ],
})

const isLoading = ref(false)
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const onSubmit = async (fromEl: FormInstance | undefined) => {
  if (!fromEl) return
  isLoading.value = true

  try {
    const valid = await fromEl.validate()
    if (!valid) return

    const res = await login(form)
    if (!res.data.success) {
      ElMessage.error('账号或密码错误')
      return
    }
    ElMessage.success('登录成功')
    authStore.setToken(res.data.content)
    router.push((route.query.redirect as string) || '/')
  } catch (error) {
    ElMessage.error('登录失败，请重试')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background-color: #e6e8eb;

  .el-form {
    width: 400px;
    background-color: #fafafa;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .el-form__label {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .el-button {
      margin-top: 20px;
      width: 100%;
    }
  }
}
</style>
