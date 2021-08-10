<template>
  <div id="cr-grid">
    <div class="sidebar-container">
      <Sidebar/>
    </div>
    <div class="main-container">
      <Navbar/>

      <ViewTransaction/>

  </div>

  </div>
</template>

<script>
import Sidebar from '../../components/shared-components/Sidebar'
import Navbar from '../../components/shared-components/Navbar'
import DataTable from '../../components/shared-components/DataTable'
import Modal from '../../components/shared-components/Modal'
import Loading from '../../components/shared-components/Loading'
import ViewTransaction from '../../components/shared-components/ViewTransaction'

import {mapState} from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'


export default {
    components: { Sidebar, Navbar, DataTable, Modal, Loading, ViewTransaction},
    data(){
      return {
        isActive: 1,
        query: '',
        myRequest: [],
        paymentStatus: 'Pending'
      }
    },
    created(){
      this.$store.state.backRoute = 'MatchingOfVoucher'
    },
    computed:{
        ...mapState([
          'currentPage',
          'rootData',
        ])
        
    },
    methods:{
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