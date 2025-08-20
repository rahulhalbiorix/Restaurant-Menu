<template>
  <div class="p-4">
    <div v-if="restaurantList.length === 0" class="text-center text-gray-500 my-8">
      No restaurants found.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <RestaurantCard
        v-for="restaurant in restaurantList"
        :key="restaurant._id"
        :restaurant="restaurant"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import RestaurantCard from '@/components/RestaurantCard.vue'
import { fetchRestaurantOwners } from '@/services/useApiServices'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authstore = useAuthStore()

interface Restaurant {
  _id: number
  image: string
  name: string
  email: string
}

const restaurantList = ref<Restaurant[]>([])

const fetchOwners = async () => {
  try {
    const res = await fetchRestaurantOwners()
    if (res.data.success) {
      restaurantList.value = res.data.data.users
    }

    const findUsers = restaurantList.value.find((obj) => obj._id === authstore.userId)

    if (findUsers) {
      authstore.setUserName(findUsers.name)
      authstore.setUserImage(findUsers.image)
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(fetchOwners)
</script>
