import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'useAuthStore',
  () => {
    const token = ref('')

    const isUserLoggedIn = ref(false)

    function setToken(val: string) {
      token.value = val
    }
    return { token, isUserLoggedIn, setToken }
  },
  {
    persist: true,
  },
)
