<template>
  <div class="w-full flex gap-6 bg-white rounded-xl shadow-md p-4">
    <div class="w-1/3">
      <img :src="menuItem.image" alt="Restaurant Combo" class="w-full h-full object-cover" />
    </div>

    <div class="w-2/3 flex flex-col justify-between">
      <div class="mb-4">
        <h1 class="text-2xl pt-2 font-bold text-gray-800">{{ menuItem.name }}</h1>
        <span class="text-lg font-semibold text-green-600">Rs. {{ menuItem.price }}/-</span>

        <div>
          <Button
            label="Edit"
            icon="pi pi-pencil"
            class="p-button-text"
            @click="handleEditCombo(menuItem._id)"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            class="p-button-danger p-button-text"
            @click="handleDeleteCombo(menuItem._id)"
          />
        </div>
      </div>

      <div class="flex justify-between space-y-2 px-2 mb-4">
        <div class="flex items-center gap-2">
          <Checkbox
            inputId="available"
            v-model="isActive"
            :binary="true"
            @change="toggleActive(menuItem._id)"
          />
          <label for="available" class="text-gray-700">Available</label>
        </div>

        <div class="flex items-center gap-2">
          <Checkbox
            inputId="special"
            v-model="isTodayMenu"
            :binary="true"
            @change="toggleTodayMenu(menuItem._id)"
          />
          <label for="special" class="text-gray-700"> Add to today's special combo </label>
        </div>
      </div>

      <div class="flex flex-row flex-nowrap gap-3 overflow-x-auto p-2">
        <MenuItems
          v-for="subMenus in menuItem.subCategories"
          :key="subMenus._id"
          class="min-w-[200px]"
          :subMenus="subMenus"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Checkbox from 'primevue/checkbox'
import MenuItems from './MenuItems.vue'
import Button from 'primevue/button'
import { comboActiveDeactive, deleteCombo, selectTodaysMenu } from '@/services/useApiServices'
import router from '@/router'
import { ref } from 'vue'

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

const props = defineProps<{ menuItem: Menus }>()

const emit = defineEmits(['refreshCombo'])

const isActive = ref(props.menuItem.isActive)

const isTodayMenu = ref(props.menuItem.isTodayMenu)

const handleDeleteCombo = async (id: string) => {
  try {
    const res = await deleteCombo(id)

    if (res.data.success) {
      alert(res.data.message)
    }

    emit('refreshCombo')
  } catch (error) {
    console.log(error)
  }
}

const handleEditCombo = (id: string) => {
  console.log('menu item id is ', id)

  router.push({ name: 'AddNewCombo', params: { id } })
}

const toggleActive = async (id: string) => {
  try {
    const res = await comboActiveDeactive(id)
    if (res.data.success) {
      isActive.value = res.data.data.isActive
    }
    emit('refreshCombo')
  } catch (error) {
    console.log(error)
  }
}

const toggleTodayMenu = async (id: string) => {
  try {
    const res = await selectTodaysMenu(id)
    if (res.data.success) {
      isTodayMenu.value = res.data.data.isTodayMenu
    }
    emit('refreshCombo')
  } catch (error) {
    console.log(error)
  }
}
</script>
<style scoped>
::-webkit-scrollbar {
  height: 8px;
}
::-webkit-scrollbar-thumb {
  background: #9ca3af;
  border-radius: 4px;
}
</style>
