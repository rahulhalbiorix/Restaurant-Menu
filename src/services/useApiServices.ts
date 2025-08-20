import instance from './api'

export const SignupAPI = (data: FormData) => instance.post('/auth/sign-up', data)

export const loginAPI = (data: FormData) => instance.post('/auth/login', data)

export const fetchRestaurantOwners = (page = 1, limit = 5) =>
  instance.get('/auth/owners', { params: { page, limit } })
