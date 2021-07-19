<template>
  <div id="cr-grid">
    <div class="sidebar-container">
      <Sidebar/>
    </div>
    <div class="main-container">
      <Navbar/>

      <DataTable>

        <template v-slot:tb-extra-btn>
          
            <div class="btn-group mb-1" role="group">
              <div class="btn-group setMaxWidth" role="group">
                <button id="btnGroupDrop1" type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{ docStatus }}
                </button>
                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <button class="dropdown-item text-black" @click="changeStatus('Import')">Import</button>
                  <button class="dropdown-item text-black" @click="changeStatus('Export')">Export</button>
                </div>
              </div>
            </div>
        </template>

        <template v-slot:tb-btn-tab>
            <div class="btn-group mb-1" role="group">
              <button type="button" :class="{'btn':true ,'btn-primary': isActive != 1, 'active-nav': isActive == 1}" @click="filterStatus(1, 'received')">Requested</button>
              <button type="button" :class="{'btn':true ,'btn-primary': isActive != 2, 'active-nav': isActive == 2}" @click="filterStatus(2, 'tagged by AP tagging')">Tagged</button>
              <button type="button" :class="{'btn':true ,'btn-primary': isActive != 3, 'active-nav': isActive == 3}" @click="filterStatus(3, 'hold by AP tagging')">Hold</button>
              <button type="button" :class="{'btn':true ,'btn-primary': isActive != 4, 'active-nav': isActive == 4}" @click="filterStatus(4, 'rejected by AP tagging')">Rejected</button>

              <!-- <div class="btn-group setMaxWidth" role="group">
                <button id="btnGroupDrop1" type="button" class="btn btn-block btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{ paymentStatus }}
                </button>
                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <button class="dropdown-item text-black" @click="changeStatus('Pending')">Pending</button>
                  <button class="dropdown-item text-black" @click="changeStatus('Paid')">Paid</button>
                </div>
              </div> -->
            </div>
        </template>
   
        <template v-slot:tb-search>
          <input type="text" @keyup.enter="searchData()" v-model="query" placeholder="Search">
        </template>
        <template v-slot:tb-header>
          <th>Date of RR</th>
          <th>PO No.</th>
          <th>RR No.</th>
          <th>Department </th>
          <th>Supplier</th>
          <th>Amount</th>
          <th>Status</th>
          <th class="text-center">Action</th>
        </template>

        <template v-slot:tb-no-data>
          <td class="text-center text-no-show" colspan=10>No Data to Show</td>
        </template>
        
        <template v-slot:tb-data>
            <!-- <tr class="requestors-request">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              
              <td class="text-center">
                
              <button type="button" class="btn-success rcv-btn">Receive</button>
              <router-link :to="{name: 'Tagging'}">
                  <span class="material-icons text-warning btn-icon" title="Modify Request">
                    mode_edit
                  </span>
              </router-link>
              </td>
            </tr> -->
        </template>

      </DataTable>

    

      
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
import axios from 'axios'
import Swal from 'sweetalert2'


export default {
    components: { Sidebar, Navbar, DataTable, Modal, Loading},
    data(){
      return {
        isActive: 1,
        query: '',
        myRequest: [],
        docStatus: 'Import'
      }
    },
    created(){

    },
    computed:{
        
        
    },
    methods:{
      changeStatus(str){
        this.docStatus = str
      },
       filterStatus(id, status){
        this.isActive = id
        if(status=='received'){
          axios.get(`http://localhost:3000/transaction?status=received`).then(res=>{
            this.myRequest = res.data
          })
        }else{
          axios.get(`http://localhost:3000/transaction?status=${status}`).then(res=>{
            this.myRequest = res.data
          })
        }
        
      },

    }
      
    
}
</script>

<style scoped>
  @import '../../assets/css/dashboard-style.css';
  @import '../../assets/css/header-tab-style.css';

  .text-black{
    color:black;
  }
  
</style>