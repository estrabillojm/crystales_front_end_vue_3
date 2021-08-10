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
          <th>Date Requested</th>
          <th>Transaction No.</th>
          <th>Document</th>
          <th>Company</th>
          <th>Supplier</th>
          <th>PO Amount</th>
          <th>Ref Amount</th>
          <th>Amount</th>
          <th>Payment</th>
          <th class="text-center">Action</th>
        </template>
        
        <template v-slot:tb-data>
            <tr v-for="(request, index) in myRequest" :key="index" class="requestors-request">
              <td>{{ request.date_requested }}</td>
              <td>{{ request.transaction_id }}</td>
              <td>{{ request.document_type }}</td>
              <td>{{ request.company }}</td>
              <td>{{ request.supplier }}</td>
              <td v-if="request.po_total_amount != 0">{{ request.po_total_amount }}</td>
              <td v-else><span class="material-icons gray-text">remove</span></td>
              <td v-if="request.referrence_total_amount != 0">{{ request.referrence_total_amount }}</td>
              <td v-else><span class="material-icons gray-text">remove</span></td>
              <td v-if="request.document_amount">{{ request.document_amount }}</td>
              <td v-else><span class="material-icons gray-text">remove</span></td>
              <td>{{ request.payment_type }}</td>
              <td class="text-center">

              
              <router-link :to="{name: 'ViewTagging', params: {id: request.id }}">
                  <span class="material-icons text-secondary btn-icon" title="View History">
                    
                      find_in_page
                    
                  </span>
              </router-link>

              &nbsp;

              <button type="button" class="btn-success rcv-btn" @click="receiveDoc(request.transaction_id, request.id)" v-if="request.status.toLowerCase() =='pending'">Receive</button>
              <router-link :to="{name: 'ViewTagging', params: {id: request.id }}" v-else>
                  <span class="material-icons text-warning btn-icon" title="Modify Request">
                    mode_edit
                  </span>
              </router-link>
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
        paymentStatus: 'Pending'
      }
    },
    created(){
       this.fetchMyRequest()
       this.loadPendings()
       this.$store.dispatch('setHeaderTitle','Tagging of Documents')
    },
    computed:{
      ...mapState([
        'currentPage',
        'rootData'
      ])
        
        
    },
    methods:{
      filterStatus(id, status){
        this.isActive = id
        if(status=='received'){
          axios.get(`/transactions?status=received`).then(res=>{
            this.myRequest = res.data
          })
        }else{
          axios.get(`/transactions?status=${status}`).then(res=>{
            this.myRequest = res.data
          })
        }
        
      },
      loadPendings(){
        axios.get(`/transactions`).then(res=>{
          this.myRequest = res.data
        })
      },
      receiveDoc(transaction_id, id){
         Swal.fire({
            title: ` <h4>Do you want to receive Transaction Number: ${transaction_id}</h4>`,
            showDenyButton: true,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: `Receive`,
            }).then((result) => {
            if (result.isConfirmed) {
              axios.patch(`/transactions/${id}`, {
                status: 'received by AP tagging'
              }).then(()=>{
                Swal.fire('Received!', '', 'success')
                this.fetchMyRequest()
              })
            }
        })
      },
      changeStatus(stat){
        this.paymentStatus = stat
      },
      fetchMyRequest(){
        axios.get('http://localhost:3000/transactions').then(res=>{
          this.myRequest = res.data
        })
      }
    }
    
}
</script>

<style scoped>
  @import '../../assets/css/dashboard-style.css';
  @import '../../assets/css/header-tab-style.css';


</style>