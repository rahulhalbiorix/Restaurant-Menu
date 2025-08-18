import instance from './api'

interface LoginData {
  email: string
  password: string
}

export const SignupAPI = (data: FormData) => instance.post('/auth/sign-up', data)

export const loginAPI = (data: LoginData) => instance.post('/auth/login', data)
