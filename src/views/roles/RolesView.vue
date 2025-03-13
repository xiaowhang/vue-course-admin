<template>
  <div>{{ roles }}</div>
</template>

<script setup lang="ts">
import { useRoles } from '@/composables'

const { roles, queryRoles } = useRoles()

onMounted(() => {
  queryRoles()
})
console.log(roles)
</script>

<style scoped lang="scss"></style>
