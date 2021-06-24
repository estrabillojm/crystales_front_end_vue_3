import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

// axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.baseURL = "https://crystales.herokuapp.com/api"

axios.defaults.withCredentials = true


createApp(App).use(store).use(router).mount('#app')
