<template>
  <div class="page-wrapper chiller-theme toggled" id="sidebar-xl">
  <a id="show-sidebar" class="btn btn-sm btn-dark" href="#">
    <i class="fas fa-bars"></i>
  </a>
  <nav id="sidebar" class="sidebar-wrapper">
    <div class="sidebar-content">
      <div class="sidebar-brand">
       
         
      </div>
      <div class="sidebar-header">
        <div class="user-pic">
          <img class="img-responsive img-rounded" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
            alt="User picture">
        </div>

        
        <div class="user-info">
          <span class="user-name text-white"> {{ result.first_name }}
            <strong>{{ result.last_name }}</strong>
          </span>
          <span class="user-role">{{role}}</span>
          <span class="user-status">
            <i class="fa fa-circle"></i>
            <span class="text-white">Online</span>
          </span>
        </div>
      </div>

      
        
      
      <!-- sidebar-header  -->
      
      <div class="sidebar-menu">
        <ul id="bg-primary" >
  
          <li class="sidebar-dropdown">
            <a href="#">
              <i class="material-icons font-color">perm_identity</i>
              <span id="text-white">Master Lists</span>
            </a>

            <div class="sidebar-submenu" id="color-white">
              <ul id="bg-primary">
                <li>
                  <router-link class="text-white" :to="{ name: 'Users'}">User Accounts</router-link>
                </li>

                <li>
                  <router-link class="text-white" :to="{ name: 'Documents'}">Documents</router-link>
                </li>

                <li>
                  <router-link class="text-white" :to="{ name: 'AddCategory'}">Categories</router-link>
                </li>

                <li>
                  <router-link class="text-white" :to="{ name: 'Companies'}">Companies</router-link>
                </li>

                <li>
                  <router-link class="text-white" :to="{ name: 'Referrences'}">Referrences</router-link>

                </li>

                <li>
                  <router-link class="text-white" :to="{ name: 'Reasons'}">Reasons</router-link>
                  
                </li>

                <li>
                  <router-link class="text-white" :to="{ name: 'Banks'}">Banks</router-link>
                </li>

                <li>
                    <router-link class="text-white" :to="{ name: 'SupplierType'}">Supplier Type</router-link>
                </li>


                <li>
                    <router-link class="text-white" :to="{ name: 'Suppliers'}">Suppliers</router-link>
                </li>

                
                
                

                


                

                
              </ul>
            </div>
          </li>

          <li class="header-menu">
            <span id="text-white">Management</span>
          </li>


          <li class="sidebar-dropdown">
            <a href="#">
              <i class="material-icons font-color">description</i>
              <span id="text-white">Document</span>
              
            </a>

            <div class="sidebar-submenu">
              <ul id="bg-primary" >
                <li>
                  <router-link class="text-white" :to="{ name: 'RequestTagging'}">Tagging of Request</router-link>
                </li>

                <li>
                  <router-link class="text-white" :to="{ name: 'IdentifyTransaction'}">Identify</router-link>
                </li>

                <li>
                  <router-link class="text-white" :to="{ name: 'DistributeTransaction'}">Distribute</router-link>
                </li>

                <li>
                  <router-link class="text-white" :to="{ name: 'ReceivedReceiptReport'}">Received Receipt Report</router-link>
                </li>


                
  
                

                <li>
                  <router-link class="text-white" :to="{ name: 'Tagging'}">Tagging of Documents</router-link>
                </li>

                <li>
                  <router-link class="text-white" :to="{ name: 'EditedTag'}">Approve Edited Tag</router-link>
                </li>


                <li>
                  <router-link class="text-white" :to="{ name: 'CounterReceipt'}">Counter Receipt</router-link>
                </li>
              </ul>
            </div>
          </li>
          <li class="sidebar-dropdown">
            <a href="#">
              <i class="material-icons font-color">payments</i>
              <span id="text-white">Cheque</span>
            
            </a>
            <div class="sidebar-submenu">
              <ul id="bg-primary" >
                <li>
                  <router-link class="text-white" :to="{ name: 'ReleasingOfCheque'}">Releasing of Cheque</router-link>
                </li>

                <li>
                  <router-link class="text-white" :to="{ name: 'CreationOfCheque'}">Creation of Cheque</router-link>
                </li>

                <li>
                  <router-link class="text-white" :to="{ name: 'ClearingOfCheque'}">Clearing of Cheque</router-link>
                </li>

                
             
              </ul>
            </div>
          </li>
          <li class="sidebar-dropdown">
            <a href="#">
              <i class="material-icons font-color">summarize</i>
              <span id="text-white">Reports</span>
            </a>
            <div class="sidebar-submenu">
              <ul id="bg-primary" >
                <li>
                  <router-link class="text-white" :to="{ name: 'TaggedReports'}">Tagged Reports</router-link>
                </li>

                <li>
                  <router-link class="text-white" :to="{ name: 'ChequeReports'}">Cheque Reports</router-link>
                </li>
            
              </ul>
            </div>
          </li>
          <li class="sidebar-dropdown">
            <a href="#">
              <i class="material-icons font-color">reviews</i>
              <span id="text-white">Voucher</span>
            </a>
            <div class="sidebar-submenu">
              <ul id="bg-primary" >

                <li>
                  <router-link class="text-white" :to="{ name: 'MatchingOfVoucher'}">Matching of Voucher</router-link>
                </li>

                <li>
                  <router-link class="text-white" :to="{ name: 'CreationOfVoucher'}">Creation of Voucher</router-link>
                </li>

                <li>
                  <router-link class="text-white" :to="{ name: 'CheckingOfVoucher'}">Checking of Voucher</router-link>
                </li>

                <li>
                  <router-link class="text-white" :to="{ name: 'ApprovingOfVoucher'}">Approving of Voucher</router-link>
                </li>

             
              </ul>
            </div>
          </li>



          <li class="sidebar-dropdown">
            <a href="#">
              <i class="material-icons font-color">security</i>
              <span id="text-white">Confidential</span>
            </a>
            <div class="sidebar-submenu">
              <ul id="bg-primary" >

                <li>
                  <router-link class="text-white" :to="{ name: 'TaggingAndVouchering'}">Tagging and Vouchering</router-link>
                </li>

                <li>
                  <router-link class="text-white" :to="{ name: 'Releasing'}">Releasing</router-link>
                </li>

                <li>
                  <router-link class="text-white" :to="{ name: 'Approval'}">Approval</router-link>
                </li>

                <li>
                  <router-link class="text-white" :to="{ name: 'ActivityLogs'}">Activity Logs</router-link>
                </li>

                
              </ul>
            </div>
          </li>




          <li class="sidebar-dropdown">
            <a href="#">
              <i class="material-icons font-color">task</i>
              <span id="text-white">Approval</span>
            </a>
            <div class="sidebar-submenu">
              <ul id="bg-primary" >
                <li>
                  <router-link class="text-white" :to="{ name: 'TransactionApproval'}">Transaction Approval</router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <!-- sidebar-menu  -->
    </div>
    <!-- sidebar-content  -->
    <!-- <div class="sidebar-footer">
      
      <a href="#" @click="logOut">
        <i class="fa fa-power-off"></i>
      </a>
    </div> -->

    <button @click="logOut()">Logout</button>
  </nav>
</div>

</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      role: '',
      userId: null,
      result: []
    }
  },

  created(){
    
  },
  methods:{
    logOut(){
      axios.post('/logout').then(res=>{
        $router.push({name: ''})
      })
    }
  },
  
  mounted(){

    $(document).ready(function(){
      $(".sidebar-dropdown > a").click(function() {
    $(".sidebar-submenu").slideUp(200);
    if (
      $(this)
        .parent()
        .hasClass("active")
    ) {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .parent()
        .removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .next(".sidebar-submenu")
        .slideDown(200);
      $(this)
        .parent()
        .addClass("active");
    }
  });

  $("#close-sidebar").click(function() {
    $(".page-wrapper").removeClass("toggled");
  });
  $("#show-sidebar").click(function() {
    $(".page-wrapper").addClass("toggled");
  });
      })
  }
}
</script>

<style scoped>
  @import '../../assets/css/side-style.css';
  @import '../../assets/css/side-custom.css';


  .sidebar-header{
    border:none !important;
  }

  .sidebar-menu{
    border:none !important;
  }


  .font-color{
    color:rgb(90, 90, 90);
  }


  #text-white{
    color:white !important;
  }
</style>
