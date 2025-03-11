<template>
  <div class="login-container">
    <el-form :model="form" label-width="auto" label-position="top" size="large">
      <div class="el-form__label">登录</div>
      <el-form-item label="账号">
        <el-input v-model="form.account" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
// do not use same name with ref
const form = reactive({
  account: 'admin',
  password: 'admin',
})

const onSubmit = () => {
  ElMessage.success('submit success')
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
