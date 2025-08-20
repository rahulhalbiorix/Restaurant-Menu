<template>
  <v-app>
    <v-app-bar color="pink" v-if="authStore.isOwner === false">
      <v-app-bar-title>My Food</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
      <v-btn text :to="{ name: 'signUp' }">SignUP</v-btn>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/authStore'
import { fa } from 'vuetify/locale'

const authStore = useAuthStore()
</script>
