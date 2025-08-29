<template>
  <div class="flex flex-col justify-between h-screen w-64 bg-white shadow-lg">
    <!-- Logo -->
    <div class="flex justify-center items-center py-6 border-b">
      <img
        src="../assets/ChatGPT Image Aug 19, 2025, 06_21_22 PM.png"
        alt="Restaurant Logo"
        class="w-24 h-auto object-contain"
      />
    </div>

    <!-- Menu Items -->
    <nav class="flex-1 px-4 py-6 overflow-y-auto">
      <ul class="space-y-2">
        <li
          @click="goToRestaurant"
          class="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-red-600 transition"
        >
          <i class="pi pi-shop text-lg"></i>
          <span class="font-medium">Restaurant</span>
        </li>

        <li
          v-if="authStore.isOwner"
          @click="goToCombo"
          class="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-red-600 transition"
        >
          <i class="pi pi-star text-lg"></i>
          <span class="font-medium">Combo</span>
        </li>

        <li
          v-if="authStore.isOwner"
          @click="goToCategory"
          class="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-red-600 transition"
        >
          <i class="pi pi-tags text-lg"></i>
          <span class="font-medium">Category</span>
        </li>

        <li
          v-if="authStore.isOwner"
          @click="goToItems"
          class="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-red-600 transition"
        >
          <i class="pi pi-list text-lg"></i>
          <span class="font-medium">Items</span>
        </li>

        <li
          @click="goToCart"
          class="flex items-center px-4 py-3 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-red-600 transition"
        >
          <div class="flex items-center gap-3">
            <i class="pi pi-shopping-cart text-lg"></i>
            <span class="font-medium">Cart</span>
          </div>

          <!-- Cart Badge -->
          <span
            v-if="authStore.cartTotalItem > 0"
            class="bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[22px] text-center ml-2"
          >
            {{ authStore.cartTotalItem }}
          </span>
        </li>
      </ul>
    </nav>

    <!-- Footer -->
    <div class="px-4 py-6 border-t">
      <li
        @click="logout"
        class="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-gray-700 hover:bg-red-100 hover:text-red-600 transition"
      >
        <i class="pi pi-sign-out text-lg"></i>
        <span class="font-medium">Logout</span>
      </li>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const goToRestaurant = () => router.push({ name: 'Restaurant' })
const goToCombo = () => router.push({ name: 'Combo' })
const goToCategory = () => router.push({ name: 'Category' })
const goToItems = () => router.push({ name: 'Items' })
const goToCart = () => router.push({ name: 'Cart' })

const logout = () => {
  router.push({ name: 'Login' })
  authStore.userLoggedOut()
}
</script>
