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

const email = ref('')
const password = ref('')

function submitForm() {
  console.log('email :', email.value, 'password :', password.value)
}
</script>
