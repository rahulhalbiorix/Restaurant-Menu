<template>
  <Card
    class="w-full max-w-sm bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden border border-gray-100 group"
  >
    <template #header>
      <div class="relative">
        <img
          :src="props.item.image"
          :alt="props.item.title"
          class="w-full h-56 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
        />

        <Tag
          :value="props.item.categoryId.title"
          severity="success"
          class="absolute top-3 left-3 bg-white text-gray-800 shadow-sm text-xs font-semibold px-3 py-1 rounded-full"
        />
      </div>
    </template>

    <template #title>
      <div class="flex justify-between items-center mt-2">
        <span class="font-bold text-lg text-gray-900 truncate">{{ props.item.title }}</span>
      </div>
    </template>

    <template #content>
      <p class="text-gray-600 text-sm mb-3 line-clamp-2">
        {{ props.item.description }}
      </p>

      <div class="flex justify-between items-center mt-3">
        <span class="text-red-500 font-extrabold text-xl">₹ {{ props.item.price }}</span>
        <div class="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-lg">
          <span class="text-xs text-gray-500">Qty</span>
          <span class="font-bold text-lg text-gray-700">{{ quantity }}</span>
        </div>
      </div>

      <div class="mt-4 flex items-center gap-2">
        <Checkbox
          v-model="isAvailable"
          :binary="true"
          inputId="available"
          class="scale-110"
          @change="emit('toggle-availability', item._id)"
        />
        <label for="available" class="text-sm text-gray-700 font-medium">
          {{ isAvailable ? 'Available' : 'Unavailable' }}
        </label>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-between gap-3 mt-3">
        <Button
          icon="pi pi-pencil"
          label="Edit"
          severity="info"
          outlined
          class="flex-1 hover:shadow-md transition-all duration-200"
          @click="editItem"
        />
        <Button
          icon="pi pi-trash"
          label="Delete"
          severity="danger"
          outlined
          class="flex-1 hover:shadow-md transition-all duration-200"
          @click="deleteItem"
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Checkbox from 'primevue/checkbox'

interface Category {
  _id: string
  title: string
  description: string
  image: string
}

interface Item {
  _id: string
  title: string
  description: string
  image: string
  price: number
  quantity: number
  isActive: boolean
  categoryId: Category
}

const props = defineProps<{ item: Item }>()
const emit = defineEmits(['add-to-cart', 'edit-item', 'delete-item', 'toggle-availability'])

const quantity = ref(props.item.quantity || 1)
const isAvailable = ref(props.item.isActive)

const editItem = () => {
  emit('edit-item', props.item._id)
}

const deleteItem = () => {
  emit('delete-item', props.item._id)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
