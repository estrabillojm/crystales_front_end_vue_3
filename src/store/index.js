import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    posts: [], 
    users: [],
    roles:[
      {"id": 1, "name": "Requestor", "permissions":["Tagging of Request"]}, 
      {"id": 2, "name": "AP Tagging", "permissions":["Tagging of Request","Tagged Document Reports","Releasing of Cheque","Cheque Reports", "Tagging of Document"]},
      {"id": 3, "name": "GAS", "permissions":["Identifying of Receipt","Matching of Voucher"]},
      {"id": 4, "name": "Filing Clerk", "permissions":["Distributing of Document"]},
      {"id": 5, "name": "AP Associate", "permissions":["Creation of Voucher"]},
      {"id": 6, "name": "AP Specialist", "permissions":["Received Receipt Report","Checking of Voucher","Approving of Voucher"]},
      {"id": 7, "name": "Treasury", "permissions":["Creation of Cheque","Clearing of Cheque"]},
      {"id": 8, "name": "Approver", "permissions":["Edited Tag Approval", "Approving of Voucher", "Releasing", "Approval"]},
      {"id": 9, "name": "Administrator", "permissions": []}
    ],
    apis: [],
    permissions: [],
    documents: [],
    prm:[],
    contractor:[],
    category: [],
    
  },
      

  // MUTATIONS
  mutations: {
   
    LOAD_CATEGORY(state, category){
      state.category = category
    },

    LOAD_POSTS(state, posts){
      state.posts = posts
    },
    LOAD_USERS(state, users){
      state.users = users
    },
    

    LOAD_APIS(state, apis){
      state.apis = apis
    },
    LOAD_PERMISSIONS(state, permissions){
      state.permissions = permissions
    },

    LOAD_DOCUMENTS(state, loadDocuments){
      state.documents = loadDocuments
    },

    LOAD_PRMCATEGORY(state, loadPrmCategory){
      state.prm = loadPrmCategory
    },


    LOAD_CONTRACTORCATEGORY(state, loadContractorCategory){
      state.contractor = loadContractorCategory
    },
    
  },


  // ACTIONS
  actions: {

   


    loadCategory({ commit }){
      axios.get('/categories?is_active=active')
      .then(response=>{
        let category = response.data
        commit('LOAD_CATEGORY', category)
      })
      .catch(error => {
        console.log(error)
      })
    },

  


    //USERS
    loadUsers({ commit }){
      axios.get('/users?is_active=active')
      .then(response=>{
        
        let users = response.data
        commit('LOAD_USERS', users)
      })
      .catch(error => {
        console.log(error)
      })
    },

    //API
    loadApis({ commit }){
      axios.get('/api')
      .then(response=>{
        let apis = response.data
        console.log(apis , "tss")
        commit('LOAD_APIS', apis)
      })
      .catch(error => {
        console.log(error)
      })
    }, 


   



    //LOAD PERMISSIONS
    loadPermissions({ commit }){
      axios.get('http://localhost:3000/permissions')
      .then(response=>{
        
        let permissions = response.data
        commit('LOAD_PERMISSIONS', permissions)
      })
      .catch(error => {
        console.log(error)
      })
    }, 




    //LOAD DOCUMENT TYPE
    loadDocuments({ commit }){
      axios.get('/documents?is_active=active')
      .then(response=>{
        
        let documents = response.data
        commit('LOAD_DOCUMENTS', documents)
      })
      .catch(error => {
        console.log(error)
      })
    }, 
  },
  modules: {
  }
})
