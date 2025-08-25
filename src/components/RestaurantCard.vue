<template>
  <Card
    class="bg-white shadow-md border border-gray-200 rounded-xl overflow-hidden h-full hover:shadow-lg transition duration-300"
  >
    <template #header>
      <img
        :src="restaurant.image"
        @error="setFallbackImage($event)"
        alt="Restaurant Image"
        class="w-full h-48 object-cover"
      />
    </template>

    <template #title>
      <div class="flex justify-between items-center">
        <h2 class="font-semibold text-lg text-gray-800 truncate">{{ restaurant.name }}</h2>
        <Tag value="Active" severity="success" rounded />
      </div>
    </template>

    <template #subtitle>
      <p class="text-sm text-gray-500 truncate">{{ restaurant.email }}</p>
    </template>

    <template #footer>
      <div class="flex gap-2 mt-3">
        <Button label="View" icon="pi pi-eye" severity="info" outlined class="w-full" />
        <Button label="Save" icon="pi pi-check" severity="success" class="w-full" />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import Tag from 'primevue/tag'

interface Restaurant {
  _id: number
  image: string
  name: string
  email: string
}

const props = defineProps<{ restaurant: Restaurant }>()

function setFallbackImage(event: Event) {
  const target = event.target as HTMLImageElement
  target.src = new URL('@/assets/food-1685942_1280.jpg', import.meta.url).href
}
</script>
