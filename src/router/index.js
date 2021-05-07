import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Requestors from '../views/requestors/Index'
import Admin from '../views/administrator/Index'
import AddUser from '../views/administrator/AddUser'
import Supplier from '../views/administrator/Supplier'
import SupplierType from '../views/administrator/SupplierType'
import EditUser from '../views/administrator/EditUser'


const routes = [

  //ADMINISTRATOR
  { path: '/',name: 'Home', component: Home}, // LOGIN
  { path: '/users',name: 'Users', component: Admin}, //ADMIN  --> USERS LIST
  { path: '/add-users',name: 'AddUser', component: AddUser}, //ADMIN --> ADD USER
  { path: '/supplier',name: 'Supplier', component: Supplier}, //ADMIN
  { path: '/supplier-type',name: 'SupplierType', component: SupplierType}, //ADMIN
  { path: '/users/edit/:id',name: 'EditUser', component: EditUser}, //ADMIN  --> SHOW USER


  { path: '/request-tagging',name: 'RequestTagging', component: Requestors}, //REQUESTOR


  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
