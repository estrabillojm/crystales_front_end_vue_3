import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    posts: [], 
    users: [],
    roles:[
      {"id": 1, "name": "Requestor", "def_perm":["Tagged Document Reports", "Cheque Reports", "Received Receipt Report"]}, 
      {"id": 2, "name": "AP Tagging", "def_perm":["Edited Tag Approval", "Matching of Voucher", "Received Receipt Report 2"]},
      {"id": 3, "name": "GAS"},
      {"id": 4, "name": "AP Associate", "def_perm":["Tagged Document Reports", "Cheque Reports", "Received Receipt Report", "Tagging of Request", "Approving of Voucher" ]},
      {"id": 5, "name": "AP Specialist", "def_perm":[]},
      {"id": 6, "name": "Treasury", "def_perm":[]},
      {"id": 7, "name": "Supervisor", "def_perm":[]},
      {"id": 8, "name": "Manager", "def_perm":[]}, 
      {"id": 9, "name": "Approver", "def_perm":[]}
    ],
    api: [],
    permissions: []
    
  },


  // MUTATIONS
  mutations: {
    LOAD_POSTS(state, posts){
      state.posts = posts
    },
    LOAD_USERS(state, users){
      state.users = users
    },
    

    LOAD_API(state, api){
      state.api = api
    },
    LOAD_PERMISSIONS(state, permissions){
      state.permissions = permissions
    }
    
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
    loadApi({ commit }){
      axios.get('/api')
      .then(response=>{
        console.log(response.data) 
        let api = response.data
        commit('LOAD_API', api)
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
  },
  modules: {
  }
})
