<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-gray-800">Combo List</h1>
      <Button
        label="Add Combo"
        icon="pi pi-plus"
        severity="success"
        rounded
        @click="handleAddCombo"
      />
    </div>

    <div v-for="menuItem in comboList" :key="menuItem._id">
      <ComboCard class="mb-3" :menuItem="menuItem" @refreshCombo="handdleFetchCombo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ComboCard from '@/components/ComboCard.vue'
import { fetchCombo } from '@/services/useApiServices'
import { onMounted, ref } from 'vue'
import { useToast } from '@/composables/useToast'
import Button from 'primevue/button'
import router from '@/router'

interface subMenus {
  _id: string
  title: string
  description: string
  image: string
  price: number
  quantity: number
}

interface Menus {
  _id: string
  name: string
  price: number
  image: string
  isTodayMenu: boolean
  isActive: boolean
  subCategories: subMenus[]
}

const { success } = useToast()

const comboList = ref<Menus[]>([])

const handdleFetchCombo = async () => {
  try {
    const res = await fetchCombo()

    comboList.value = res.data.data.menus
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  handdleFetchCombo()
})

const handleAddCombo = () => {
  router.push({ name: 'AddNewCombo' })
}
</script>
