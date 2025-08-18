<template>
  <v-app>
    <v-app-bar color="pink">
      <v-app-bar-title>My Food</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
      <v-btn text :to="{ name: 'signUp' }">SignUP</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
