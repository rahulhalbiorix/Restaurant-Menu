import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vuetify } from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'primeicons/primeicons.css'

import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkMode: false,
    },
  },
})
app.use(ToastService)
app.use(ConfirmationService)
app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
