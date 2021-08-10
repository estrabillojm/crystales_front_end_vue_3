<template>
  <div id="cr-grid">
    <div class="sidebar-container">
      <Sidebar/>
    </div>
    <div class="main-container">
      <Navbar/>

      <DataTable>

        <template v-slot:tb-extra-btn>
          
            <router-link :to="{name: 'NewRequest'}">
          
              <button class="btn btn-success mb-1" type="button">New Request</button>
            </router-link>


            <router-link :to="{name: 'TransactionHistory'}">
              <button class="btn mb-1 ml-2" type="button">History</button>
            </router-link>

        </template>

        <template v-slot:tb-btn-tab>
            <div class="btn-group" role="group">
              <button type="button" :class="{'btn':true ,'btn-primary': isActive != 1, 'active-nav': isActive == 1}" @click="filterStatus(1)">Requested</button>
              <button type="button" :class="{'btn':true ,'btn-primary': isActive != 2, 'active-nav': isActive == 2}" @click="filterStatus(2)">Hold</button>
              <button type="button" :class="{'btn':true ,'btn-primary': isActive != 3, 'active-nav': isActive == 3}" @click="filterStatus(3)">Rejected</button>


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
          <th>Status</th>
          <th class="text-center">Action</th>
        </template>

        <template v-slot:tb-no-data v-if="myRequest.length == 0">
          <td class="text-center text-no-show" colspan=11>No Data to Show</td>
        </template>
        
        <template v-slot:tb-data v-else>
            <tr v-for="(request, index) in myRequest" :key="index" class="requestors-request">
              <td>{{ request.date_requested }}</td>
              <td>{{ request.transaction_id }}</td>
              <td>{{ request.document_type }}</td>
              <td>{{ request.company }}</td>
              <td>{{ request.supplier }}</td>
              <td v-if="request.po_total_amount != 0">{{ request.po_total_amount }}</td>
              <td v-else><span class="material-icons gray-text">remove</span></td>
              <td v-if="request.referrence_total_amount != null">{{ request.referrence_total_amount }}</td>
              <td v-else><span class="material-icons gray-text">remove</span></td>
              <td v-if="request.document_amount">{{ request.document_amount }}</td>
              <td v-else><span class="material-icons gray-text">remove</span></td>
              <td>{{ request.payment_type }}</td>
              <td>{{ request.status }}</td>
              <td class="text-center">

                <!-- <router-link :to="{name: 'ViewTagging', params: {id: request.id }}">
                  <span class="material-icons text-secondary btn-icon" title="Modify Request">
                    find_in_page
                  </span>
                </router-link> -->


                &nbsp;


                
                <router-link :to="{name: 'EditRequest', params: {id: request.id }}" v-if="request.status == 'Pending'">
                  <span class="material-icons text-warning btn-icon" title="Edit Request">
                    mode_edit
                  </span>
                </router-link>

                <router-link :to="{name: 'ViewRequest', params: {id: request.id }}" v-else>
                  <span class="material-icons text-warning btn-icon" title="View Request">
                    visibility
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

      

      <!-- <div class="content" v-else>
      
      <div class="cr-datatable">
            <div class="cr-data-btn">
                <ul class="request">
                    <router-link :to="{name: 'NewRequest'}">
                    <button class="btn btn-success mb-1" type="button">New Request</button>
                  </router-link>
                </ul>
            </div>

            <div class="col-lg-12 border bg-gray text-center">
              <p class="text-white lead">No Data to Show</p>
            </div>
        </div>
      </div> -->

      
    </div>
  </div>
</template>

<script>
import Sidebar from '../../components/shared-components/Sidebar'
import Navbar from '../../components/shared-components/Navbar'
import DataTable from '../../components/shared-components/DataTable'
import Modal from '../../components/shared-components/Modal'
import Loading from '../../components/shared-components/Loading'
import {mapActions, mapState} from 'vuex'
import axios from 'axios'

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
       this.$store.dispatch('setHeaderTitle','Tagging of Request')
    },
    computed:{
      	...mapState([
          'currentPage',
          'rootData'
        ]),
        
        
    },
    methods:{

      filterStatus(id){
        this.isActive = id
      },
      changeStatus(stat){
        this.paymentStatus = stat

      },
      fetchMyRequest(){
        axios.get('/transactions').then(res=>{
          this.myRequest = res.data
        })
      },
      getSinglePost(id){        
         this.posts.filter(post => post.id = id)   
      },
      dataHover(){
        
      }
    }
    
}
</script>

<style scoped>
  @import '../../assets/css/dashboard-style.css';
    .active-nav{
    color:rgb(29, 29, 29);
    background:rgb(145, 145, 255);
    transition:all .2s ease-in;
  }

  .setMaxWidth{
    min-width:200px;
  }


  .text-black{
    color:rgb(36, 36, 36);
    font-size:17px;
  }
  .bg-gray{
    background:rgb(158, 158, 158);
    padding:20px 5px;
    border-radius:5px;
    color:white;
  }
  .btn-icon{
    cursor: pointer;
  }

  .requestors-request td{
    text-transform:uppercase;
  }

  .gray-text{
    color:rgb(133, 133, 133);
  }


</style>