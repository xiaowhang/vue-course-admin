<template>
  <el-aside>
    <el-scrollbar>
      <el-menu router unique-opened :collapse="menuStore.isCollapsed">
        <RouterLink to="/" class="logo">
          <img src="@/assets/logo.svg" alt="" />
          <!-- <span>管理系统</span> -->
        </RouterLink>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><EpSetting /></el-icon>
            <span>权限管理</span>
          </template>
          <el-menu-item index="/menus">
            <el-icon><EpSetting /></el-icon>
            <template #title>菜单列表</template>
          </el-menu-item>
          <el-menu-item index="/roles">
            <el-icon><EpSetting /></el-icon>
            <template #title>角色列表</template>
          </el-menu-item>
          <el-menu-item index="/resources">
            <el-icon><EpSetting /></el-icon>
            <template #title>资源列表</template>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/courses">
          <el-icon><EpSetting /></el-icon>
          <template #title>课程管理</template>
        </el-menu-item>
        <el-menu-item index="/users">
          <el-icon><EpSetting /></el-icon>
          <template #title>用户管理</template>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><EpSetting /></el-icon>
            <span>广告管理</span>
          </template>
          <el-menu-item index="ad-list">
            <el-icon><EpSetting /></el-icon>
            <template #title>广告列表</template>
          </el-menu-item>
          <el-menu-item index="ad-loc-list">
            <el-icon><EpSetting /></el-icon>
            <template #title>广告位列表</template>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores'

defineOptions({
  name: 'AppAside',
})

const menuStore = useMenuStore()
</script>

<style scoped lang="scss">
.el-aside {
  height: 100vh;
  background-color: #eee;
  width: auto;
}

.el-menu {
  --el-menu-bg-color: #eee;
  border-right: none;
  &:not(.el-menu--collapse) {
    width: 200px;
  }
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;

  img {
    width: 48px;
    height: 48px;
  }
}
</style>
