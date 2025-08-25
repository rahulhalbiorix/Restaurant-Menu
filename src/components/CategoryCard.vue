<template>
  <div
    class="flex w-full max-w-3xl bg-white border my-2 border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
  >
    <div class="w-1/3 h-48">
      <img
        :src="categorie.image"
        :alt="`${categorie.title} Image`"
        class="w-full h-full object-cover rounded-l-xl"
      />
    </div>

    <div class="px-10 w-2/3 flex flex-col justify-between">
      <div class="flex justify-between items-center">
        <h2 class="font-semibold text-lg text-gray-800">{{ categorie.title }}</h2>

        <div class="flex gap-2 py-2">
          <Button
            icon="pi pi-pencil"
            severity="help"
            rounded
            outlined
            @click="updateCategory(categorie)"
          />
          <Button
            icon="pi pi-trash"
            severity="danger"
            rounded
            outlined
            @click="emit('deleteCategory', categorie._id)"
          />
        </div>
      </div>

      <p class="text-sm text-gray-600 leading-relaxed">
        {{ categorie.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Category from '@/views/Category/Category.vue'
interface Category {
  _id: string
  title: string
  description: string
  image: string
}

const props = defineProps<{ categorie: Category }>()

const emit = defineEmits<{
  (e: 'updateCategory', categorie: Category): void
  (e: 'deleteCategory', Id: string): void
}>()

const updateCategory = (categorie: Category) => {
  emit('updateCategory', categorie)
}
</script>

<style scoped></style>
