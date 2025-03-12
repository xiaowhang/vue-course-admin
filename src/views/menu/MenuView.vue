<template>
  <div>
    <h1>Menu</h1>
  </div>
</template>

<script setup lang="ts">
import { getAllMenus } from '@/api/menus'
import type { MenuType } from '@/api/menus'

defineOptions({
  name: 'MenuView',
})

const menus = ref([] as MenuType[])

onMounted(async () => {
  const { data } = await getAllMenus()
  if (data.code === '000000') menus.value = data.data
})
</script>

<style scoped lang="scss"></style>
