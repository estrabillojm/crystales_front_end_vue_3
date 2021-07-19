<template>
  <div class="page-wrapper chiller-theme toggled" id="sidebar-xl">
  <a id="show-sidebar" class="btn btn-sm btn-dark" href="#">
    <i class="fas fa-bars"></i>
  </a>
  <nav id="sidebar" class="sidebar-wrapper">
    <div class="sidebar-content">
      <div class="sidebar-brand">
        <a href="#">
          <transition name="watermark" mode="out-in" appear>
              <img src="../../assets/logo_wt.png" alt="" class="side-logo">
          </transition>
          
        </a>
      </div>
      <div class="sidebar-header">
        <div class="user-pic">
          <img class="img-responsive img-rounded" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
            alt="User picture">
        </div>

        
        <div class="user-info">
          <span class="user-name"> {{ result.first_name }}
            <strong>{{ result.last_name }}</strong>
          </span>
          <span class="user-role">{{role}}</span>
          <span class="user-status">
            <i class="fa fa-circle"></i>
            <span>Online</span>
          </span>
        </div>
      </div>

      
        
      
      <!-- sidebar-header  -->
      
      <div class="sidebar-menu">
        <ul>
  
          <li class="sidebar-dropdown">
            <a href="#">
              <i class="material-icons">perm_identity</i>
              <span>Master Lists</span>
              
            </a>

            <div class="sidebar-submenu">
              <ul>
                <li>
                  <router-link :to="{ name: 'Users'}">User Accounts</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'Documents'}">Documents</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'AddCategory'}">Categories</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'Companies'}">Companies</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'Referrences'}">Referrences</router-link>

                </li>

                <li>
                  <router-link :to="{ name: 'Reasons'}">Reasons</router-link>
                  
                </li>

                <li>
                  <router-link :to="{ name: 'Banks'}">Banks</router-link>
                </li>

                <li>
                    <router-link :to="{ name: 'SupplierType'}">Supplier Type</router-link>
                </li>


                <li>
                    <router-link :to="{ name: 'Suppliers'}">Suppliers</router-link>
                </li>

                
                
                

                


                

                
              </ul>
            </div>
          </li>

          <li class="header-menu">
            <span>Management</span>
          </li>


          <li class="sidebar-dropdown">
            <a href="#">
              <i class="material-icons">description</i>
              <span>Document</span>
              
            </a>

            <div class="sidebar-submenu">
              <ul>
                <li>
                  <router-link :to="{ name: 'RequestTagging'}">Tagging of Request</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'IdentifyTransaction'}">Identify</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'DistributeTransaction'}">Distribute</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'ReceivedReceiptReport'}">Received Receipt Report</router-link>
                </li>


                
  
                

                <li>
                  <router-link :to="{ name: 'Tagging'}">Tagging of Documents</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'EditedTag'}">Approve Edited Tag</router-link>
                </li>


                <li>
                  <router-link :to="{ name: 'CounterReceipt'}">Counter Receipt</router-link>
                </li>
              </ul>
            </div>
          </li>
          <li class="sidebar-dropdown">
            <a href="#">
              <i class="material-icons">payments</i>
              <span>Cheque</span>
            
            </a>
            <div class="sidebar-submenu">
              <ul>
                <li>
                  <router-link :to="{ name: 'ReleasingOfCheque'}">Releasing of Cheque</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'CreationOfCheque'}">Creation of Cheque</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'ClearingOfCheque'}">Clearing of Cheque</router-link>
                </li>

                
             
              </ul>
            </div>
          </li>
          <li class="sidebar-dropdown">
            <a href="#">
              <i class="material-icons">summarize</i>
              <span>Reports</span>
            </a>
            <div class="sidebar-submenu">
              <ul>
                <li>
                  <router-link :to="{ name: 'TaggedReports'}">Tagged Reports</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'ChequeReports'}">Cheque Reports</router-link>
                </li>
            
              </ul>
            </div>
          </li>
          <li class="sidebar-dropdown">
            <a href="#">
              <i class="material-icons">reviews</i>
              <span>Voucher</span>
            </a>
            <div class="sidebar-submenu">
              <ul>

                <li>
                  <router-link :to="{ name: 'MatchingOfVoucher'}">Matching of Voucher</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'CreationOfVoucher'}">Creation of Voucher</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'CheckingOfVoucher'}">Checking of Voucher</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'ApprovingOfVoucher'}">Approving of Voucher</router-link>
                </li>

             
              </ul>
            </div>
          </li>



          <li class="sidebar-dropdown">
            <a href="#">
              <i class="material-icons">security</i>
              <span>Confidential</span>
            </a>
            <div class="sidebar-submenu">
              <ul>

                <li>
                  <router-link :to="{ name: 'TaggingAndVouchering'}">Tagging and Vouchering</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'Releasing'}">Releasing</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'Approval'}">Approval</router-link>
                </li>

                <li>
                  <router-link :to="{ name: 'ActivityLogs'}">Activity Logs</router-link>
                </li>

                
              </ul>
            </div>
          </li>




          <li class="sidebar-dropdown">
            <a href="#">
              <i class="material-icons">task</i>
              <span>Approval</span>
            </a>
            <div class="sidebar-submenu">
              <ul>
                <li>
                  <router-link :to="{ name: 'TransactionApproval'}">Transaction Approval</router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <!-- sidebar-menu  -->
    </div>
    <!-- sidebar-content  -->
    <div class="sidebar-footer">
      
      <a href="#" @click="logOut">
        <i class="fa fa-power-off"></i>
      </a>
    </div>
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
    this.checkCookie()
    if(!this.userId){
      this.$router.push('/')
    }
  },
  methods:{
    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      },
      checkCookie() {
        
          let role = this.getCookie("role");
          this.role = role

          let id = this.getCookie("id");
          this.userId = id
          
            axios.get(`/users/${this.userId}`).then(res=>{
              this.result = res.data
            })
      },
    logOut(){
      axios.post('/logout').then(res=>{
        console.log("Successfully Sign Out")
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



  /* .side-logo{
    animation: opac 3s infinite both linear;
}

@keyframes opac{
    0%{ opacity: .2; }
    20%{ opacity: .4; }
    40%{ opacity: .6; }
    60%{ opacity: .8; }
    80%{ opacity: .6; }
    100%{ opacity: .4; }

    
} */
</style>
