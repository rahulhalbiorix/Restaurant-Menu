<template>
  <div class="flex flex-col lg:flex-row w-full h-full bg-gray-50 p-6 gap-6">
    <Card
      class="w-full lg:w-1/3 shadow-md border border-gray-200 rounded-2xl bg-white flex flex-col"
    >
      <template #title>
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-900">Add Combo</h2>
        </div>
      </template>

      <template #content>
        <div class="space-y-4">
          <p class="text-gray-600 text-sm leading-relaxed">
            Create a perfect combo with tasty snacks and hearty meals.
          </p>

          <router-link
            :to="{ name: 'Combo' }"
            class="inline-flex items-center gap-2 text-xs border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
          >
            <i class="pi pi-arrow-left text-sm"></i> Back
          </router-link>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <InputText
              v-model="combo.title"
              placeholder="Enter combo title"
              class="w-full border border-gray-300 bg-white text-gray-800 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p v-if="errors.title" class="text-red-500 text-xs mt-1">{{ errors.title }}</p>
            <p class="text-xs text-gray-500 mt-1">Example: Family Feast Combo</p>
          </div>

          <div>
            <label for="price" class="block text-sm font-medium mb-1">Price (₹)</label>
            <InputNumber
              v-model="combo.price"
              mode="currency"
              currency="INR"
              locale="en-IN"
              class="w-full border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
              :inputClass="'bg-white text-gray-800'"
            />
            <p v-if="errors.price" class="text-red-500 text-xs mt-1">{{ errors.price }}</p>
            <p class="text-xs text-gray-500 mt-1">Set a fair price for your combo</p>
          </div>

          <!-- Today's Special -->
          <div class="flex items-center space-x-2">
            <input
              id="special"
              type="checkbox"
              v-model="combo.isTodayMenu"
              class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label for="special" class="text-sm text-gray-800 ml-2"> Add to Today's Special </label>
          </div>

          <!-- Upload Image -->
          <div>
            <label for="upload" class="block text-sm font-medium mb-2">Upload Image</label>
            <FileUpload
              name="image"
              accept="image/*"
              customUpload
              @select="onImageSelect"
              mode="basic"
              chooseLabel="Choose Image"
              auto
            />
            <p v-if="errors.image" class="text-red-500 text-xs mt-1">{{ errors.image }}</p>
            <div v-if="imagePreview" class="mt-3">
              <img :src="imagePreview" class="w-full h-40 object-cover rounded-lg border" />
              <Button
                label="Remove"
                icon="pi pi-times"
                text
                severity="danger"
                size="small"
                class="mt-2"
                @click="removeImage"
              />
            </div>
          </div>
        </div>
      </template>

      <!-- Sticky Footer -->
      <template #footer>
        <div class="sticky bottom-0 bg-white border-t pt-3">
          <Button
            v-if="editedComboId"
            :label="isSubmitting ? 'Adding...' : 'Update Combo'"
            class="w-full"
            severity="primary"
            :loading="isSubmitting"
            @click="handleSubmit"
          />
          <Button
            v-else
            :label="isSubmitting ? 'Adding...' : 'Add Combo'"
            class="w-full"
            severity="primary"
            :loading="isSubmitting"
            @click="handleSubmit"
          />
        </div>
      </template>
    </Card>

    <!-- Right: Select Items for Combo -->
    <Card class="w-full lg:flex-1 shadow-md border border-gray-200 rounded-2xl bg-white">
      <template #title>
        <h2 class="text-lg font-bold text-gray-800">🥗 Select Items for Combo</h2>
        <p v-if="errors.items" class="text-red-500 text-xs mt-2">{{ errors.items }}</p>
      </template>

      <template #content>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-h-[75vh] overflow-y-auto pr-2"
        >
          <Card
            v-for="subMenu in items"
            :key="subMenu._id"
            :class="getCardClass(subMenu)"
            @click="toggleItemSelection(subMenu)"
          >
            <!-- Image -->
            <template #header>
              <img
                :src="subMenu.image"
                alt="Item image"
                class="w-full h-32 object-cover rounded-t-lg"
              />
            </template>

            <!-- Title & Price -->
            <template #title>
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-semibold text-gray-800 truncate">{{ subMenu.title }}</h3>
                <span class="text-sm text-blue-600 font-medium ml-2">₹{{ subMenu.price }}</span>
              </div>
            </template>
          </Card>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { stringifyQuery, useRoute, useRouter } from 'vue-router'
import { fetchItems, createCombo, fetchComboById, updateCombo } from '@/services/useApiServices'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Checkbox from 'primevue/checkbox'
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'
import { useToast } from '@/composables/useToast'

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

const { success } = useToast()

const router = useRouter()
const route = useRoute()
const items = ref<Item[]>([])
const selectedItems = ref<string[]>([])
const isSubmitting = ref(false)
const imagePreview = ref<string | null>(null)
const editedComboId = ref(route.params.id as string)

const errors = ref({
  title: '',
  price: '',
  image: '',
  items: '',
})

const validateForm = () => {
  let isValid = true

  errors.value = { title: '', price: '', image: '', items: '' }

  if (!combo.value.title.trim()) {
    errors.value.title = 'Title is required'
    isValid = false
  }

  if (!combo.value.price || combo.value.price <= 0) {
    errors.value.price = 'Price must be greater than 0'
    isValid = false
  }

  if (!combo.value.image) {
    errors.value.image = 'Please upload an image'
    isValid = false
  }

  if (selectedItems.value.length === 0) {
    errors.value.items = 'Select at least one item'
    isValid = false
  }

  return isValid
}

const combo = ref({
  title: '',
  price: 0,
  isTodayMenu: false,
  image: '' as File | string,
  comboSubCategorie: [] as string[],
})

const clearCombo = () => {
  combo.value.title = ''
  combo.value.price = 0
  combo.value.isTodayMenu = false
  combo.value.image = ''
  combo.value.comboSubCategorie = []
  selectedItems.value = []
}

const handleFetchItems = async () => {
  try {
    const res = await fetchItems()

    console.log('Fetched Items:', res.data)

    if (res.data.success) {
      items.value = res.data.data.subcategories
    }
    getEditedComboData()
  } catch (error) {
    console.error(error)
  }
}
onMounted(handleFetchItems)

const toggleItemSelection = (item: Item) => {
  if (selectedItems.value.includes(item._id)) {
    selectedItems.value = selectedItems.value.filter((id) => id !== item._id)
  } else {
    selectedItems.value.push(item._id)
  }
  combo.value.comboSubCategorie = selectedItems.value
}

const onImageSelect = (event: any) => {
  combo.value.image = event.files[0]
  imagePreview.value = URL.createObjectURL(event.files[0])
}

const removeImage = () => {
  combo.value.image = ''
  imagePreview.value = null
}
const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    const comboData = new FormData()

    comboData.append('name', combo.value.title)

    combo.value.comboSubCategorie.forEach((id: string) => {
      comboData.append('subCategories', id)
    })

    comboData.append('price', String(combo.value.price))
    comboData.append('image', combo.value.image)
    comboData.append('isTodayMenu', combo.value.isTodayMenu ? 'true' : 'false')

    if (editedComboId.value) {
      const res = await updateCombo(editedComboId.value, comboData)

      if (res.data.success) {
        success(res.data.message)
        isSubmitting.value = false
      }
    } else {
      const res = await createCombo(comboData)

      if (res.data.success) {
        success(res.data.message)
        isSubmitting.value = false
      }
    }

    clearCombo()
  } catch (error) {
    console.log(error)
  }
}

const getCardClass = (item: Item) => {
  return selectedItems.value.includes(item._id) ? 'combo-card selected' : 'combo-card'
}

const getEditedComboData = async () => {
  console.log('start to fetch data of edited combi ')
  if (editedComboId.value) {
    try {
      const res = await fetchComboById(editedComboId.value)

      if (res.data.success) {
        alert(res.data.message)
      }

      combo.value.title = res.data.data.name
      combo.value.price = res.data.data.price
      combo.value.isTodayMenu = res.data.data.isTodayMenu
      combo.value.image = res.data.data.image
      selectedItems.value = res.data.data.subCategories.map((obj: any) => obj._id)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>
.combo-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease-in-out;
  border-radius: 0.5rem;
}
.combo-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.combo-card.selected {
  background-color: palegreen;
  border: 2px solid #22c55e;
  box-shadow: 0 0 0 2px #86efac;
}
</style>
