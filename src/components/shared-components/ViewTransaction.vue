<template>
  <div class="my-box col-lg-10 col-md-12 row px-4 pt-2">
    
              <div class="col-lg-12 p-1">
                <div class="tr-grid" id="tr-header">
                  <div class="sub-flex bt-top bg-primary">
                    <p class="text-white pt-1 header-trans"><strong>Transaction</strong></p>
                  </div>
                </div>

                <div class="tr-grid">
                  <div class="sub-flex">
                    <div class="label-small">Transaction Number</div>
                    <p class="data-large"></p>
                  </div>

                  <div class="sub-flex bt-top">
                    <div class="label-small">Document Type</div>
                    <p class="data-large"></p>
                  </div>

                  <div class="sub-flex bt-top">
                    <div class="label-small">Payment Type</div>
                    <p class="data-large"></p>
                  </div>

                  <div :class="{'sub-flex': true,' bt-top':true, 'last-flex':true}">
                    <div class="label-small">Category</div>
                    <p class="data-large"></p>
                  </div>
                  <!-- SECOND -->
                  <div class="sub-flex" >
                    <div class="label-small">Company</div>
                    <p class="data-large"></p>
                  </div>

                  <div class="sub-flex last-flex">
                    <div class="label-small">Supplier</div>
                    <p class="data-large"></p>
                  </div>


                  <!-- THIRD -->
                  <div :class="{'sub-flex':true}">
                    <div class="label-small">Document Number</div>
                    <p class="data-large"></p>
                  </div>

                  <div :class="{'sub-flex':true}">
                    <div class="label-small">Document Date</div>
                    <p class="data-large"></p>
                  </div>

                  <div :class="{'sub-flex':true}">
                    <div class="label-small">Document Amount</div>
                    <p class="data-large"></p>
                  </div>

                  <div class="sub-flex last-flex">
                    <div class="label-small">Remarks</div>
                    <p class="data-large">
                      <span>
                     
                      </span>
                      <span>
                        No Remarks
                      </span>
                    </p>
                  </div>

                  <div :class="{'sub-flex':true}">
                    <div class="label-small">From</div>
                    <p class="data-large"></p>
                  </div>

                  <div :class="{'sub-flex':true}">
                    <div class="label-small">To</div>
                    <p class="data-large"></p>
                  </div>

                  <div :class="{'sub-flex':true}">
                    <div class="label-small">PCF Date</div>
                    <p class="data-large"></p>
                  </div>

                  <div :class="{'sub-flex': true, 'last-flex': true}">
                    <div class="label-small">Letter</div>
                    <p class="data-large" >
                     
                    </p>
                  </div>




                  <div class="sub-flex">
                    <span :class="{'sub-flex': false}">
                      <div class="label-small">Purchase Order Information</div>
                      <p class="data-large"> <strong>Total PO Quantity: </strong></p><br>
                      <p class="data-large"> <strong>Total PO Amount: </strong></p><br>
                      <p class="data-large"> <strong>Total PO Batch: </strong></p><br>
                    </span>
                    <span class="text-center py-5">
                      <p class="data-large">
                        No Purchase Order included
                      </p>
                    </span>
                  </div>

                  <div class="sub-flex last-flex">
                    <span>
                      <div class="label-small">Reference Information</div>
                      <p class="data-large"> <strong>Total Reference Quantity: </strong></p><br>
                      <p class="data-large"> <strong>Total Reference Amount: </strong></p><br>
                      <p class="data-large"> <strong>Total Reference Batch: </strong></p>
                    </span>
                    <span class="text-center py-5">
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
                    <span>
                      <!-- <p class="text-success"><strong>Remaining Balance:</strong></p> -->
                      <p class="text-danger"><strong>Remaining Balance:</strong></p>
                    </span>
                  </div>

                  <div class="left-flex">
                    <p><strong></strong><strong>--</strong></p>
                    <p class="last-amount"><strong></strong><strong>--</strong></p>
                    <p class="last-amount"><strong></strong> <strong>--</strong></p>
                    
                    <div class="underlined"></div>
                    <span>
                      <p class="last-amount text-success"><strong></strong></p>
                      <p class="last-amount text-danger"><strong></strong></p>
                    </span>
                  </div>
                </div>

                <hr>
                
                  <div class="row">
                    <div class="col-lg-4 mb-3">
                      <div class="form-group">
                        <label for="">Reasonsssss</label>
                        <input type="text" class="form-control disable">
                      </div>
                    </div>
                    <div class="col-lg-4 mb-3">
                      <div class="form-group">
                        <label for="">Remarks</label>
                        <textarea class="form-control disable" rows="3"></textarea>
                      </div>
                    </div>
                    <div class="col-lg-4 mb-3">
                      <label for="">Description</label>
                      <textarea :class="{'form-control': true }" rows="3"></textarea>
                    </div>
                  </div>
                
                  <!-- <div class="col-lg-12">
                    <div class="row btn-action">

                      <button type="button" class="btn-success" :hidden="!description ? true : false" v-if="status != 'hold by AP tagging' && status != 'tagged by AP tagging' && status != 'rejected by AP tagging' && status != 'adjusted by AP tagging (for approval)'" @click="actionSubmit('tagged by AP tagging', 'tag', transactionId, 'success')">Tag</button>

                      <button type="button" class="btn-success"  v-if="status != 'hold by AP tagging' && status == 'tagged by AP tagging' && status != 'rejected by AP tagging' && status != 'adjusted by AP tagging (for approval)'" @click="actionSubmit('adjusted by AP tagging (for approval)', 'update tag', transactionId, 'success')" :hidden="description.toLowerCase() != holderDescription.toLowerCase() && description ? false: true">Update Tag</button>
                      
                      <button type="button" class="btn-success" v-if="status == 'hold by AP tagging'" @click="actionSubmit('received', 'unhold', transactionId, 'success')">Unhold</button>
                      
                      <button type="button" class="btn-warning" :hidden="!description ? true : false" v-if="status != 'hold by AP tagging' && status != 'tagged by AP tagging' && status != 'rejected by AP tagging' && status != 'adjusted by AP tagging (for approval)'" data-toggle="modal" data-target="#exampleModalCenter" @click="setNumber(1)" >Hold</button>

                      <button type="button" class="btn-danger" :hidden="!description ? true : false"  v-if="status != 'hold by AP tagging' && status != 'tagged by AP tagging' && status != 'rejected by AP tagging' && status != 'adjusted by AP tagging (for approval)'" data-toggle="modal" data-target="#exampleModalCenter" @click="setNumber(2)">Reject</button>
                      
                      
                      <router-link :to="{name: 'Tagging'}">
                        <button type="button">Back</button>
                      </router-link>
                    </div>  
                  </div> -->
                  <div class="col-lg-12">
                    <div class="row btn-action">  
                      <button type="button" @click="backRoute()">Back</button>
                    </div>
                  </div>
              </div>
            </div>

          <!-- <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">{{ transactionId }}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="activeFalse()">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <label>Reason</label>
                  <select class="form-control" v-model="reasonId">
                    <option v-for="(reason, index) in reasons" :key="index" :value="reason.id">{{ reason.reason.toUpperCase() }}</option>
                  </select>

                  <label>Remarks</label>
                  <textarea rows="4" class="form-control" v-model="reasonRemarks"></textarea>


                </div>
                <div class="modal-footer">
        
                  <button type="button" v-if="modalValue==1 && reasonId && reasonRemarks.length > 3"  class="btn btn-warning" @click="submitReject('hold by AP tagging', 'hold', transactionId, 'warning')">Hold</button>
                  <button type="button" v-else-if="modalValue==1" class="btn btn-warning text-black" disabled>Hold</button>
                  <button type="button" v-if="modalValue==2 && reasonId && reasonRemarks.length > 3"  class="btn btn-danger" @click="submitReject('rejected by AP tagging', 'reject', transactionId, 'warning')">Reject</button>
                  <button type="button" v-else-if="modalValue==2"  class="btn btn-danger text-black" disabled>Reject</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="activeFalse()">Cancel</button>
                </div>

              </div>
            </div>
  </div> -->

</template>

<script>
import Modal from '../../components/shared-components/Modal'
import Loading from '../../components/shared-components/Loading'
import {mapState} from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    components: {Modal, Loading},
    data(){
      return {
       
      }
    },
    computed:{
      
    },
    created(){

    },
    methods:{
      backRoute(){
        this.$router.go(-1)
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