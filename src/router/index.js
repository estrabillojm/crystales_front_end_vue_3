import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


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
import MatchingOfVoucher from '../views/gas/MatchingOfVoucher'


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

const routes = [


  // AP ASSOCIATE
  { path: '/approval',name: 'Approval', component: Approval}, 
  { path: '/activity-logs',name: 'ActivityLogs', component: ActivityLogs}, 
  { path: '/transaction-approval',name: 'TransactionApproval', component: TransactionApproval}, 


  // AP ASSOCIATE
  { path: '/creation-of-voucher',name: 'CreationOfVoucher', component: CreationOfVoucher}, 

  //TREASURY
  { path: '/creation-of-cheque',name: 'CreationOfCheque', component: CreationOfCheque}, 
  { path: '/clearing-of-cheque',name: 'ClearingOfCheque', component: ClearingOfCheque}, 


  // AP SPECIALIST
  { path: '/receive-receipt-report',name: 'ReceivedReceiptReport', component: ReceivedReceiptReport}, 
  { path: '/checking-of-voucher',name: 'CheckingOfVoucher', component: CheckingOfVoucher}, 
  { path: '/approving-of-voucher',name: 'ApprovingOfVoucher', component: ApprovingOfVoucher}, 

  // FILING CLERK
  { path: '/distribute-transaction',name: 'DistributeTransaction', component: DistributeTransaction}, 


  // GAS
  { path: '/identify-transaction',name: 'IdentifyTransaction', component: IdentifyTransaction}, 
  { path: '/matching-of-voucher',name: 'MatchingOfVoucher', component: MatchingOfVoucher}, 

  // SUPERVISOR
  { path: '/edited-tag',name: 'EditedTag', component: EditedTag}, 
  { path: '/tagging-and-vouchering',name: 'TaggingAndVouchering', component: TaggingAndVouchering}, 
  { path: '/releasing',name: 'Releasing', component: Releasing}, 

  
  // TAGGING
  { path: '/document-tagging',name: 'Tagging', component: Tagging}, 
  { path: '/view-tagging/:id', name: 'ViewTagging', component: ViewTagging},
  { path: '/releasing-of-cheque/', name: 'ReleasingOfCheque', component: ReleasingOfCheque},
  { path: '/tagged-reports/', name: 'TaggedReports', component: TaggedReports},
  { path: '/cheque-reports/', name: 'ChequeReports', component: ChequeReports},
  { path: '/counter-receipt/', name: 'CounterReceipt', component: CounterReceipt},



  //REQUESTOR
  { path: '/request-tagging',name: 'RequestTagging', component: Requestors}, 
  { path: '/new-request',name: 'NewRequest', component: NewRequest}, 
  { path: '/edit-request/:id',name: 'EditRequest', component: EditRequest}, 
  {path: '/view-request/:id', name: 'ViewRequest', component: ViewRequest},



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







]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
