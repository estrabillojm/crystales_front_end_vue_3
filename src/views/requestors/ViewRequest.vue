<template>
  <div id="cr-grid">
    <div class="sidebar-container">
      <Sidebar/>
    </div>
    <div class="main-container">
      <Navbar/>
      <div class="my-box col-lg-10 col-md-12 row px-4 pt-2">
                  <div class="col-lg-12 p-1" v-if="documentType">
                    <div class="tr-grid" id="tr-header">
                      <div class="sub-flex bt-top bg-primary">
                        <p class="text-white pt-1 header-trans"><strong>Transaction</strong></p>
                      </div>
                    </div>

                    <div class="tr-grid">
                      <div class="sub-flex">
                        <div class="label-small">Transaction Number</div>
                        <p class="data-large">--</p>
                      </div>

                      <div class="sub-flex bt-top">
                        <div class="label-small">Document Type</div>
                        <p class="data-large">{{ documentTypeInfo }}</p>
                      </div>

                      <div class="sub-flex bt-top">
                        <div class="label-small">Payment Type</div>
                        <p class="data-large">{{ paymentType }}</p>
                      </div>

                      <div :class="{'sub-flex': true,' bt-top':true, 'last-flex':true, haveValue: !documentCategory}">
                        <div class="label-small" v-if="documentCategory">Category</div>
                        <p class="data-large" v-if="documentCategory">{{ categoryInfo }}</p>
                      </div>
                      <!-- SECOND -->
                      <div class="sub-flex" >
                        <div class="label-small">Company</div>
                        <p class="data-large">{{ companyInfo }}</p>
                      </div>

                      <div class="sub-flex last-flex">
                        <div class="label-small">Supplier</div>
                        <p class="data-large">{{ supplierInfo }}</p>
                      </div>


                      <!-- THIRD -->
                      <div :class="{'sub-flex':true, haveValue: !documentNumber}">
                        <div class="label-small" v-if="documentNumber">Document Number</div>
                        <p class="data-large" v-if="documentNumber">{{ documentNumber }}</p>
                      </div>

                      <div :class="{'sub-flex':true, haveValue: !documentDate}">
                        <div class="label-small" v-if="documentDate">Document Date</div>
                        <p class="data-large" v-if="documentDate">{{ documentDate }}</p>
                      </div>

                      <div :class="{'sub-flex':true, haveValue: !documentAmount}">
                        <div class="label-small" v-if="documentAmount">Document Amount</div>
                        <p class="data-large" v-if="documentAmount">{{ documentAmount }}</p>
                      </div>

                      <div class="sub-flex last-flex">
                        <div class="label-small">Remarks</div>
                        <p class="data-large">
                          <span v-if="documentRemarks">
                          {{ documentRemarks }}
                          </span>
                          <span v-else>
                            No Remarks
                          </span>
                        </p>
                      </div>







                      <div :class="{'sub-flex':true, haveValue: !dateFrom}">
                        <div class="label-small" v-if="dateFrom">From</div>
                        <p class="data-large" v-if="dateFrom">{{ dateFrom }}</p>
                      </div>

                      <div :class="{'sub-flex':true, haveValue: !dateTo}">
                        <div class="label-small" v-if="dateTo">To</div>
                        <p class="data-large" v-if="dateTo">{{ dateTo }}</p>
                      </div>

                      <div :class="{'sub-flex':true, haveValue: !pcfDate}">
                        <div class="label-small" v-if="pcfDate">PCF Date</div>
                        <p class="data-large" v-if="pcfDate">{{ pcfDateConvert }}</p>
                      </div>

                      <div :class="{'sub-flex':true,'last-flex':true, haveValue: !pcfLetter}">
                        <div class="label-small" v-if="pcfLetter">Letter</div>
                        <p class="data-large" v-if="pcfLetter">
                          {{ pcfLetter }}
                        </p>
                      </div>




                      <div class="sub-flex">
                        <span v-if="po_group.length" :class="{'sub-flex': !po_group.length}">
                          <div class="label-small">Purchase Order Information</div>
                          <p class="data-large"> <strong>Total PO Quantity: </strong>{{ totalQty }}</p><br>
                          <p class="data-large"> <strong>Total PO Amount: </strong>{{ totalAmount }}</p><br>
                          <p class="data-large"> <strong>Total PO Batch: </strong>{{ po_group.length }}</p><br>
                        </span>
                        <span v-else class="text-center py-5">
                          <p class="data-large">
                            No Purchase Order included
                          </p>
                        </span>
                      </div>

                      <div class="sub-flex last-flex">
                        <span v-if="documentType != 7 && refList.length">
                          <div class="label-small">Reference Information</div>
                          <p class="data-large"> <strong>Total Reference Quantity: </strong>{{ totalRefQuantity }}</p><br>
                          <p class="data-large"> <strong>Total Reference Amount: </strong>{{ totalRefAmount }}</p><br>
                          <p class="data-large"> <strong>Total Reference Batch: </strong>{{ refList.length }}</p>
                        </span>
                        <span v-else class="text-center py-5">
                          <p class="data-large">
                            No Reference included
                          </p>
                        </span>
                      </div>

                      
                      
                    </div>

                    <div class="balance-grid">
                      <div class="right-flex">
                        <p><strong>Total Document Amount:</strong></p>
                        <p><strong>Total PO Amount:</strong></p>
                        <p><strong>Total Reference Amount:</strong></p>
                        <!-- <p v-if="documentAmount<totalAmount"><strong>Total Document Amount:</strong></p> -->
                        <div></div>
                        <span v-if="totalAmount != 0 || totalRefAmount != 0">
                          <p class="text-success" v-if="totalBalanceOne==0"><strong>Remaining Balance:</strong></p>
                          <p class="text-danger" v-else><strong>Remaining Balance:</strong></p>
                        </span>
                      </div>

                      <div class="left-flex">
                        <p><strong v-if="documentAmount != null">{{ documentAmount }}</strong><strong v-else>--</strong></p>
                        <p class="last-amount"><strong v-if="totalAmount != 0">{{ totalAmount }}</strong><strong v-else>--</strong></p>
                        <p class="last-amount"><strong v-if="totalRefAmount != 0">{{ totalRefAmount }}</strong> <strong v-else>--</strong></p>
                        
                        <div class="underlined" v-if="totalAmount != 0 || totalRefAmount != 0"></div>
                        <span v-if="totalAmount != 0 || totalRefAmount != 0">
                          <p class="last-amount text-success" v-if="totalBalanceOne==0"><strong>{{totalBalanceOne}}</strong></p>
                          <p class="last-amount text-danger" v-else><strong>{{totalBalanceOne}}</strong></p>
                        </span>
                      </div>
                    </div>

                    <hr>
                   <div class="row">
                        <div class="col-lg-4 mb-3">
                          <div class="form-group" v-if="reason">
                            <label for="">Reason</label>
                            <input type="text" class="form-control disable" disabled :value="reason">
                          </div>
                        </div>
                        <div class="col-lg-4 mb-3">
                          <div class="form-group" v-if="reasonRemarks">
                            <label for="">Remarks</label>
                            <textarea class="form-control disable" rows="3" v-model="reasonRemarks" disabled required></textarea>
                          </div>
                        </div>
                        <div class="col-lg-4 mb-3">
                          <label for="">Description</label>
                          <textarea class="form-control disable" disabled rows="3" v-model="description" required></textarea>
                        </div>
                      </div>
                    
                      <div class="col-lg-12">
                        <div class="row btn-action">
                          <router-link :to="{name: 'RequestTagging'}">
                            <button type="button">Back</button>
                          </router-link>
                        </div>  
                        
                      </div>

                  </div>
                </div>


      

      
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

export default {
    components: { Sidebar, Navbar, DataTable, Modal, Loading},
    data(){
      return {
        query: '',
        myRequest: null,

        documentType: 7,
        documentTypeInfo:null,
        paymentType: null,
        documentCategory: null,
        categoryInfo:null,
        companyInfo:null,
        supplierInfo:null,
        documentNumber: null,
        documentDate: null,
        documentAmount:null,
        documentRemarks: null,
        dateFrom: null,
        dateTo: null,
        pcfDateConvert: null,
        pcfLetter:null,
        po_group:[],
        totalQty: null,
        totalAmount: null,
        refList: null,
        totalRefQuantity: null,
        totalRefAmount: null,
        totalBalanceOne:0,

        reasonRemarks: null,
        reason:null,
        description: null,


      }
    },
    created(){
       this.fetchMyRequest()

    },
    computed:{
        
        
    },
    methods:{
      fetchMyRequest(){
        let id = this.$route.params.id
        axios.get(`transactions/${id}`).then(res=>{
          let holder = res.data
          this.documentType = holder.document_id
          this.documentTypeInfo = holder.document_type
          this.paymentType = holder.payment_type
          this.documentCategory = holder.category_id
          this.categoryInfo = holder.category
          this.companyInfo = holder.company
          this.supplierInfo = holder.supplier
          this.documentNumber = holder.document_no
          this.documentDate = "mISSING"
          this.documentAmount = holder.document_amount
          this.documentRemarks = holder.remarks
          this.dateFrom = holder.date_from
          this.dateTo = holder.date_to
          this.pcfDateConvert = holder.pcf_date
          this.pcfLetter = holder.pcf_letter
          this.po_group = holder.po_group
          this.totalQty = holder.po_total_qty
          this.totalAmount = holder.po_total_amount
          this.refList = holder.referrence_group
          this.totalRefQuantity = holder.referrence_total_qty
          this.totalRefAmount = holder.referrence_total_amount
          this.totalBalanceOne = holder.total_balance,
          this.reason = holder.reason
          this.reasonRemarks = holder.reason_remarks
          this.description = holder.description
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

  

  .btn-action button{
    padding:3px 12px;
    margin-left:3px;

    border-radius:5px;
    border:none;
    cursor:pointer;
  }

  .btn-action{
    display:flex;
    justify-content:flex-end;
  }

  .flex-grid{
    display:grid;
  }


  .btn-icon{
    cursor: pointer;
  }

  .requestors-request td{
    text-transform:uppercase;
  }

  .haveValue{
  background:rgb(228, 228, 228) !important;
}
.dateError{
  color:red;
  background:rgb(255, 191, 191);
  font-weight:bold;
}

.date-error{
  font-weight:bolder;
  font-size:15px;
}

.right-flex, .left-flex{
  display:flex;
  flex-flow:column;
  padding:10px 5px;
}
.right-flex{
  text-align:right;
   grid-column:4/6;
}

.balance-grid p{
  font-size:15px;
}

.balance-grid{
  display:grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows:minmax(40px, auto);
}

.balance-grid div.underlined{
  border-bottom:1px solid #ccc;
}

.data-large strong{
  font-size:13px;
}
  
/* FIRST GRID */
  .tr-grid{
    display:grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows:minmax(40px, auto);
  }

  .tr-grid .sub-flex{
    border:1px solid rgb(173,173,173);
    border-right:none;
    border-top:none;
    box-sizing:border-box;
    background:rgb(255, 255, 255);
    padding:3px 10px;
    box-sizing:border-box;
  }


  .sub-flex{
    display:flex;
    flex-flow:column;
  }

  .sub-flex *{
    margin:0;
  }

  .tr-grid :nth-child(5){
    grid-column:1/3;
  }

  .tr-grid :nth-child(6){
    grid-column:3/5;
  }

  .tr-grid :nth-child(15){
    grid-column:1/3;
    border-radius:0 0 0 7px;
  }

  .tr-grid :nth-child(16){
    grid-column:3/5;
    border-radius:0 0 7px 0;
  }

  #tr-header .header-trans{
    font-size:17px;
  }

  #tr-header{
    grid-column:1/5;
    border:1px solid rgb(173, 173, 173);
    display:grid;
    grid-template-columns:1fr;
    border-radius:8px 8px 0 0;
    overflow:hidden;
  }

  #tr-header div{
    border:none;

  }

  .last-flex{
    border-right:1px solid rgb(173, 173, 173) !important;
  }



  .label-small{
    font-size:15px;
    font-weight:bold;
  }

  .data-large{
    font-size:17px;
    padding-left:5px;
  }


</style>