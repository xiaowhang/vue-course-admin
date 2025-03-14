<template>
  <div>
    <h1>Users</h1>
    <p>This is the users view.</p>
  </div>
</template>

<script setup lang="ts">
import { useUsers } from '@/composables'

const {} = useUsers()
</script>

<style scoped lang="scss"></style>
