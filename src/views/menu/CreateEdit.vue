<template>
  <el-form :model="form" label-width="auto" size="large" ref="formRef">
    <el-form-item label="菜单名称" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="菜单路径" prop="href">
      <el-input v-model="form.href" />
    </el-form-item>
    <el-form-item label="上级菜单" prop="parentId">
      <el-select v-model="form.parentId" placeholder="请选择上级菜单">
        <el-option label="顶层菜单" :value="-1"></el-option>
        <el-option
          v-for="item in topMenus"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="form.description" />
    </el-form-item>
    <el-form-item label="图标名称" prop="icon">
      <el-input v-model="form.icon" />
    </el-form-item>
    <el-form-item label="是否显示" prop="shown">
      <el-radio-group v-model="form.shown">
        <el-radio :value="true">显示</el-radio>
        <el-radio :value="false">隐藏</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="排序" prop="orderNum">
      <el-input v-model="form.orderNum" />
    </el-form-item>

    <el-form-item class="el-form-item__buttons">
      <el-button type="primary" @click="onSubmit">{{ msgText }}</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { useMenus } from '@/composables'
const { getMenus, topMenus, onSubmit, formRef, form, resetForm, getMenusInfoById, msgText } =
  useMenus()

onMounted(() => {
  getMenus()
  const route = useRoute()
  getMenusInfoById(Number(route.params.id))
})

onBeforeUnmount(() => {
  resetForm()
})
</script>

<style scoped lang="scss">
.el-form {
  min-width: 400px;
  width: 800px;
  background-color: #fafafa;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .el-form__label {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  ::v-deep(.el-form-item__buttons .el-form-item__content) {
    justify-content: space-evenly;
  }
  .el-button {
    width: 30%;
  }
}
</style>
