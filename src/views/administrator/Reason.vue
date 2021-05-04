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



        <template id="create-user-modal" v-slot:modal-body>
          <div class="first-input-group">
            <span class="pt-5">
            
              <div class="input-grp mb-3">
                <label for="">Employee ID</label>
                <input type="text">
              </div>

              <div class="input-grp mb-3">
                <label for="">Full Name</label>
                <input type="text" class="disable" disabled>
              </div>

              <div class="input-grp mb-3">
                <label for="">Password</label>
                <input type="text" class="disable" disabled>
              </div>

              <div class="input-grp mb-3">
                <label for="">Department</label>
                <input type="text"  class="disable" disabled>
              </div>

              <div class="input-grp mb-3">
                <label for="">Role</label>
                <input type="text">
              </div>

              <div class="create-user-btn">
                <button type="submit">Register</button>
                <button data-dismiss="modal">Close</button>
              </div>
            </span>
          </div>
          

          
        </template>
      </Modal>


      <!-- TABLE MODAL -->
      <span v-if="users.length">
      <DataTable>

        <template v-slot:tb-extra-btn>
          <button class="request-btn" type="button" data-toggle="modal" data-target="#myModal">New User</button>
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

export default {
    components: { Sidebar, Navbar, DataTable, Modal, Loading},
    created(){
        this.$store.dispatch('loadUsers')
    },
    computed:{
        
        ...mapState([
            'users'
        ]),
        
    },
    methods:{
      // getSinglePost(id){        
      //    this.posts.filter(post => post.id = id)   
      // },
      // dataHover(){
        
      // }
    }
    
}
</script>

<style scoped>
  @import '../../assets/css/dashboard-style.css';



  .first-input-group{
    border:none;
    padding:5px 20px;
  }

  .first-input-group input{
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

  .modal-dialog{
      min-width:30%;
  }


</style>