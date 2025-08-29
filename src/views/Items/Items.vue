<template>
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-xl font-bold text-gray-800">Items</h1>
    <Button
      icon="pi pi-plus"
      label="Add New"
      severity="success"
      class="rounded-lg shadow-md px-4 py-2"
      @click="showDialog = true"
    />
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <ItemCard
      v-for="item in items"
      :key="item._id"
      :item="item"
      @add-to-cart="handleAddToCart"
      @edit-item="handleEditItemData"
      @delete-item="handleDeleteItem"
      @toggle-availability="handleAvailability"
    />
  </div>

  <Dialog
    v-model:visible="showDialog"
    modal
    :header="dialogueHeader"
    class="w-[90%] md:w-[40%]"
    @hide="resetDialogueForm"
  >
    <div class="flex flex-col gap-4">
      <div>
        <label class="block font-semibold mb-1">Title</label>
        <InputText v-model="newItem.title" placeholder="Enter item title" class="w-full" />
        <p v-if="errors.title" class="text-red-500 text-xs mt-1">{{ errors.title }}</p>
      </div>

      <div>
        <label class="block font-semibold mb-1">Description</label>
        <Textarea
          v-model="newItem.description"
          placeholder="Enter description"
          rows="3"
          class="w-full"
        />
        <p v-if="errors.description" class="text-red-500 text-xs mt-1">{{ errors.description }}</p>
      </div>
      <div>
        <label class="block font-semibold mb-1">Category</label>
        <Dropdown
          v-model="newItem.categorie"
          :options="categorieOptions"
          optionLabel="title"
          option-value="_id"
          placeholder="Select a Categorie"
          class="w-full md:w-14rem"
        />{{ newItem.categorie }}
        <p v-if="errors.categorie" class="text-red-500 text-xs mt-1">{{ errors.categorie }}</p>
      </div>
      <div>
        <label class="block font-semibold mb-1">Quantity</label>
        <div class="flex items-center gap-2">
          <Button
            icon="pi pi-minus"
            severity="secondary"
            @click="
              () => {
                if (newItem.quantity > 1) newItem.quantity--
              }
            "
          />

          {{ newItem.quantity }}
          <Button icon="pi pi-plus" severity="secondary" @click="newItem.quantity++" />
        </div>
        <p v-if="errors.quantity" class="text-red-500 text-xs mt-1">{{ errors.quantity }}</p>
      </div>

      <div>
        <label class="block font-semibold mb-1">Price</label>
        <InputNumber
          v-model="newItem.price"
          mode="currency"
          currency="INR"
          locale="en-IN"
          class="w-full"
        />
        <p v-if="errors.price" class="text-red-500 text-xs mt-1">{{ errors.price }}</p>
      </div>

      <div class="p-4 space-y-4">
        <label class="block font-semibold mb-1">Upload Image</label>

        <input
          type="file"
          accept="image/*"
          @change="onFileSelect"
          class="block w-full border p-2 rounded"
        />
        <p v-if="errors.image" class="text-red-500 text-xs mt-1">{{ errors.image }}</p>

        <div v-if="previewUrl" class="mt-4">
          <p class="font-medium mb-2">Image Preview:</p>
          <Image :src="previewUrl" alt="Preview" width="250" preview />
        </div>
      </div>

      <div class="flex justify-end gap-3 mt-4">
        <Button label="Cancel" severity="secondary" @click="resetDialogueForm" />
        <Button
          :label="LableAddEdit"
          severity="success"
          @click="saveNewItem"
          :loading="isSubmitting"
        />
      </div>
    </div>
  </Dialog>

  <Toast></Toast>
  <ConfirmDialog></ConfirmDialog>
</template>

<script setup lang="ts">
import ItemCard from '@/components/ItemCard.vue'
import {
  fetchCategories,
  fetchItems,
  createItems,
  fetchItemsById,
  updateItem,
  deleteItem,
  toggleActiveOrDeActiveItem,
} from '@/services/useApiServices'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import Image from 'primevue/image'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { computed, onMounted, ref, watch } from 'vue'
import { useToast } from '@/composables/useToast'
import { useCategoryConfirm } from '@/composables/useConfirmDialogue'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { closeScrollStrategy } from 'vuetify/lib/components/VOverlay/scrollStrategies.mjs'

const { confirmDelete } = useCategoryConfirm()

const { success, warning } = useToast()

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

const items = ref<Item[]>([])

const showDialog = ref(false)

const isSubmitting = ref(false)

const newItem = ref({
  title: '',
  description: '',
  price: 0,
  image: '',
  quantity: 0,
  categorie: '',
})

const errors = ref({
  title: '',
  description: '',
  price: '',
  image: '',
  quantity: '',
  categorie: '',
})

const validateForm = () => {
  let isValid = true

  errors.value = {
    title: '',
    description: '',
    price: '',
    image: '',
    quantity: '',
    categorie: '',
  }

  if (!newItem.value.title.trim()) {
    errors.value.title = 'Title is required'
    isValid = false
  }

  if (!newItem.value.description.trim()) {
    errors.value.description = 'Description is Required'
    isValid = false
  }

  if (!newItem.value.categorie) {
    errors.value.categorie = 'Please select Categorie'
    isValid = false
  }

  if (newItem.value.quantity <= 0) {
    errors.value.quantity = 'Quantity Should be more than zero!'
    isValid = false
  }

  if (newItem.value.price <= 0) {
    errors.value.price = 'price should be more than zero!'
    isValid = false
  }

  if (!newItem.value.image) {
    errors.value.image = 'please select image!'
    isValid = false
  }

  return isValid
}

const handleAddToCart = (item: any) => {
  console.log('Added to cart:', item)
}

const handleFetchItems = async () => {
  try {
    const res = await fetchItems()
    if (res.data.success) {
      items.value = res.data.data.subcategories
    }
  } catch (error) {
    console.error(error)
  }
}

const saveNewItem = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  try {
    const createItemData = new FormData()

    createItemData.append('title', newItem.value.title)
    createItemData.append('description', newItem.value.description)
    createItemData.append('image', newItem.value.image)
    createItemData.append('categoryId', newItem.value.categorie)
    createItemData.append('price', String(newItem.value.price))
    createItemData.append('quantity', String(newItem.value.quantity))

    if (editedItemId.value) {
      const res = await updateItem(editedItemId.value, createItemData)

      if (res.data.success) {
        success(res.data.message)
        handleFetchItems()
      }
    } else {
      const res = await createItems(createItemData)

      if (res.data.success) {
        success(res.data.message)
        handleFetchItems()
      }
    }
  } catch (error) {
    console.log(error)
  } finally {
    isSubmitting.value = false
  }

  resetDialogueForm()
}

const resetDialogueForm = () => {
  newItem.value = { title: '', description: '', price: 0, image: '', quantity: 0, categorie: '' }
  showDialog.value = false
  previewUrl.value = ''
  editedItemId.value = null
}

const categorieOptions = ref([])

const handleFetchCategories = async () => {
  try {
    const res = await fetchCategories()
    if (res.data.success) {
      categorieOptions.value = res.data.data.categories
    }
  } catch (error) {
    console.error(error)
  }
}

const previewUrl = ref('')

function onFileSelect(event: any) {
  const file = event.target.files[0]
  console.log('selected file', file)
  if (file) {
    newItem.value.image = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

const editedItemId = ref(null)

const handleEditItemData = async (id: string) => {
  try {
    const res = await fetchItemsById(id)

    if (res.data.success) {
      newItem.value.title = res.data.data.title
      newItem.value.description = res.data.data.description
      newItem.value.categorie = res.data.data.categoryId._id
      newItem.value.quantity = res.data.data.quantity
      newItem.value.price = res.data.data.price
      newItem.value.image = res.data.data.image

      editedItemId.value = res.data.data._id
      showDialog.value = true
      previewUrl.value = res.data.data.image
    }
  } catch (error) {
    console.log(error)
  }
}

const handleDeleteItem = (id: string) => {
  confirmDelete({
    accept: async () => {
      try {
        const res = await deleteItem(id)

        handleFetchItems()
      } catch (error) {
        console.log(error)
      }
    },
  })
}

const handleAvailability = async (id: string) => {
  try {
    const res = await toggleActiveOrDeActiveItem(id)

    handleFetchItems()
  } catch (error) {
    console.log(error)
  }
}

const LableAddEdit = computed(() => {
  return editedItemId.value ? 'Edit' : 'Add'
})

const dialogueHeader = computed(() => {
  return editedItemId.value ? 'Edit Item' : 'Add New Item'
})

onMounted(() => {
  handleFetchItems()
  handleFetchCategories()
})
</script>
