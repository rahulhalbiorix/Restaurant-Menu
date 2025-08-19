import instance from './api'

export const SignupAPI = (data: FormData) => instance.post('/auth/sign-up', data)

export const loginAPI = (data: FormData) => instance.post('/auth/login', data)
