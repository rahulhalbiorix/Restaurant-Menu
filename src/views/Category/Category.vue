<template>
  <div class="w-full max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold text-gray-800">Categories</h1>

      <Button
        label="Add Category"
        icon="pi pi-plus"
        severity="success"
        rounded
        @click="showDialog = true"
      />
    </div>
    <Dialog
      v-model:visible="showDialog"
      modal
      :style="{ width: '700px' }"
      dismissableMask
      class="rounded-xl bg-white"
      @hide="clearData"
    >
      <template #header>
        <div class="flex items-center gap-2">
          <i class="pi pi-folder-plus text-green-600 text-xl"></i>
          <span class="font-bold text-lg text-gray-800">{{
            updateCategoryId ? 'Update Categorie' : 'Add New Category'
          }}</span>
        </div>
      </template>

      <div class="grid p-fluid gap-4">
        <div class="col-12 md:col-5 flex justify-center items-start">
          <img
            src="@/assets/ChatGPT Image Aug 19, 2025, 06_21_22 PM.png"
            alt="image-category"
            class="w-full max-w-xs h-full rounded"
          />
        </div>

        <div class="col-12 md:col-7">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Category Name</label>
            <InputText
              placeholder="Enter category name"
              class="w-full"
              v-model="form.CategoriesName"
            />
            {{ form.CategoriesName }}
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Description</label>
            <Textarea
              autoResize
              rows="3"
              placeholder="Enter description"
              class="w-full"
              v-model="form.Description"
            />
            {{ form.Description }}
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Upload Image</label>
            <FileUpload
              mode="basic"
              name="image"
              accept="image/*"
              customUpload
              chooseLabel="Choose Image"
              class="w-full"
              @select="onFileSelect"
            />
          </div>
          <div class="col-12 md:col-5 flex justify-center items-start">
            <img
              v-if="previewUrl"
              :src="previewUrl"
              alt="image-category"
              class="w-full max-w-xs h-full rounded"
            />
            <div
              v-else
              class="w-full max-w-xs h-40 flex items-center justify-center border rounded text-gray-400"
            >
              No image selected
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2">
          <Button label="Cancel" severity="secondary" outlined @click="clearData" />
          <Button
            :label="AddUpdateLable"
            icon="pi pi-check"
            severity="success"
            @click="handleCreateUpdateCategories"
          />
        </div>
      </template>
    </Dialog>

    <div>
      <div v-for="categorie in categoryList" :key="categorie._id">
        <CategoryCard
          :categorie="categorie"
          @updateCategory="handleEditCategoriesData"
          @deleteCategory="handleDeleteCategorie"
        ></CategoryCard>
      </div>
      <Toast></Toast>
      <ConfirmDialog></ConfirmDialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CategoryCard from '@/components/CategoryCard.vue'
import { onMounted, ref, watch } from 'vue'
import {
  fetchCategories,
  createCategorie,
  updateCategorie,
  deleteCategories,
} from '@/services/useApiServices'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import FileUpload from 'primevue/fileupload'
import { useToast } from '@/composables/useToast'

import { useCategoryConfirm } from '@/composables/useConfirmDialogue'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'

const { confirmDelete } = useCategoryConfirm()

interface Category {
  _id: string
  title: string
  description: string
  image: string
}

const { success, warning, error } = useToast()

const showDialog = ref(false)

const categoryList = ref<Category[]>([])

const form = ref({
  CategoriesName: '',
  Description: '',
  Image: '',
})

const AddUpdateLable = ref('Add')
const updateCategoryId = ref('')

watch(updateCategoryId, (newValue) => {
  console.log(newValue, 'watch property work...')

  if (newValue != '') {
    AddUpdateLable.value = 'Edit'
  } else {
    AddUpdateLable.value = 'Add'
  }
})

const handleFetchCategories = async () => {
  try {
    const res = await fetchCategories()
    if (res.data.success) {
      categoryList.value = res.data.data.categories
    }
  } catch (error) {
    console.error(error)
  }
}

const previewUrl = ref<string | null>(null)

const onFileSelect = (event: any) => {
  console.log(event)
  const file = event.files[0]
  console.log(file)
  if (file) {
    form.value.Image = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

const handleCreateUpdateCategories = async () => {
  try {
    const createCategFormdata = new FormData()

    createCategFormdata.append('title', form.value.CategoriesName)

    createCategFormdata.append('description', form.value.Description)

    createCategFormdata.append('image', form.value.Image)

    if (updateCategoryId.value) {
      console.log('start to uipdate category....')

      const res = await updateCategorie(updateCategoryId.value, createCategFormdata)

      if (res.data.success) {
        success(res.data.message)
      }
    } else {
      console.log('start to Add New  category....')
      const res = await createCategorie(createCategFormdata)

      if (res.data.success) {
        success(res.data.message)
      }
    }
    clearData()
    handleFetchCategories()
  } catch (err: any) {
    if (err.response) {
      error(err.response.data)
    } else {
      console.log('Network Error', err)
    }
  }
}

const handleEditCategoriesData = (data: any) => {
  showDialog.value = true
  updateCategoryId.value = data._id
  form.value.CategoriesName = data.title
  form.value.Description = data.description
  form.value.Image = data.image
  previewUrl.value = data.image
}

const clearData = () => {
  showDialog.value = false
  updateCategoryId.value = ''
  form.value.CategoriesName = ''
  form.value.Description = ''
  form.value.Image = ''
  AddUpdateLable.value = 'Add'
  previewUrl.value = ''
}

const handleDeleteCategorie = (Id: string) => {
  confirmDelete({
    accept: async () => {
      try {
        const res = await deleteCategories(Id)

        handleFetchCategories()
      } catch (error) {
        console.log(error)
      }
    },
  })
}

onMounted(() => {
  handleFetchCategories()
})
</script>
