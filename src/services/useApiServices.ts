import instance from './api'

export const SignupAPI = (data: FormData) => instance.post('/auth/sign-up', data)

export const loginAPI = (data: FormData) =>
  instance.post('/auth/login', data, {
    headers: { 'Content-Type': 'application/json' },
  })

export const fetchRestaurantOwners = (page = 1, limit = 0) =>
  instance.get('/auth/owners', { params: { page, limit } })

export const fetchCategories = (page = 1, limit = 0) =>
  instance.get('/categories/list-categories', { params: { page, limit } })

export const createCategorie = (data: FormData) => instance.post('categories/create-category', data)

export const updateCategorie = (id: string, data: FormData) =>
  instance.put(`/categories/update-category/${id}`, data)

export const deleteCategories = (id: string) => instance.delete(`/categories/delete/${id}`)

export const fetchItems = (page = 1, limit = 0) =>
  instance.get('/subcategories/get-all-subcategories', { params: { page, limit } })

export const createItems = (data: FormData) =>
  instance.post('/subcategories/create-subcategories', data)

export const fetchItemsById = (id: string) =>
  instance.get(`/subcategories/get-details-subcategories/${id}`)

export const updateItem = (id: string, data: FormData) =>
  instance.put(`/subcategories/update-subcategories/${id}`, data)

export const deleteItem = (id: string) =>
  instance.delete(`/subcategories/delete-subcategories/${id}`)

export const toggleActiveOrDeActiveItem = (id: string) =>
  instance.patch(`/subcategories/toggle-subcategory-status/${id}`)
