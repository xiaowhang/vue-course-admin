<template>
  <div>alloc menu {{ roleId }}</div>
</template>

<script setup lang="ts">
const props = defineProps({
  roleId: {
    type: Number,
    required: true,
  },
})
</script>

<style scoped lang="scss"></style>
