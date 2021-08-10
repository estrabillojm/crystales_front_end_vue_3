<template>
  <div id="cr-grid">
    <div class="sidebar-container">
      <Sidebar/>
    </div>
    <div class="main-container">
      <Navbar/>

      <DataTable>

        <template v-slot:tb-extra-btn>
          
            <!-- <router-link :to="{name: 'NewRequest'}">
          
              <button class="btn btn-success mb-1" type="button">New Request</button>
            </router-link> -->
        </template>

        <template v-slot:tb-btn-tab>
            <div class="btn-group mb-1" role="group">
              <button type="button" :class="{'btn':true ,'btn-primary': isActive != 1, 'active-nav': isActive == 1}" @click="filterStatus(1, 'received')">Pending</button>
              <button type="button" :class="{'btn':true ,'btn-primary': isActive != 2, 'active-nav': isActive == 2}" @click="filterStatus(2, 'tagged by AP tagging')">Released</button>
              <button type="button" :class="{'btn':true ,'btn-primary': isActive != 3, 'active-nav': isActive == 3}" @click="filterStatus(3, 'hold by AP tagging')">Returned</button>
              <!-- <button type="button" :class="{'btn':true ,'btn-primary': isActive != 4, 'active-nav': isActive == 4}" @click="filterStatus(4, 'rejected by AP tagging')">Rejected</button> -->

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
          <th>Date Prepared</th>
          <th>Tag No.</th>
          <th>Transaction No.</th>
          <th>Document</th>
          <th>Company</th>
          <th>Supplier</th>
          <th>Number of Cheque(s)</th>
          <th>Ref Amount</th>
          <th>Amount</th>
          <th>Payment</th>
          <th class="text-center">Action</th>
        </template>

        <template v-slot:tb-no-data v-if="transactions.length == 0">
          <td class="text-center text-no-show" colspan=11>No Data to Show</td>
        </template>
        
        <template v-slot:tb-data v-else>

            <tr class="requestors-request" v-for="(tr, index) in transactions" :key="index">
              <td></td>
              <td></td>
              <td>{{ tr.transaction_id }}</td>
              <td>{{ tr.document_type }}</td>
              <td>{{ tr.company }}</td>
              <td>{{ tr.supplier }}</td>
              <td>{{ tr.po_total_amount }}</td>
              <td v-if="tr.referrence_total_amount">{{ tr.referrence_total_amount }}</td>
              <td v-else><span class="material-icons gray-text">remove</span></td>
              <td>{{ tr.document_amount }}</td>
              <td>{{ tr.payment_type }}</td>
              
              
              <td class="text-center">
                
              <!-- <button type="button" class="btn-success rcv-btn">Receive</button> -->
              <!-- <router-link :to="{name: 'IdentifyTransactionModify'}"> -->
                <span class="material-icons text-warning btn-icon" @click="modifySingleTransaction([tr.id, {name: 'IdentifyTransactionModify'}])" title="Modify Request">
                  mode_edit
                </span>
              <!-- </router-link> -->
              </td>
            </tr>
        </template>

        <template v-slot:tb-paginate>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><button class="page-link" @click="changePage(rootData.prev_page_url, 1)">Previous</button></li>
                    <li class="page-item"><button class="page-link">{{ currentPage }}</button></li>               
                    <li class="page-item"><button class="page-link" @click="changePage(rootData.next_page_url, 2)">Next</button></li>
                </ul>
            </nav>
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
import {mapState, mapActions} from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'


export default {
    components: { Sidebar, Navbar, DataTable, Modal, Loading},
    data(){
      return {
        isActive: 1,
        query: '',
        myRequest: [],
        paymentStatus: 'Pending'
      }
    },
    created(){
      this.getAllTransaction()
      this.$store.dispatch('setHeaderTitle','Releasing')
    },
    computed:{
      ...mapState([
        'currentPage',
        'rootData'
      ]),
      ...mapState('requests', ['transactions'])
        
        
    },
    methods:{
      ...mapActions('requests', ['getAllTransaction']),
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
  
</style>