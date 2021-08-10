import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import axios from 'axios'


// ADMINISTRATOR
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



// REQUESTOR
import Requestors from '../views/requestors/Index'
import NewRequest from '../views/requestors/NewRequest'
import ViewRequest from '../views/requestors/ViewRequest'
import EditRequest from '../views/requestors/EditRequest'


// AP TAGGING
import Tagging from '../views/tagging/Index'
import ViewTagging from '../views/tagging/ViewTagging'
import ReleasingOfCheque from '../views/tagging/ReleasingOfCheque'
import TaggedReports from '../views/tagging/TaggedReports'
import ChequeReports from '../views/tagging/ChequeReports'
import CounterReceipt from '../views/tagging/CounterReceipt'


// SUPERVISOR

import EditedTag from '../views/supervisor/Index'
import TaggingAndVouchering from '../views/supervisor/TaggingAndVouchering'
import Releasing from '../views/supervisor/Releasing'


// GAS
import IdentifyTransaction from '../views/gas/Index'
import IdentifyTransactionModify from '../views/gas/IdentifyTransactionModify'
import MatchingOfVoucher from '../views/gas/MatchingOfVoucher'
import MatchingOfVoucherModify from '../views/gas/MatchingOfVoucherModify'


// FILING CLERK
import DistributeTransaction from '../views/filingclerk/Index'


// AP SPECIALIST
import ReceivedReceiptReport from '../views/apspecialist/Index'
import CheckingOfVoucher from '../views/apspecialist/CheckingOfVoucher'
import ApprovingOfVoucher from '../views/apspecialist/ApprovingOfVoucher'


// TREASURY
import CreationOfCheque from '../views/treasury/CreationOfCheque'
import ClearingOfCheque from '../views/treasury/ClearingOfCheque'


// MANAGER
import Approval from '../views/manager/Approval'
import ActivityLogs from '../views/manager/ActivityLogs'
import TransactionApproval from '../views/manager/TransactionApproval'



// AP ASSOCIATE
import CreationOfVoucher from '../views/apassociate/CreationOfVoucher'


import TransactionHistory from '../views/history/TransactionHistory'

let redirect = (to, from, next) =>{
  next()
  // axios.get('/authenticated').then(()=>{ next() }).catch(()=>{return next({ name: 'Home' }) })
}



const routes = [

  { path: '/transaction-history',name: 'TransactionHistory', component: TransactionHistory, beforeEnter: redirect}, 

  // AP ASSOCIATE
  { path: '/approval',name: 'Approval', component: Approval, beforeEnter: redirect}, 
  { path: '/activity-logs',name: 'ActivityLogs', component: ActivityLogs, beforeEnter: redirect}, 
  { path: '/transaction-approval',name: 'TransactionApproval', component: TransactionApproval, beforeEnter: redirect}, 


  // AP ASSOCIATE
  { path: '/creation-of-voucher',name: 'CreationOfVoucher', component: CreationOfVoucher, beforeEnter: redirect}, 

  //TREASURY
  { path: '/creation-of-cheque',name: 'CreationOfCheque', component: CreationOfCheque, beforeEnter: redirect}, 
  { path: '/clearing-of-cheque',name: 'ClearingOfCheque', component: ClearingOfCheque, beforeEnter: redirect}, 


  // AP SPECIALIST
  { path: '/receive-receipt-report',name: 'ReceivedReceiptReport', component: ReceivedReceiptReport, beforeEnter: redirect}, 
  { path: '/checking-of-voucher',name: 'CheckingOfVoucher', component: CheckingOfVoucher, beforeEnter: redirect}, 
  { path: '/approving-of-voucher',name: 'ApprovingOfVoucher', component: ApprovingOfVoucher, beforeEnter: redirect}, 

  // FILING CLERK
  { path: '/distribute-transaction',name: 'DistributeTransaction', component: DistributeTransaction, beforeEnter: redirect}, 


  // GAS
  { path: '/identify-transaction',name: 'IdentifyTransaction', component: IdentifyTransaction, beforeEnter: redirect}, 
  { path: '/identify-transaction-modify',name: 'IdentifyTransactionModify', component: IdentifyTransactionModify, beforeEnter: redirect}, 
  { path: '/matching-of-voucher',name: 'MatchingOfVoucher', component: MatchingOfVoucher, beforeEnter: redirect}, 
  { path: '/matching-of-voucher-modify',name: 'MatchingOfVoucherModify', component: MatchingOfVoucherModify, beforeEnter: redirect}, 

  // SUPERVISOR
  { path: '/edited-tag',name: 'EditedTag', component: EditedTag, beforeEnter: redirect}, 
  { path: '/tagging-and-vouchering',name: 'TaggingAndVouchering', component: TaggingAndVouchering, beforeEnter: redirect}, 
  { path: '/releasing',name: 'Releasing', component: Releasing, beforeEnter: redirect}, 

  
  // TAGGING
  { path: '/document-tagging',name: 'Tagging', component: Tagging, beforeEnter: redirect}, 
  { path: '/view-tagging/:id', name: 'ViewTagging', component: ViewTagging, beforeEnter: redirect},
  { path: '/releasing-of-cheque/', name: 'ReleasingOfCheque', component: ReleasingOfCheque, beforeEnter: redirect},
  { path: '/tagged-reports/', name: 'TaggedReports', component: TaggedReports, beforeEnter: redirect},
  { path: '/cheque-reports/', name: 'ChequeReports', component: ChequeReports, beforeEnter: redirect},
  { path: '/counter-receipt/', name: 'CounterReceipt', component: CounterReceipt, beforeEnter: redirect},



  //REQUESTOR
  { path: '/request-tagging',name: 'RequestTagging', component: Requestors, beforeEnter: redirect}, 
  { path: '/new-request',name: 'NewRequest', component: NewRequest, beforeEnter: redirect}, 
  { path: '/edit-request/:id',name: 'EditRequest', component: EditRequest, beforeEnter: redirect}, 
  { path: '/view-request/:id', name: 'ViewRequest', component: ViewRequest, beforeEnter: redirect},



  // LOGIN
  { path: '/',name: 'Home', component: Home},


  //ADMINISTRATOR
  { path: '/users',name: 'Users', component: Admin, beforeEnter: redirect}, // USERS LIST

  { path: '/add-users',name: 'AddUser', component: AddUser, beforeEnter: redirect}, // ADD USER
  { path: '/suppliers',name: 'Suppliers', component: Suppliers, beforeEnter: redirect}, // SUPPLIER
  { path: '/supplier-type',name: 'SupplierType', component: SupplierType, beforeEnter: redirect}, // SUPPLIER TYPE
  { path: '/users/edit/:id',name: 'EditUser', component: EditUser, beforeEnter: redirect}, // SHOW USER
  { path: '/category',name: 'AddCategory', component: AddCategory, beforeEnter: redirect}, //ADD/SHOW CATEGORIES
  { path: '/documents',name: 'Documents', component: Documents, beforeEnter: redirect}, // SHOW DOCUMENT 
  { path: '/add-documents',name: 'AddDocuments', component: AddDocuments, beforeEnter: redirect}, // ADD DOCUMENT
  { path: '/edit-documents/:id',name: 'EditDocuments', component: EditDocuments, beforeEnter: redirect}, // EDIT DOCUMENT
  { path: '/edit-documents/:id',name: 'EditDocuments', component: EditDocuments, beforeEnter: redirect}, // EDIT DOCUMENT
  { path: '/companies',name: 'Companies', component: Companies, beforeEnter: redirect}, //COMPANIES
  { path: '/reasons',name: 'Reasons', component: Reasons, beforeEnter: redirect}, //REASONS
  { path: '/banks',name: 'Banks', component: Banks, beforeEnter: redirect}, //BANKS
  { path: '/referrences',name: 'Referrences', component: Referrences, beforeEnter: redirect}, //BANK







]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
