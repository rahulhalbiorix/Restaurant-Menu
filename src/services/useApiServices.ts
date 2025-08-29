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

export const fetchCombo = (page = 1, limit = 0) =>
  instance.get('/menu/get-all-menu', { params: { page, limit } })

export const createCombo = (data: FormData) => instance.post('/menu/create-menu', data)

export const deleteCombo = (id: string) => instance.delete(`/menu/delete-menu/${id}`)

export const fetchComboById = (id: string) => instance.get(`/menu/get-menu-details/${id}`)

export const updateCombo = (id: string, data: FormData) =>
  instance.put(`/menu/update-menu/${id}`, data)

export const selectTodaysMenu = (id: string) => instance.post(`/menu/select-today/${id}`)

export const comboActiveDeactive = (id: string) => instance.patch(`/menu/toggle-menu-status/${id}`)

export const getMenuForBuy = (id: string) => instance.get(`/customer/menu/${id}`)

export const getItemForBuy = (id: string, page = 1, limit = 0) =>
  instance.get(`/customer/items/${id}`, { params: { page, limit } })

export const getCart = () => instance.get('/cart/get-cart')

export const addItemCart = (data: any) =>
  instance.post('cart/add-item-cart', data, {
    headers: { 'Content-Type': 'application/json' },
  })

export const deleteCartItem = (data: any) =>
  instance.delete('/cart/remove-cart-item', {
    headers: { 'Content-Type': 'application/json' },
    data,
  })

export const emptyCart = () => instance.delete('/cart/delete-cart')
