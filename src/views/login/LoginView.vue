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
        <el-button type="primary" @click="onSubmit(formRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { login } from '@/api'

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

const onSubmit = async (fromEl: FormInstance | undefined) => {
  if (!fromEl) return
  await fromEl.validate((valid) => {
    if (!valid) return

    login(form).then((res) => {
      if (!res.data.success) {
        ElMessage.error('账号或密码错误')
        return
      }

      ElMessage.success('登录成功')
    })
  })
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
