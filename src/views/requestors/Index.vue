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
        </template>

        <template v-slot:tb-btn-tab>
          
                    
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
        
        <template v-slot:tb-data>

          
          
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

export default {
    components: { Sidebar, Navbar, DataTable, Modal, Loading},
    data(){
      return {
        query: ''
      }
    },
    created(){
       
    },
    computed:{
        
        
    },
    methods:{
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


</style>