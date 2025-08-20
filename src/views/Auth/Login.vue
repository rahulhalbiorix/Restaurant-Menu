<template>
  <v-container class="d-flex justify-center">
    <v-card class="glass-card pa-6" max-width="420" elevation="10">
      <v-card-title class="text-h5 text-center font-weight-bold mb-1"> Welcome! </v-card-title>

      <v-card-subtitle class="text-body-1 text-center mb-4">
        Please fill in the information below
      </v-card-subtitle>

      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="[ValidEmail]"
          label="Email"
          variant="solo-filled"
          color="purple"
          prepend-inner-icon="mdi-email"
          class="mb-3"
        />

        <v-text-field
          v-model="password"
          :rules="[required, validPassword]"
          label="Password"
          type="password"
          variant="solo-filled"
          color="purple"
          prepend-inner-icon="mdi-lock-outline"
          class="mb-3"
        />

        <v-btn
          color="pink-accent-4"
          size="large"
          block
          class="mt-5 glow-button"
          @click="submitForm"
        >
          Login
        </v-btn>
      </v-form>

      <div class="text-center mt-4 font-weight-bold">
        <span>Don't have an account?</span>
        <v-btn variant="text" router class="font-weight-bold" :to="{ name: 'signUp' }">
          SignUp
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { loginAPI } from '@/services/useApiServices'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from '@/composables/useToast'

const authStore = useAuthStore()

const { success, error } = useToast()

const email = ref('')
const password = ref('')

const required = (v: any) => !!v || 'This field is required'

const validPassword = (v: any) => v.length >= 6 || 'Password must be at least 6 characters'
const ValidEmail = (v: any) => {
  if (!v) return 'This field is required'
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(v) || 'Please enter a valid email address'
}

async function submitForm() {
  let formData = new FormData()
  formData.append('email', email.value)
  formData.append('password', password.value)

  try {
    const res = await loginAPI(formData)

    if (res.data.success) {
      success(res.data.message)
      authStore.setToken(res.data.data.token)
      authStore.isUserLoggedIn = true
      authStore.setUserId(res.data.data.userId)
      if (res.data.data.role === 'owner') authStore.isOwner = true
      if (res.data.data.role === 'customer') authStore.isOwner = false
      setTimeout(() => {
        router.push({ name: 'Restaurant' })
      }, 1000)
    } else {
      error(res.data.message)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
