<template>
  <el-header>
    <el-icon size="16px" @click="menuStore.toggleCollapse">
      <EpExpand v-show="menuStore.isCollapsed" />
      <EpFold v-show="!menuStore.isCollapsed" />
    </el-icon>

    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">promotion management</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>

    <el-dropdown>
      <el-avatar :size="36" :src="userInfo.portrait" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
          <el-dropdown-item divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores'
import { getUserInfo } from '@/api'

defineOptions({
  name: 'AppHeader',
})

const menuStore = useMenuStore()

const userInfo = reactive({
  userName: '',
  portrait: '',
})
getUserInfo().then((res) => {
  const { userName, portrait } = res.data.content
  Object.assign(userInfo, { userName, portrait })
})
</script>

<style scoped lang="scss">
.el-header {
  display: flex;
  align-items: center;
  background-color: #eee;
}

.el-icon {
  margin-right: 20px;
  cursor: pointer;
}

.el-dropdown {
  margin-left: auto;
}
</style>
