<template>
  <div class="p-6 space-y-10">
    <!-- Page Title -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900 flex items-center gap-2">
        <i class="pi pi-book text-red-500"></i>
        Restaurant Menu
        <span class="text-lg text-gray-500">(ID: {{ id }})</span>
      </h1>
      <Button icon="pi pi-shopping-cart" label="View Cart" severity="danger" rounded />
    </div>

    <Divider />

    <!-- Today's Special Combo -->
    <div v-if="specialCombo" class="space-y-4">
      <h2 class="text-2xl font-semibold text-red-600 flex items-center gap-2">
        <i class="pi pi-star-fill text-yellow-500"></i> Today's Special Combo
      </h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card class="shadow-lg rounded-2xl border border-gray-200">
          <template #header>
            {{ specialCombo._id }}
            <img :src="specialCombo.image" alt="Special Combo" class="w-full h-52 object-cover" />
          </template>

          <template #title>
            <span class="text-xl font-bold">{{ specialCombo.name }}</span>
            <Tag value="🔥 Hot" severity="danger" class="ml-3" />
          </template>

          <template #subtitle>
            <Tag :value="'₹ ' + specialCombo.price" severity="success" rounded />
            <Tag value="Today's Menu" severity="warning" class="ml-2" />
          </template>

          <template #content>
            <ul class="pl-5 list-disc space-y-1 text-gray-700">
              <li v-for="sub in specialCombo.subCategories" :key="sub._id">
                {{ sub.title }} <span class="text-gray-500">(₹{{ sub.price }})</span>
              </li>
            </ul>
            <Button
              icon="pi pi-plus"
              label="Add to Cart"
              severity="danger"
              class="mt-4 w-full"
              @click="addMenutoCart(specialCombo._id)"
            />
          </template>
        </Card>
      </div>
    </div>

    <Divider />

    <!-- Other Combos -->
    <div>
      <h2 class="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <i class="pi pi-list"></i> Other Combos
      </h2>

      <div
        v-if="OtherCombo.length"
        class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4"
      >
        <Card
          v-for="combo in OtherCombo"
          :key="combo._id"
          class="shadow-lg rounded-2xl border border-gray-200"
        >
          <template #header>
            <img :src="combo.image" alt="Combo" class="w-full h-48 object-cover" />
            {{ combo._id }}
          </template>

          <template #title>
            <span class="text-lg font-semibold">{{ combo.name }}</span>
          </template>

          <template #subtitle>
            <Tag :value="'₹ ' + combo.price" severity="success" rounded />
          </template>

          <template #content>
            <ul class="pl-5 list-disc space-y-1 text-gray-700">
              <li v-for="sub in combo.subCategories" :key="sub._id">
                {{ sub.title }} <span class="text-gray-500">(₹{{ sub.price }})</span>
              </li>
            </ul>
            <Button
              icon="pi pi-plus"
              label="Add to Cart"
              severity="danger"
              class="mt-4 w-full"
              @click="addMenutoCart(combo._id)"
            />
          </template>
        </Card>
      </div>

      <p v-else class="text-gray-500 mt-4">No other combos available.</p>
    </div>

    <Divider />

    <!-- Food Items -->
    <div>
      <h2 class="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <i class="pi pi-utensils"></i> Food Items
      </h2>

      <div
        v-if="foodItems.length"
        class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4"
      >
        <Card
          v-for="item in foodItems"
          :key="item._id"
          class="shadow-lg rounded-2xl border border-gray-200"
        >
          <template #header>
            {{ item._id }}
            <img :src="item.image" :alt="item.title" class="w-full h-48 object-cover" />
          </template>

          <template #title>
            <div class="flex justify-between items-center">
              <span class="text-lg font-semibold">{{ item.title }}</span>
              <Tag :value="'₹ ' + item.price" severity="success" rounded />
            </div>
          </template>

          <template #content>
            <p class="text-sm text-gray-600 line-clamp-3 mb-3">{{ item.description }}</p>
            <div class="flex items-center justify-between">
              <Chip :label="`Qty: ${item.quantity}`" icon="pi pi-box" />

              <Button
                icon="pi pi-plus"
                label="Add"
                size="small"
                severity="danger"
                outlined
                @click="addItemtoCart(item._id)"
              />
            </div>
          </template>
        </Card>
      </div>
      <p v-else class="text-gray-500 mt-4">No food items available.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { addItemCart, getItemForBuy, getMenuForBuy } from '@/services/useApiServices'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Chip from 'primevue/chip'
import Divider from 'primevue/divider'
import Tag from 'primevue/tag'

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = ref<string>(route.params.id as string)

const OtherCombo = ref<any[]>([])
const specialCombo = ref<any | null>(null)
const foodItems = ref<any[]>([])

const fetchMenu = async (id: string) => {
  try {
    const res = await getMenuForBuy(id)
    if (res.data.success) {
      OtherCombo.value = res.data.data.menus || []
      specialCombo.value = res.data.data.todaySpecial || null
    }
  } catch (error) {
    console.error(error)
  }
}

const fetchItem = async (id: string) => {
  try {
    const res = await getItemForBuy(id)
    if (res.data.success) {
      foodItems.value = res.data.data.items || []
    }
  } catch (error) {
    console.error(error)
  }
}

// *******functionality for add to cart***********

//*********    add menu to cart

const addMenutoCart = async (id: string) => {
  try {
    const payload = {
      menuId: id,
      menuQuantity: 1,
    }

    const res = await addItemCart(payload)

    if (res.data.success) {
      alert(res.data.message)
    }
  } catch (error) {
    console.log(error)
  }
}

const addItemtoCart = async (id: string) => {
  try {
    const payload = {
      itemId: id,
      itemQuantity: 1,
    }

    const res = await addItemCart(payload)

    if (res.data.success) {
      alert(res.data.message)
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchMenu(id.value)
  fetchItem(id.value)
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
