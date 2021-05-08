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
          
              <button class="request-btn" type="button">New User</button>
            </router-link>
        </template>

        <template v-slot:tb-btn-tab>
          
                    
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

          
          <tr v-for="user in users" :key="user.id" class="hovered">
            <td>
              {{ `${user.lastname.toUpperCase()}, ${user.firstname.toUpperCase()} ${user.middlename[0].toUpperCase()}.` }}
            </td>

            <td>
              {{ user.username }}
            </td>

            <td>
              {{ user.role.toUpperCase() }}
            </td>

            <td>
              {{ user.department }}
            </td>

            <td>
              date-back end
            </td>
            
            <td>
              <span v-if="user.inactive_date">user.inactive_date</span>
              <span v-else>-</span>
            </td>
           
           
            <td class="text-center">
                
                <button class="btn btn-success btn-sm btn-show-parent"  data-toggle="modal" :data-target="`#myModal${user.id}`">
                  <span class="material-icons btn-show">visibility</span>
                  View</button>
                


                <router-link class="ml-1" :to="{name: 'EditUser', params:{ id: user.id}}">
                  <button class="btn btn-info btn-sm btn-show-parent">
                    <span class="material-icons btn-show">edit</span>
                    Edit</button>
                </router-link>


                
                  <button class="btn btn-warning btn-sm btn-show-parent ml-1" @click="archive(user.id)">
                    <span class="material-icons btn-delete">delete</span>
                    Archive
                  </button>
                
            </td>


                  <!-- MODAL FOR REQUEST -->
      <Modal :id="`myModal${user.id}`" role="dialog">

        <template id="create-user-modal" v-slot:modal-body>
          <h3 class="text-primary">
            {{ `${user.lastname.toUpperCase()}, ${user.firstname.toUpperCase()} ${user.middlename[0].toUpperCase()}.` }}
          </h3>
          <p class="status mt-2"><strong>{{user.role}}</strong></p>
          <hr class="mb-2">
          <div class="grid-info">
            <p class="status"><strong>Username: </strong>{{ user.username }}</p>
            <p class="status"><strong>Employee ID: </strong>{{ user.user_id }}</p>
            <p class="status"><strong>Department: </strong>{{ user.department }}</p>
    
          </div>

          <div class="grid-info">
            <div class="header">
              Privileges
            </div>
            
            <span class="dt-grid-2">
              <div class="dt-ui" v-for="dt in user.permissions" :key="dt">{{ dt }}</div>
            </span>
          </div>
          

          <div class="grid-info mt-3" v-if="user.document_type.length">
            <div class="header">
              Document Type
            </div>
            
            <span class="dt-grid">
              <div class="dt-ui" v-for="dt in user.document_type" :key="dt">{{ dt }}</div>
            </span>
          </div>
          
          
        </template>
      </Modal>
      <!-- USER MODAL -->

            
        </tr>
        </template>
      </DataTable>

      <h1>{{ apis }}</h1>
      

      </span>
      <span v-else>
        <Loading/>
      </span>
    </div>
  </div>
</template>

<script>
import Sidebar from '../../components/shared-components/Sidebar'
import Navbar from '../../components/shared-components/Navbar'
import DataTable from '../../components/shared-components/DataTable'
import Modal from '../../components/non-shared/UserDetailModal'
import Loading from '../../components/shared-components/Loading'
import {mapState} from 'vuex'
import vSelect from 'vue-select'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    components: { Sidebar, Navbar, DataTable, Modal, Loading},
    data(){
      return {
        result: false, 
        api: [],
        password: "",
        role: "",
        userData:{
          employeeId: "",
          fullName: "",
          password: "",
          department: "",
          role: "",
          permissions: []
        }
      }
    },
    created(){

        this.$store.dispatch('loadUsers')

        this.$store.dispatch('loadPermissions')
    },
    computed:{
        
        ...mapState([
            'users',
            'roles',
            'permissions',
           
        ]),
        
    },
    methods:{
      // getSinglePost(id){        
      //    this.posts.filter(post => post.id = id)   
      // },
      // dataHover(){   
      // }

      findEmployee(eid){
        axios.get(`/api?employee_id=${eid}`).then(response=>{
        this.api = response.data
        if (this.api.length){
          this.result = true;
          this.password = this.employeeId
        }else{
          this.result = false;
          this.password = ""
        }
      })
      .catch(error => {
        console.log(error)
      })
    },

    archive(uid){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
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

          axios.delete(`/users/${uid}`).then(()=>{
            this.$store.dispatch('loadUsers')
            console.log('data deleted')
          })
          
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })  
    }
      
    }
    
}
</script>

<style scoped>
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

.btn-show-parent{
  position:relative;
  overflow:hidden;
  

}

.btn-show{
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
}

form{
  border:3px solid red;
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