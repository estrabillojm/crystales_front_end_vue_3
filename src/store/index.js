import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    posts: [], 
    users: [],
    roles:[
      {"id": 1, "name": "Requestor", "def_perm":["Tagging of Request"]}, 
      {"id": 2, "name": "AP Tagging", "def_perm":["Tagging of Request","Tagged Document Reports","Releasing of Cheque","Cheque Reports", "Tagging of Document"]},
      {"id": 3, "name": "GAS", "def_perm":["Identifying of Receipt","Matching of Voucher"]},
      {"id": 4, "name": "Filing Clerk", "def_perm":["Distributing of Document"]},
      {"id": 5, "name": "AP Associate", "def_perm":["Creation of Voucher"]},
      {"id": 6, "name": "AP Specialist", "def_perm":["Received Receipt Report","Checking of Voucher","Approving of Voucher"]},
      {"id": 7, "name": "Treasury", "def_perm":["Creation of Cheque","Clearing of Cheque"]},
      {"id": 8, "name": "Approver", "def_perm":["Edited Tag Approval", "Approving of Voucher", "Releasing", "Approval"]}
    ],
    apis: [],
    permissions: [],
    documentTypes: [],
    prm:[],
    contractor:[],
    
  },
      

  // MUTATIONS
  mutations: {
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

    LOAD_DOCTYPES(state, loadDocType){
      state.documentTypes = loadDocType
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

    
    loadPosts({ commit }){
      axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response=>{
        console.log(response.data) 
        let posts = response.data
        commit('LOAD_POSTS', posts)
      })
      .catch(error => {
        console.log(error)
      })
    },


    //USERS
    loadUsers({ commit }){
      axios.get('/users')
      .then(response=>{
        console.log(response.data) 
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
        console.log(response.data) 
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
      axios.get('/permissions')
      .then(response=>{
        console.log(response.data) 
        let permissions = response.data
        commit('LOAD_PERMISSIONS', permissions)
      })
      .catch(error => {
        console.log(error)
      })
    }, 




    //LOAD DOCUMENT TYPE
    loadDocType({ commit }){
      axios.get('/document_types')
      .then(response=>{
        console.log(response.data) 
        let docType = response.data
        commit('LOAD_DOCTYPES', docType)
      })
      .catch(error => {
        console.log(error)
      })
    }, 

    // LOAD PRM CATEGORY
    loadPrmCategory({ commit }){
      axios.get('/prm_category')
      .then(response=>{
        console.log(response.data) 
        let prm = response.data
        commit('LOAD_PRMCATEGORY', prm)
      })
      .catch(error => {
        console.log(error)
      })
    }, 


    //LOAD CONTRACTOR'S CATEGORY
    loadContractorsCategory({ commit }){
      axios.get('/contractor_category')
      .then(response=>{
        console.log(response.data) 
        let contractor = response.data
        commit('LOAD_CONTRACTORCATEGORY', contractor)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  modules: {
  }
})
