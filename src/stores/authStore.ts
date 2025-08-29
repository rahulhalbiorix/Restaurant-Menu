import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import defaultImage from '@/assets/food-1685942_1280.jpg'

export const useAuthStore = defineStore(
  'useAuthStore',
  () => {
    const token = ref('')

    const isUserLoggedIn = ref(false)

    const isOwner = ref(true)

    const userId = ref('')

    const cartTotalItem = ref(0)

    function setToken(val: string) {
      token.value = val
    }

    function setUserId(id: string) {
      userId.value = id
    }

    function userLoggedOut() {
      console.log('log out func wrk..')
      token.value = ''
      isUserLoggedIn.value = false
      isOwner.value = false
      token.value = ''
      userId.value = ''
    }

    function setCartItem(payload: number) {
      cartTotalItem.value = payload
    }

    return {
      token,
      isUserLoggedIn,
      isOwner,

      userId,
      setToken,
      userLoggedOut,
      cartTotalItem,
      setUserId,
      setCartItem,
    }
  },
  {
    persist: true,
  },
)
