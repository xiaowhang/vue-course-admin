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
import { useLogin } from '@/composables'

const { form, rules, formRef, onSubmit, isLoading } = useLogin()
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
