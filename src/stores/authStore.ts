import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import defaultImage from '@/assets/food-1685942_1280.jpg'

export const useAuthStore = defineStore(
  'useAuthStore',
  () => {
    const token = ref('')

    const isUserLoggedIn = ref(false)

    const isOwner = ref(true)

    const userName = ref('Rahul')

    const userImage = ref(defaultImage)

    const userId = ref()

    function setToken(val: string) {
      token.value = val
    }

    function setUserId(id: string) {
      userId.value = id
    }

    function setUserImage(imageUrl: string) {
      userImage.value = imageUrl
    }

    function setUserName(username: string) {
      userName.value = username
    }

    function userLoggedOut() {
      console.log('log out func wrk..')
      token.value = ''
      isUserLoggedIn.value = false
      isOwner.value = false
      token.value = ''
      userName.value = ''
      userId.value = 0
    }

    return {
      token,
      isUserLoggedIn,
      isOwner,
      userName,
      userImage,
      userId,
      setToken,
      userLoggedOut,
      setUserImage,
      setUserName,
      setUserId,
    }
  },
  {
    persist: true,
  },
)
