<template>
  <v-app>
    <v-app-bar color="pink" v-if="authStore.isUserLoggedIn === false">
      <v-app-bar-title>My Food</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Login</v-btn>
      <v-btn text :to="{ name: 'signUp' }">SignUP</v-btn>
    </v-app-bar>
    <v-main>
      <div class="layout" v-if="layout === 'default'">
        <div class="sidebar">
          <VerticalNavbar />
        </div>
        <div class="main-content">
          <router-view />
        </div>
      </div>
      <router-view v-else />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useAuthStore } from './stores/authStore'
import { fa } from 'vuetify/locale'
import VerticalNavbar from './components/VerticalNavbar.vue'
import { computed } from 'vue'

const authStore = useAuthStore()

const route = useRoute()

const layout = computed(() => route.meta.layout)
</script>
