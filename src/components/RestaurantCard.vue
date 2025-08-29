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
      </div>
    </template>

    <template #footer>
      <div class="flex gap-2 mt-3">
        <Button
          label="View"
          icon="pi pi-eye"
          severity="info"
          outlined
          class="w-full"
          @click="viewRestaurantMenu(restaurant._id)"
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import router from '@/router'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Tag from 'primevue/tag'

interface Restaurant {
  _id: string
  image: string
  name: string
  email: string
}

const props = defineProps<{ restaurant: Restaurant }>()

function setFallbackImage(event: Event) {
  const target = event.target as HTMLImageElement
  target.src = new URL('@/assets/food-1685942_1280.jpg', import.meta.url).href
}

const viewRestaurantMenu = (id: string) => {
  console.log('id', id, typeof id)

  router.push({ name: 'RestaurantMenu', params: { id } })
}
</script>
