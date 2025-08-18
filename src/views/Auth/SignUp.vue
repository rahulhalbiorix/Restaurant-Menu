<template>
  <v-container class="d-flex justify-center">
    <v-card class="glass-card pa-6" max-width="420" elevation="10">
      <v-card-title class="text-h5 text-center font-weight-bold mb-1">
        Create an Account
      </v-card-title>

      <v-card-subtitle class="text-body-1 text-center mb-4">
        Join us today! Please fill in the information below
      </v-card-subtitle>

      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="username"
          label="UserName"
          variant="solo-filled"
          color="purple"
          prepend-inner-icon="mdi-account"
          class="mb-3"
        />

        <v-text-field
          v-model="email"
          label="Email"
          variant="solo-filled"
          color="purple"
          prepend-inner-icon="mdi-email"
          class="mb-3"
        />

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          variant="solo-filled"
          color="purple"
          prepend-inner-icon="mdi-lock-outline"
          class="mb-3"
        />

        <v-select
          v-model="selectedUserType"
          :items="options"
          label="Select an option"
          variant="solo-filled"
          color="purple"
          class="mb-3"
        />

        <v-file-input
          @change="handleFileUrl"
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

const form = ref(null)
const username = ref('')
const email = ref('')
const password = ref('')
const selectedUserType = ref()
const Image = ref()
const ImageUrl = ref()
const options = ['owner', 'customer']

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

  try {
    const res = await SignupAPI(formData)

    if (res.data.success) {
      alert(res.data.message)
      router.push({ name: 'Login' })
    }
  } catch (err) {
    console.log(err)
  }
}
</script>
