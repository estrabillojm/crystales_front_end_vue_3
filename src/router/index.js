import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Requestors from '../views/requestors/Index'
import NewRequest from '../views/requestors/NewRequest'




import Admin from '../views/administrator/Index'
import AddUser from '../views/administrator/AddUser'
import Suppliers from '../views/administrator/Suppliers'
import SupplierType from '../views/administrator/SupplierType'
import EditUser from '../views/administrator/EditUser'
import AddCategory from '../views/administrator/AddCategory'
import Documents from '../views/administrator/Documents'
import AddDocuments from '../views/administrator/AddDocuments'
import EditDocuments from '../views/administrator/EditDocuments'
import Companies from '../views/administrator/Companies'
import Reasons from '../views/administrator/Reasons'
import Banks from '../views/administrator/Banks'
import Referrences from '../views/administrator/Referrences'
import NotFound from '../views/NotFound'


const routes = [



  // LOGIN
  { path: '/',name: 'Home', component: Home},


  //ADMINISTRATOR
  { path: '/users',name: 'Users', component: Admin}, // USERS LIST
  { path: '/add-users',name: 'AddUser', component: AddUser}, // ADD USER
  { path: '/suppliers',name: 'Suppliers', component: Suppliers}, // SUPPLIER
  { path: '/supplier-type',name: 'SupplierType', component: SupplierType}, // SUPPLIER TYPE
  { path: '/users/edit/:id',name: 'EditUser', component: EditUser}, // SHOW USER
  { path: '/category',name: 'AddCategory', component: AddCategory}, //ADD/SHOW CATEGORIES
  { path: '/documents',name: 'Documents', component: Documents}, // SHOW DOCUMENT 
  { path: '/add-documents',name: 'AddDocuments', component: AddDocuments}, // ADD DOCUMENT
  { path: '/edit-documents/:id',name: 'EditDocuments', component: EditDocuments}, // EDIT DOCUMENT
  { path: '/edit-documents/:id',name: 'EditDocuments', component: EditDocuments}, // EDIT DOCUMENT
  { path: '/companies',name: 'Companies', component: Companies}, //COMPANIES
  { path: '/reasons',name: 'Reasons', component: Reasons}, //REASONS
  { path: '/banks',name: 'Banks', component: Banks}, //BANKS
  { path: '/referrences',name: 'Referrences', component: Referrences}, //BANK



  //REQUESTOR
  { path: '/request-tagging',name: 'RequestTagging', component: Requestors}, 
  { path: '/new-request',name: 'NewRequest', component: NewRequest}, 

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
