import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
  const isCollapsed = ref<boolean>(false)

  function toggleCollapse() {
    isCollapsed.value = !isCollapsed.value
  }

  return { isCollapsed, toggleCollapse }
})
