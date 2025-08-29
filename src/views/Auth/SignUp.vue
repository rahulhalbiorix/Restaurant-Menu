<template>
  <v-container class="d-flex justify-center">
    <v-card class="glass-card pa-6" max-width="420" elevation="10">
      <v-card-title class="text-h5 text-center font-weight-bold mb-1">
        Create an Account
      </v-card-title>

      <v-card-subtitle class="text-body-1 text-center mb-4">
        Join us today! Please fill in the information below
      </v-card-subtitle>

      <v-form ref="form" lazy-validation v-model="isFormValid">
        <v-text-field
          v-model="username"
          :rules="[required, validUsername]"
          label="UserName"
          variant="solo-filled"
          color="purple"
          prepend-inner-icon="mdi-account"
          class="mb-3"
        />

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

        <v-select
          v-model="selectedUserType"
          :rules="[required]"
          :items="options"
          label="Select an option"
          variant="solo-filled"
          color="purple"
          class="mb-3"
        />

        <v-file-input
          @change="handleFileUrl"
          :rules="[required]"
          label="Upload Profile Picture"
          variant="solo-filled"
          color="purple"
          class="mb-3"
          accept="image/*"
        />
        <v-img :width="220" aspect-ratio="16/9" cover :src="ImageUrl"></v-img>

        <v-btn
          color="pink-accent-4"
          size="large"
          block
          class="mt-5 glow-button"
          :disabled="!isFormValid || loading"
          :loading="loading"
          @click="submitForm"
        >
          Sign Up
        </v-btn>
      </v-form>

      <div class="text-center mt-4 font-weight-bold">
        <span>Already have an account?</span>
        <v-btn variant="text" router class="font-weight-bold" :to="{ name: 'Login' }">
          Login
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SignupAPI } from '@/services/useApiServices'
import router from '@/router'
import { useToast } from '@/composables/useToast'

const { success, error } = useToast()

const form = ref(null)
const username = ref('')
const email = ref('')
const password = ref('')
const selectedUserType = ref()
const Image = ref()
const ImageUrl = ref()
const options = ['owner', 'customer']
const isFormValid = ref(false)
const loading = ref(false)

const required = (v: any) => !!v || 'This field is required'
const validUsername = (v: any) =>
  /^(?=.{3,16}$)(?![_\.])(?!.*[_\.]{2})[a-zA-Z0-9._]+(?<![_\.])$/.test(v) ||
  'Username must be 3–16 characters, no special characters at start/end.'

const validPassword = (v: any) => v.length >= 6 || 'Password must be at least 6 characters'

const ValidEmail = (v: any) => {
  if (!v) return 'This field is required'
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(v) || 'Please enter a valid email address'
}

function handleFileUrl(e: any) {
  const file = e.target.files[0]

  if (file) {
    Image.value = file.name
    ImageUrl.value = URL.createObjectURL(file)
  }
}

const submitForm = async () => {
  let formData = new FormData()

  formData.append('name', username.value)
  formData.append('email', email.value)
  formData.append('password', password.value)
  formData.append('userType', selectedUserType.value)

  if (Image.value) formData.append('image', Image.value)

  loading.value = true

  try {
    const res = await SignupAPI(formData)

    if (res.data.success) {
      success(res.data.message)
      router.push({ name: 'Login' })
    } else {
      error(res.data.message)
    }
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}
</script>
