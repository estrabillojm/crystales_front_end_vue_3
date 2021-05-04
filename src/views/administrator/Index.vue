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
      <span v-if="users.length">
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
            <td>{{ user.name }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.department }}</td>
            <td>{{ user.active_date }}</td>
            <td>
              <span v-if="user.inactive_date">user.inactive_date</span>
              <span v-else>-</span>
            </td>
           
           
            <td class="text-center">
                
            </td>


            <!-- MODAL -->
            
        </tr>
        </template>
      </DataTable>
      

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
import Modal from '../../components/shared-components/Modal'
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
        this.$store.dispatch('loadRoles')
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


    //SWEET ALERT
    saveEmployee(){
      
    }
      
    }
    
}
</script>

<style scoped>

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