<template>
  <div>
    <h1>Resources</h1>
    <p>Here are some resources for you to check out:</p>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Vue.js</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank">Vuex</a></li>
      <li><a href="https://router.vuejs.org" target="_blank">Vue Router</a></li>
      <li><a href="https://vuetifyjs.com" target="_blank">Vuetify</a></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useResources } from '@/composables'

const { queryResources } = useResources()

onMounted(() => {
  queryResources()
})
</script>

<style scoped></style>
