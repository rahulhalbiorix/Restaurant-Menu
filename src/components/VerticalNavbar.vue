<template>
  <div class="vertical-navbar">
    <div class="logo">
      <img src="../assets/ChatGPT Image Aug 19, 2025, 06_21_22 PM.png" alt="Restaurant Logo" />
    </div>

    <div class="menu-wrapper">
      <PanelMenu :model="items" class="menu" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PanelMenu from 'primevue/panelmenu'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const items = ref([
  {
    label: 'Restaurant',
    icon: 'pi pi-shop',
    command: () => {
      router.push({
        name: 'Restaurant',
      })
    },
  },
  {
    label: 'Combo',
    icon: 'pi pi-star',
    command: () => {
      router.push({
        name: 'Combo',
      })
    },
  },
  {
    label: 'Category',
    icon: 'pi pi-tags',
    command: () => {
      router.push({
        name: 'Category',
      })
    },
  },
  {
    label: 'Items',
    icon: 'pi pi-list',
    command: () => {
      router.push({
        name: 'Items',
      })
    },
  },
  {
    label: 'LogOut',
    icon: 'pi pi-sign-out',
    command: () => {
      router.push({ name: 'Login' })
      authStore.userLoggedOut()
    },
  },
  {
    label: 'Cart',
    icon: 'pi pi-shopping-cart ',
  },
])
</script>

<style scoped>
.vertical-navbar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 250px;
  background-color: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
}

.logo img {
  width: 90px;
  height: auto;
  object-fit: contain;
}

.menu-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem;
  margin-top: 12rem;
}

.menu :deep(.p-panelmenu .p-menuitem-link) {
  padding: 0.75rem;
  border-radius: 6px;
  transition: background 0.3s;
}

.menu :deep(.p-menuitem-link-active) {
  background-color: #e6f0ff;
  color: #0052cc;
  font-weight: 600;
}

.menu :deep(.p-panelmenu .p-menuitem-link:hover) {
  background-color: #f5f5f5;
}

.menu :deep(.p-menuitem-icon) {
  margin-right: 0.5rem;
}
</style>
