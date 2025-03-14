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
          <el-dropdown-item divided @click="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<script setup lang="ts">
import { useMenuStore, useAuthStore } from '@/stores'
import { getUserInfo, logout } from '@/api'

defineOptions({
  name: 'AppHeader',
})

const menuStore = useMenuStore()

const userInfo = reactive({
  userName: '',
  portrait: '',
})

onMounted(async () => {
  try {
    const { data } = await getUserInfo()
    if (data.success) {
      Object.assign(userInfo, data.content)
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
})

const router = useRouter()
const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确定退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    await logout()

    ElMessage.success('退出登录成功')
    useAuthStore().setToken('')
    router.push({ name: 'login' })
  } catch (error) {
    if (error !== 'cancel') {
      console.error('退出登录失败:', error)
    }
  }
}
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
