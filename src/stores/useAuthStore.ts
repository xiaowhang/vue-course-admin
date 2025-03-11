import { defineStore } from 'pinia'

interface Token {
  access_token: string
  token_type: string
  refresh_token: string
  expires_in: number
  user_id: string
}

export const useAuthStore = defineStore('auth', () => {
  const tokenJson = ref<string | null>(null)
  const token = computed<Token>(() =>
    JSON.parse(tokenJson.value || window.localStorage.getItem('Token') || '{}'),
  )

  function setToken(newToken: string) {
    tokenJson.value = newToken
    window.localStorage.setItem('Token', newToken)
  }

  return {
    token,
    setToken,
  }
})
