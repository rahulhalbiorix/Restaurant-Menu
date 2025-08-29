<template>
  <Card class="w-64 shadow-lg rounded-xl overflow-hidden border">
    <template #header>
      <img :src="subMenus.image" alt="Noodles" class="h-40 w-full object-cover" />
    </template>

    <template #content>
      <div class="flex justify-between items-center">
        <span class="font-semibold text-lg">{{ subMenus.title }}</span>
        <span class="text-green-600 font-bold">₹{{ subMenus.price }}</span>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card'

interface subMenus {
  _id: string
  title: string
  description: string
  image: string
  price: number
  quantity: number
}

const props = defineProps<{ subMenus: subMenus }>()
</script>
