<template>
  <div id="cr-grid">
    <div class="sidebar-container">
      <Sidebar/>
    </div>
    <div class="main-container">
      <Navbar/>

      <!-- MODAL FOR REQUEST -->
      <Modal id="myModal" role="dialog">
        
        <template v-slot:modal-header  class="text-center">
          <p>Create New User</p>
        </template>
    
        <template v-slot:modal-body> 
      
              
              
              
              
     
        </template>
       
      </Modal>
  

    

      <!-- TABLE MODAL -->
      <span v-if="users != []">
      <DataTable>

        <template v-slot:tb-extra-btn>
          
            <router-link :to="{name: 'AddUser'}">
          
              <button class="btn btn-success mb-1" type="button">New User</button>
            </router-link>
        </template>

        <template v-slot:tb-btn-tab>
          
                    
        </template>

        <template v-slot:tb-search>
          <input type="text" @keyup.enter="searchData()" v-model="query" placeholder="Search">
        </template>
        <template v-slot:tb-header>
          <th>Full Name</th>
          <th>Username</th>
          <th>Role</th>
          <th>Department</th>
          <th>Active Date</th>
          <th>Inactive Date</th>
          <th class="text-center">Action</th>
        </template>
        
        <template v-slot:tb-data>

          
          <tr v-for="user in users.data" :key="user.id" class="hovered">
            <td>
              {{ `${user.last_name.toUpperCase()}, ${user.first_name.toUpperCase()} ${user.middle_name[0].toUpperCase()}.` }}
            </td>

            <td>
              {{ `${user.username }`}} 

            </td>

            <td>
              {{ user.role.toUpperCase() }}
            </td>

            <td>
              {{ user.department }}
            </td>

            <td>
              {{ user.created_at }}
            </td>
            
            <td>
              <span v-if="user.inactive_date">user.inactive_date</span>
              <span v-else>-</span>
            </td>

            
           
           
            <td class="text-center">
       
              <div class="btn-group setMaxWidth" role="group">   
                  <span id="btnGroupDrop1 mb-1" type="button" class="material-icons btn-block ellipsis" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">more_horiz</span>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  
                  <button class="dropdown-item mb-1" data-toggle="modal" data-target="#myModalView" @click="userDataView(user.id)">
                      <span class="text-primary">View</span> 
                  </button>

                  <button class="dropdown-item text-black mb-1" @click="editPage(user.id)">
                    <!-- <router-link class="ml-1" :to="{name: 'EditUser', params:{ id: user.id}}"> -->
                      <span class="text-warning">Edit</span> 
                  </button>

                  <button class="dropdown-item text-black mb-1" @click="archive(user.id)">
                      <span class="text-danger">Delete</span> 
                  </button>
                  </div>
              </div>



                
                <!-- <button class="btn btn-success btn-sm btn-show-parent"  data-toggle="modal" data-target="#myModalView" @click="userDataView(user.id)">
                  <span class="material-icons btn-show">visibility</span>
                  View</button>
                <router-link class="ml-1" :to="{name: 'EditUser', params:{ id: user.id}}">
                  <button class="btn btn-info btn-sm btn-show-parent">
                    <span class="material-icons btn-show">edit</span>
                    Edit</button>
                </router-link>

                <button class="btn btn-warning btn-sm btn-show-parent ml-1">
                  <span class="material-icons btn-delete text-warning"  @click="archive(user.id)">delete</span>
                  Abc
                </button> -->

                
            </td>

            


                  <!-- MODAL FOR REQUEST -->
      
      <!-- USER MODAL -->
 
        </tr>
        </template>

          <template v-slot:tb-paginate>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><button class="page-link" @click="changePage(rootUser.prev_page_url, 1)">Previous</button></li>
                    <li class="page-item"><button class="page-link">{{ currentPage }}</button></li>               
                    <li class="page-item"><button class="page-link" @click="changePage(rootUser.next_page_url, 2)">Next</button></li>
                </ul>
            </nav>
        </template>
      </DataTable>

      <Modal id="myModalView" role="dialog">
        <h1>ok</h1>
        <template v-slot:modal-header>
          <p class="text-primary"><strong>
            {{ modalData.last_name}}, {{ modalData.first_name}} {{ modalData.middle_name }}.
          </strong></p>
          
        </template>
        <template id="create-user-modal" v-slot:modal-body>
          
            <p><strong>Employee ID: </strong><em> {{ modalData.id_no}} </em></p><br>
            <p><strong>Position: </strong> <em>{{ modalData.position }}</em></p><br>
            <p><strong>Department: </strong> <em>{{ modalData.department }}</em></p><br>
            <p><strong>Role: </strong> <em>{{ modalData.role }}</em></p>
            <div class="col-md-12 bg-primary py-1 mt-2 text-center">
              <p class="text-white text-center"><strong>Privileges</strong></p>
            </div>
         
          <div class="modal-grid-1 mt-1">
            <div class="text-center modal-flex-1 mt-1 py-1" v-for="(perm, index) in modalData.permissions" :key="index">
              {{ perm }}
            </div>  
          </div>
          <span v-if="userDocs.length">
            <div class="col-md-12 bg-primary py-1 mt-2 text-center" >
              <p class="text-white text-center"><strong> Document Types</strong></p>
            </div>

            <div class="modal-grid-1 mt-1">
              <div class="text-center modal-flex-1 mt-1 py-1 dt-hover" v-for="(ud, index) in userDocs" :key="index" @click="showHiddenCategory(ud.id, ud.user, ud.type)">
                {{ ud.type }}
              </div> 
            </div>
          </span>
          <transition tag="span" name="show-categories" appear v-if="userCategory.categories.length != 0">
            <div class="child">
              <div class="col-md-12 bg-primary py-1 mt-2 text-center">
                <p class="text-white text-center"><strong> {{ userCategory.name }} Category</strong></p>
              </div>
              <div class="modal-grid-1 mt-1">
                <div class="text-center modal-flex-1 mt-1 py-1" v-for="(cat, index) in userCategory.categories" :key="index">
                  {{ cat }}
                </div> 
              </div>
            </div>
          </transition>
        </template>
      </Modal>

      

      </span>
      <span v-else>
        <Loading/>
      </span>
    </div>
  </div>
</template>

<script>
import Modal from '../../components/non-shared/UserDetailModal'
import Loading from '../../components/shared-components/Loading'
import {mapState} from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    components: { Modal, Loading},
    data(){
      return {
        result: false, 
        api: [],
        password: "",
        role: "",
        middleName: "",
        userData:{
          employeeId: "",
          fullName: "",
          password: "",
          department: "",
          role: "",
          permissions: []
        },
        modalData: [],
        userDocs: [],
        userCategory: {
          name: '',
          categories: []
        },
        catIdHolder: null,
        query: '',
        rootUser: [],
        currentPage: 1,
        
      }
    },
    created(){

        this.$store.dispatch('loadUsers')

        this.$store.dispatch('loadPermissions')

        this.fetchUser()

        

    },
    computed:{
        
        ...mapState([
            'users',
            'roles',
            'permissions',
            'pageResult',
           
        ])
        
    },
    methods:{

      editPage(userId){
        this.$router.push({name: 'EditUser', params:{ id: userId}})
      },
      async changePage(url, action){

        await this.$store.dispatch('changePage', [url, action])
        if(url != null){
          this.users = this.pageResult.data
          this.rootUser = this.pageResult
          this.currentPage = this.pageResult.data.current_page       
        }

      },
      async fetchUser(){
        await setTimeout(()=>{
          this.rootUser = this.users
        }, 500)
      },
      searchData(){
        alert("ok")
      },
      clearCategory(){
        this.userCategory.name = ""
        this.userCategory.categories = []
      },
      showHiddenCategory(doc_id, user,  doc_type){
        if(doc_type != this.userCategory.name){
          this.clearCategory()
          axios.get(`/users/${user}`).then(res=>{
            let userCat = res.data
            if(userCat.document_types[0].categories.length){
              axios.get(`/categories/all`).then(res=>{
                
                console.log('catHolder', catIdHolder)
                userCat.document_types.forEach(docid=>{
                  if(docid.document_id == doc_id){
                    docid.categories.forEach(cat=>{
                    
                      this.catIdHolder.forEach(holder=>{
                        
                        if(cat == holder.id){
                          console.log(holder.name)
                          this.userCategory.name = doc_type
                          this.userCategory.categories.push(holder.name)
                        }
                      })
                    })
                  }
                })
              })
            }

          })
        }
      },
      userDataView(user_id){
        this.clearCategory()
        this.permission = []
        this.userDocs = []
        axios.get(`/users/${user_id}`).then(res=>{
          this.modalData = res.data
          console.log(this.modalData)
          this.modalData.permissions.forEach(permission=>{
            this.permissions.push(permission)
            console.log(permission)
          })

          console.log(this.modalData)
          
            axios.get(`/documents?is_active=active`).then(res=>{
               let document = res.data
               document.forEach(doc=>{
                 this.modalData.document_types.forEach(md=>{
                   if(doc.document_id == md.document_id){
                     this.userDocs.push({ id: doc.document_id, type: doc.document_type, user: user_id})

                   }
                 })

               })
            })
        })
      },
      // getSinglePost(id){        
      //    this.posts.filter(post => post.id = id)   
      // },
      // dataHover(){   
      // }

      findEmployee(eid){
        
    },

    archive(uid){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success ml-2',
          cancelButton: 'btn btn-danger ml-2'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, move to archive!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Archived!',
            'Data has been moved to archive.',
            'success'
          )

          axios.post(`/users/archive/${uid}`).then(()=>{
            this.$store.dispatch('loadUsers')
            
          })
          
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Data not remove',
            'error'
          )
        }
      })  
    }
      
    }
    
}
</script>

<style scoped>
.show-categories-enter-from{
  opacity: 0;
  transform: scale(.3);
}

.show-categories-enter-active{
  transition:all .3s ease;
}


.show-categories-leave-to{
  opacity: 0;
  transform: scale(.3);
}

.show-categories-leave-active{
  transition:all .3s ease;
}

.dt-hover:hover{
  background:rgb(136, 136, 136);
  color:white;
  cursor:pointer;
  
  transition:all .3s ease;
}

.modal-grid-1{
  display:grid;
  grid-template-columns:repeat(4, 1fr);
  grid-auto-rows:minmax(50px, auto);
  gap:5px;
}

.modal-flex-1{
  background:#ccc;
  padding:5px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:5px;
}
.dt-grid{
  display:grid;
  grid-template-columns:repeat(4, 1fr);
  grid-column:1/3;
  gap:5px;
  text-align:center;
  margin-top:5px;
}

.dt-grid-2{
  display:grid;
  grid-template-columns:repeat(3, 1fr);
  grid-column:1/3;
  gap:5px;
  text-align:center;
  margin-top:5px;
}

.dt-ui{
  background:#ccc;
  padding:5px;
  border-radius:5px;
}

.header{
  background:rgb(58, 58, 252);
  grid-column:1/3;
  text-align:center;
  padding:5px;
  color:white;
}
.grid-info{
  display:grid;
  grid-template-columns:repeat(2, 1fr);
}

.status{
  color:rgb(71, 71, 71);
}

.status span{
  font-size:16px;
  color:green;
}

.auser-address p{
    display:inline;
    text-transform:uppercase;
    color:rgb(97, 97, 97);
}

/* .btn-show-parent{
  position:relative;
  overflow:hidden;

} */

/* .btn-show{
  position:absolute;
  color:rgb(23, 126, 23);
  font-size:30px;
  right:-12px;
  bottom:-12px;
  opacity:.6;
}


.btn-delete{
  position:absolute;
  color:rgb(194, 122, 28);
  font-size:30px;
  right:-12px;
  bottom:-12px;
  opacity:.6;
} */

form{
  min-height:600px;
}

  .cb-grid{
    display:grid !important;
    grid-template-columns:repeat(2, 1fr);

  }




.first-input-group{
  border:none;
  padding:5px 20px;
}

  .first-input-group input[type="text"]{
    background:white;
    min-width:100%;
  }

  .create-user-btn{
    display:flex;
    justify-content:center;
  }

  .create-user-btn button{
    padding:5px 20px;
    margin:5px;
    border:none;
    border-radius:5px;
    color:white;
    cursor:pointer;
  }

  .create-user-btn button:nth-child(1){
    background: #F15574;
  }


  .create-user-btn button:nth-child(2){
    background: #5E72E4;
  }

  #modal-dialog{
      max-width:50% !important;
  }

  .error{
    color:red;
  }


  .cb-flex{
    display:flex;
  }



</style>