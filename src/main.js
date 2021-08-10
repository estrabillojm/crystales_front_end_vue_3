import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'


// COMPONENTS
import Sidebar from './components/shared-components/Sidebar'
import Navbar from './components/shared-components/Navbar'
import DataTable from './components/shared-components/DataTable'
import Charts from './components/shared-components/Charts'







// axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.baseURL = "https://crystales.herokuapp.com/api"
// axios.defaults.baseURL = "http://10.10.8.27:8000/api"
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'https://ee4db6770885.ngrok.io/';
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.baseURL = "http://localhost:8000/api"

axios.defaults.withCredentials = true

const app = createApp(App)
app.use(router).use(store)
app.use(Chartkick.use(Chart))
app.component('Sidebar', Sidebar)
   .component('Navbar', Navbar)
   .component('DataTable', DataTable)

app.mount('#app')

