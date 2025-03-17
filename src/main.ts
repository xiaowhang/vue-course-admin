import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { QuillEditor } from '@vueup/vue-quill'

import App from './App.vue'
import router from './router'

import '@/style/index.scss'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

app.component('QuillEditor', QuillEditor)
