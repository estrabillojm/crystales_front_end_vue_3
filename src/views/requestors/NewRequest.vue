<template>
  <div id="cr-grid">
    <div class="sidebar-container">
      <Sidebar/>
    </div>
    <div class="main-container">
    <Navbar/>

        <div class="loader-container" v-if="!isDone">
            <Loading class="loader"/>
        </div>
        <form @submit.prevent.self="formSubmit()" autocomplete="off">
        <div class="grid-header">
            <div class="row pt-2 pl-4 pr-4"> 
                <div class="col-lg-4 p-1" v-if="shiftBox != 4">
                  <div class="col-lg-12 px-5 my-card">
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label for="">Select Document Type</label>
                              <select class="form-control"  v-model="documentType" @change="changeDocumentType()">
                                <option value="">Select Document Type</option>
                                <option v-for="document in documents" :key="document.document_id" :data-id="document.id" :value="document.document_id" @change="alertMe()">{{document.document_type.toUpperCase()}}</option>
                              </select>
                            </div>
                          </div>
                        </div>

                      <div>
                     
                      <div class="row">
                        <div class="col-lg-12" v-if="documentType == 7 || documentType == 2 || documentType == 4 || documentType == 5 || documentType == 9 || documentType == 6 || documentType == 8">
                          <div class="form-group">
                            <label for="">Payment Type</label>
                            <select class="form-control" v-model="paymentType">
                              <option value="">Select Payment Type</option>
                              <option v-if="documentType != 4" value="full">FULL</option>
                              <option value="partial" v-if="documentType != 7">PARTIAL</option>
                            </select>
                          </div>
                        </div>
                      </div>

                        <div class="row">

                          <div class="col-lg-12" v-if="documentType == 2 || documentType == 4 || documentType == 5">
                            <div class="form-group">
                              <label for="">Category</label>
                              <select class="form-control" v-model="documentCategory">
                                <option value="">Select Category</option>
                                <option v-for="category in cat" :key="category.index" :value="category.id">{{category.name}}</option>
                              </select>
                            </div>
                          </div>

                          </div>



                        <div class="row">
                          <div class="col-lg-12" v-if="documentType == 9 || documentType == 6">
                            <div class="form-group">
                              <label for="">From</label>
                              <input type="date" class="form-control" v-model="dateFrom">
                            </div>
                          </div>


                          <div class="col-lg-12" v-if="documentType == 9 || documentType == 6">
                            <div class="form-group">
                              <label for="">To</label>
                              <input type="date" class="form-control" v-model="dateTo">
                            </div>
                          </div>

                          <div class="col-lg-12" v-if="documentType == 7 || documentType == 2  || documentType == 4 || documentType == 5 || documentType == 9 || documentType == 6 || documentType == 8">
                            <div class="form-group">
                              <label for="">Company</label>
                              <select class="form-control" v-model="documentCompany">
                                <option>Select Company</option>
                                <option v-for="company in companies" :key="company.id" :value="company.id">{{ company.company_code}} - {{ company.company_description.toUpperCase() }}</option>
                              </select>
                            </div>
                          </div>

                        </div>




                        <div class="row">
                          <div class="col-lg-12" v-if="documentType == 7 || documentType == 2 || documentType == 4 || documentType == 5">
                            <div class="form-group">
                              <label for="" v-if="documentType!=4">Document Number</label>
                              <label for="" v-else>CIP Number</label>
                              <input type="text" class="form-control" v-model="documentNumber">
                            </div>
                          </div>
                          
                          <div class="col-lg-12" v-if="documentType == 7 || documentType == 2 || documentType == 4 || documentType == 5 || documentType == 9 || documentType == 6 || documentType == 8">
                            <div class="form-group">
                              <label for="">Supplier</label>
                              <select class="form-control" v-model="documentSupplier">
                                <option>Select Supplier</option>
                                <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">{{ supplier.supplier_name.toUpperCase() }}</option>
                              </select>
                            </div>
                          </div>

                        </div>


                        <div class="row">

                          <div class="col-lg-12" v-if="documentType == 7 || documentType == 2 || documentType == 4 || documentType == 5 || documentType == 8">
                            <div class="form-group">
                              <label for="">Document Date</label>
                              <input type="date" class="form-control" v-model="documentDate">
                            </div>
                          </div>

                          <div class="col-lg-12" v-if="documentType == 7 || documentType == 2 || documentType == 4 || documentType == 5 || documentType == 9 || documentType == 6 || documentType == 8">
                            <div class="form-group">
                              <label for="" v-if="documentType!=4">Document Amount</label>
                              <label for="" v-else>CIP Amount</label>
                              <input type="text" class="form-control" v-model="documentAmount" @keyup="addCommaDocAmount">
                            </div>
                          </div>
                          
                          <div class="col-lg-12" v-if="documentType == 7 || documentType == 2 || documentType == 4 || documentType == 9 || documentType == 6 || documentType == 8">
                            <div class="form-group">
                              <label for="">Remarks <em>(Optional)</em></label>
                              <textarea rows="2" class="form-control" v-model="documentRemarks"></textarea>
                            </div>
                          </div>
                        </div>


                        <div class="row">
                          <div class="col-lg-5">
                            <div class="form-group">
                              <!-- <button class="btn btn-success" v-if="documentValidation" @click="showBalance(4)">Proceed</button> -->
                              <button class="btn btn-success" @click="showBalance(4)">Proceed</button>
                              <!-- <button class="btn btn-success disable text-black" disabled>Proceed</button> -->
                              <!-- <button class="btn btn-success disable text-black" disabled v-else>Proceed</button> -->
                            </div>
                          </div>


                          <div class="col-lg-5">
                            <div class="form-group">
                              <router-link :to="{ name: 'RequestTagging'}">
                                <button class="btn">Back</button>
                              </router-link>
                            </div>
                          </div>
                        </div>
                  </div>

                  </div>
                </div>

                <div class="my-box col-lg-8 row" v-if="shiftBox == 0 && emptyFieldValidation" >
                <div class="col-lg-6 p-1" v-if="documentType == 7 || documentType == 8  || documentType == 2  || documentType == 4 || documentType == 5">
                  <div class="col-lg-12 px-5 my-card">


                    <div class="row" v-if="documentType == 8">

            
                          
                          <div class="col-lg-6 p-1">
                            <div class="form-group">
                              <label for="">Date</label>
                              <input type="date" class="form-control">
                            </div>
                          </div>

                          <div class="col-lg-6 p-1">
                            <div class="form-group">
                              <label for="">Letter</label>
                              <select class="form-control">
                                <option v-for="(letter, index) in letters" :key="index">{{ letter.toUpperCase() }}</option>
                              </select>
                            
                            </div>
                          </div>
                        
                        </div>
                      
                      
                        <div class="row" v-if="documentType == 7 || documentType == 2 || documentType == 4 || documentType == 5">
                          

                          <div class="col-lg-4 offset-lg-8 p-0">
                            <div class="form-group">
                              <button type="button" class="btn btn-block btn-primary" data-toggle="modal" data-target=".bd-example-modal-xl" @click="changeBox(1)">Add P.O</button>
                            </div>
                          </div>
                          <div class="col-lg-12 my-card-2 m-0" v-if="po_group.length == 0">
                            <div class="col-lg-12 flex-details p-0">
                              <div class="center-batch text-center">
                                  <p class="text-sm">No PO Batch Added</p>
                              </div>
                            </div>
                          </div>

                          <div class="col-lg-12 alert alert-info m-0 mb-2" v-if="po_group.length != 0">
                            <div class="col-lg-12 flex-details p-0">
                              <div class="center-batch">
                                  <p class="text-sm" v-if="documentType != 7"><strong>Total Qty: </strong><em> {{ totalQty }}</em></p><br v-if="documentType != 7">
                                  <p class="text-sm"><strong>Total Amount: </strong><em>

                                    <span v-if="totalAmount">
                                      {{ totalAmount }}
                                    </span>
                                    <span v-else>
                                      --
                                    </span>
                                     </em></p><br>
                                  <!-- <p class="text-sm"><strong>Total Unit Price: </strong><em>
                                      <span v-if="totalUnitPrice">
                                        {{ totalUnitPrice }}
                                      </span>
                                      <span v-else>
                                        --
                                      </span>
                                    </em></p><br> -->
                                  <p class="text-sm"><strong>Total Batch: </strong><em>{{ po_group.length }}</em></p>
                              </div>
                            </div>
                          </div>

                          <div class="col-lg-12 my-card-2 m-0" v-for="(po, index) in po_group" :key="index">
                            <div class="col-lg-12 flex-details p-0">
                              <div>
                                <p><strong>PO Number: </strong><em>{{ po.po_no }}</em></p><br>
                                <p class="text-sm"><strong>PO Quantity: </strong><em>{{ po.po_qty }}</em></p><br>
                                <p class="text-sm"><strong>PO Amount: </strong><em v-if="po.po_amount">{{ po.po_amount }}</em><span v-else>--</span></p><br>
                                <!-- <p class="text-sm"><strong>Unit Price: </strong><em v-if="po.unit_price">{{ po.unit_price }}</em><span v-else>--</span></p><br> -->
                                <p class="text-sm"><strong>RR: </strong><em>{{ po.rr_group.length }}</em></p><br>
                              </div>
                              <div class="btn-flex-po">
                                <span class="material-icons text-primary" title="edit" @click="editPO(index)">edit</span>
                                <span class="material-icons text-danger" title="remove" @click="deletePO(index)">delete</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-12">
                            <ul>
                              
                            </ul>
                          </div>
                        </div>



                  </div>
                </div>

                

                <!-- ADD REF -->
                <div class="col-lg-6 p-1" v-if="(documentType == 2 || documentType == 4 || documentType == 5)">
                  <div class="col-lg-12 px-5 pb-5 my-card">
                      <!-- <div class="absolute-div" v-if="documentType == 7"><em>Optional</em></div> -->
                
                      
                        <div class="row">
                          <!-- <div class="col-lg-4 offset-lg-8 p-0">
                            <div class="form-group">
                              <button type="button" class="btn btn-block btn-primary" @click="showBalance(4)">Show Balance</button>
                            </div>
                          </div> -->
                          <div class="col-lg-4 px-1">
                            <div class="form-group">
                              <label for="">Type</label>
                              <select class="form-control" v-model="supplierType" id="refType" @change="changeSupplierType()">
                                <option value=""></option>
                                <option v-for="(ref, index) in references" :key="index" :value="ref.referrence_type.toLowerCase()">{{ ref.referrence_type.toUpperCase() }}</option>
                              </select>
                            
                            </div>
                          </div>

                          <div class="col-lg-8 px-1">
                            <div class="form-group">
                              <label for="">REF #</label>
                              <input type="text" class="form-control" id="refNumber" v-model="refNumber" @keydown.enter.prevent="preventSubmit()" @keyup.enter="submitRef()">
                            </div>
                          </div>
                          <div class="col-lg-12 px-1 mt-0" v-if="supplierType=='si'">
                            <div class="form-group">
                                <label for="">Amount</label>
                                <input type="text" class="form-control" id="refAmount" v-model="refAmount" @keydown.enter.prevent="preventSubmit()"  @keyup="addCommaRefAmount()" @keyup.enter="submitRef()">
                            </div>
                          </div>
                          
                          <div class="col-lg-4 px-1 mt-0" v-if="supplierType=='dr'">
                            <div class="form-group">
                                <label for="">Quantity</label>
                                <input type="text" class="form-control" id="refQty" v-model="refQty" @keydown.enter.prevent="preventSubmit()" @keyup.enter="submitRef()" @keyup="addCommaRefQty()">
                            </div>
                          </div>
                          <div class="col-lg-8 px-1 mt-0" v-if="supplierType=='dr'">
                            <div class="form-group">
                                <label for="">Unit Price</label>
                                <input type="text" class="form-control" id="refQty" v-model="refQty" @keydown.enter.prevent="preventSubmit()" @keyup.enter="submitRef()" @keyup="addCommaRefQty()">
                            </div>
                          </div>
                          

                          <div class="col-lg-12 alert alert-info m-0 mb-2" v-if="refList.length != 0">
                            <div class="col-lg-12 flex-details p-0">
                              <div class="center-batch">
                                  
                                  <p class="text-sm"><strong>Total Amount: </strong><em>
                                      <span v-if="totalRefAmount">
                                        {{ totalRefAmount }}
                                      </span>
                                      <span v-else>
                                        --
                                      </span>
                                    </em></p><br>
                                    <p class="text-sm"><strong>Total Qty: </strong><em>
                                      <span v-if="totalRefQuantity">
                                        {{ totalRefQuantity }}
                                      </span>
                                      <span v-else>
                                        --
                                      </span>
                                    </em></p><br>
                                  <p class="text-sm"><strong>Total Reference: </strong><em>{{ refList.length }}</em></p>
                              </div>
                            </div>
                          </div>


                          <div class="col-lg-12 my-card-2" v-for="(ref, index) in refList" :key="index">
                            <div class="col-lg-12 flex-details p-0">
                              <div>
                                <p class="text-sm"><strong>REF NUMBER: </strong><em>{{ ref.referrence_type }}-{{ ref.referrence_no }}</em></p><br>
                                <p class="text-sm"><strong>REF AMOUNT: </strong><em v-if="ref.referrence_amount">{{ ref.referrence_amount }}</em><span v-else>--</span></p><br>
                                <p class="text-sm"><strong>REF QUANTITY: </strong><em v-if="ref.referrence_qty">{{ ref.referrence_qty }}</em><span v-else>--</span></p><br>
                              </div>
                              <div class="btn-flex-po">
                                <span class="material-icons text-danger" title="remove reference" @click="removeRef(index)">delete</span>
                              </div>
                            </div>

                          </div>

                        </div>
                  </div>
                </div>

                <!-- ADD REF END -->
                </div>


                <div class="my-box col-lg-8 row" v-else-if="shiftBox == 1">
                  <div class="col-lg-12 p-1" v-if="documentType == 7 || documentType == 8  || documentType == 2  || documentType == 4 || documentType == 5">
                    <div class="col-lg-12 px-5 my-card">

                      <div class="row">
                        <div class="col-lg-12 p-1">
                          <div class="alert alert-danger hidden" id="alert-error" role="alert">
                            <p class="text-danger">{{ error }}</p> 
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-lg-2 p-1">
                          <label for="#">PO #</label>
                          <input type="number" class="form-control" id="poNumber" v-model="poNumber" @keydown.enter.prevent="preventSubmit()" @keyup.enter="moveFocus(1)">
                        </div>

                        <div class="col-lg-2 p-1" v-if="documentType != 7">
                          <label for="#">PO Quantity</label>
                          <input type="text" class="form-control" id="poQuantity" @keyup="addCommaQty()" v-model="poQuantity" @keydown.enter.prevent="preventSubmit()" @keyup.enter="moveFocus(2)">
                        </div>

                        <div class="col-lg-3 p-1" v-if="supplierType != 'dr'">
                          <span>
                            <label for="#">PO Amount</label>
                            <input type="text" class="form-control" id="poAmount"  v-model="poAmount" @keyup="addComma()" @keydown.enter.prevent="preventSubmit()" @keyup.enter="moveFocus(3)">
                          </span>
                          <!-- <span v-else-if="supplierType == 'dr'">
                            <label for="#">Unit Price</label>
                            <input type="text" class="form-control" id="unitPrice" @keyup="addCommaPrice()" v-model="unitPrice" @keydown.enter.prevent="preventSubmit()" @keyup.enter="moveFocus(3)">
                          </span> -->
                        </div>
                        <div class="col-lg-2 p-1" v-if="documentType != 7">
                          <label for="#">RR #</label>
                          <input type="number" class="form-control" v-model="receiptNumber" id="receiptNumber" @keydown.enter.prevent="submitRR()">
                        </div>
                        <div class="col-lg-2 p-1" v-if="documentType != 7">
                          <label for="#">RR Quantity</label>
                          <input type="number" class="form-control" id="rrQuantity" v-model="rrQuantity" @keydown.enter.prevent="submitRR()">
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-2 p-1">
                          <button type="button" class="btn btn-block btn-success" v-if="!editMode" @click="saveBatch()">Save</button>
                          <button type="button" class="btn btn-block btn-success" v-if="editMode" @click="updateBatch()">Update Batch</button>
                        </div>
                        <div class="col-lg-1 p-1">
                          <button type="button" class="btn btn-default" @click="changeBox(0)">Close</button>
                        </div>
                      </div>

                      <span>
                      <div class="row" v-if="receipts.length>0">
                        <div class="col-lg-12 p-1 mt-2 bg-primary header-receipt">
                          <p class="text-white">
                            Received Receipt Number/s
                          </p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="grid-column mt-1">
                          <div v-for="(receipt, index) in receipts" :key="index" class="box-rr px-2 ">
                            <div class="flex-col">
                              <p class="m-0 p-0 rr_header">
                                <strong>{{ receipt.rr_no }}</strong>
                              </p>
                              <p class="m-0 p-0 text-sm rr_qty">
                                <strong>Qty:</strong> <em>{{ receipt.rr_qty }}</em>
                              </p>
                            </div>
                            
                            <div class="flex-btn-icon">
                              <span class="material-icons text-danger" @click="deleteRR(receipt, index)">
                                highlight_off
                              </span>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                      </span>
                    </div>

                  
                    
                  </div>
                </div>


                <!-- EDIT PO BATCH HERE  -->
                <div class="my-box col-lg-8 row" v-else-if="shiftBox == 3">
                
                  <div class="col-lg-12 p-1" v-if="documentType == 7 || documentType == 8  || documentType == 2  || documentType == 4 || documentType == 5">
                      
                    <div class="col-lg-12 px-5 my-card">
                      <div class="row">
                        <div class="col-lg-12 p-1">
                          <div class="alert alert-danger hidden" id="alert-error" role="alert">
                            <p class="text-danger">{{ error }}</p> 
                          </div>
                        </div>
                      </div>

                      
                      
                      <div class="row">
                        <div class="col-lg-2 p-1">
                          <label for="#">PO #</label>
                          <input type="number" class="form-control" id="poNumber" v-model="poNumber" @keydown.enter.prevent="preventSubmit()" @keyup.enter="moveFocus(1)">
                        </div>

                        <div class="col-lg-2 p-1">
                          <label for="#">PO Quantity</label>
                          <input type="text" class="form-control" id="poQuantity" @keyup="addCommaQty()" v-model="poQuantity" @keydown.enter.prevent="preventSubmit()" @keyup.enter="moveFocus(2)">
                        </div>

                        <div class="col-lg-3 p-1" v-if="poAmount != null">
                          <span>
                            <label for="#">PO Amount</label>
                            <input type="text" class="form-control" id="poAmount" v-model="poAmount" @keyup="addComma()" @keydown.enter.prevent="preventSubmit()" @keyup.enter="moveFocus(3)">
                          </span>
<!-- 
                          <span v-else-if="unitPrice != null">
                            <label for="#">Unit Price</label>
                            <input type="text" class="form-control" id="unitPrice" @keyup="addCommaPrice()" v-model="unitPrice" @keydown.enter.prevent="preventSubmit()" @keyup.enter="moveFocus(3)">
                          </span> -->
                        </div>
                        <div class="col-lg-2 p-1">
                          <label for="#">RR #</label>
                          <input type="number" class="form-control" v-model="receiptNumber" id="receiptNumber" @keydown.enter.prevent="submitRRUpdate()">
                        </div>
                        <div class="col-lg-2 p-1">
                          <label for="#">RR Quantity</label>
                          <input type="number" class="form-control" id="rrQuantity" v-model="rrQuantity" @keydown.enter.prevent="submitRRUpdate()">
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-2 p-1">
                          <button type="button" class="btn btn-block btn-success" @click="updateBatch()">Update</button>
                        </div>
                        <div class="col-lg-1 p-1">
                          <button type="button" class="btn btn-default" @click="changeBoxTwo(0)">Close</button>
                        </div>
                      </div>

                      <span>
                      <div class="row" v-if="receipts.length>0">
                        <div class="col-lg-12 p-1 mt-2 bg-primary header-receipt">
                          <p class="text-white">
                            Received Receipt Number/s
                          </p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="grid-column mt-1">
                          
                          <!-- NEW RR GROUP  FOR LOOP-->
                          <div v-for="(receipt, index) in rrHolder.rr_group" :key="index" class="box-rr px-2 ">
                            <div class="flex-col">
                              <p class="m-0 p-0 rr_header">
                                <strong>{{ receipt.rr_no }}</strong>
                              </p>
                              <p class="m-0 p-0 text-sm rr_qty">
                                <strong>Qty:</strong> <em>{{ receipt.rr_qty }}</em>
                              </p>
                            </div>
                            
                            <div class="flex-btn-icon">
                              <span class="material-icons text-danger" @click="deleteRRHolder(receipt, index)">
                                highlight_off
                              </span>         
                            </div>
                          </div>
                        </div>
                      </div>
                      </span>
                    </div>
                  </div>
                </div>



                <div class="my-box col-lg-10 col-md-12 row" v-else-if="shiftBox == 4">
                  <div class="col-lg-12 p-1" v-if="documentType == 7 || documentType == 8  || documentType == 2  || documentType == 4 || documentType == 5">
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
                        <p class="data-large">Contractor's Billing</p>
                      </div>

                      <div class="sub-flex bt-top">
                        <div class="label-small">Payment Type</div>
                        <p class="data-large">{{ paymentType }}</p>
                      </div>

                      <div class="sub-flex bt-top last-flex">
                        <div class="label-small" v-if="documentCategory">Category</div>
                        <p class="data-large" v-if="documentCategory">{{ documentCategory }}</p>
                      </div>
                      <!-- SECOND -->
                      <div class="sub-flex" >
                        <div class="label-small">Company</div>
                        <p class="data-large">{{ getCompanyInfo }}</p>
                      </div>

                      <div class="sub-flex last-flex">
                        <div class="label-small">Supplier</div>
                        <p class="data-large">{{ documentSupplier }}</p>
                      </div>


                      <!-- THIRD -->
                      <div class="sub-flex">
                        <div class="label-small">Document Number</div>
                        <p class="data-large">{{ documentNumber }}</p>
                      </div>

                      <div class="sub-flex">
                        <div class="label-small">Document Date</div>
                        <p class="data-large">{{ documentDate }}</p>
                      </div>

                      <div class="sub-flex">
                        <div class="label-small">Document Amount</div>
                        <p class="data-large">{{ documentAmount }}</p>
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

                      <div class="sub-flex">
                        <div class="label-small">Purchase Order Information</div>
                        <p class="data-large"> <strong>Total PO Quantity: </strong>{{ totalQty }}</p>
                        <p class="data-large"> <strong>Total PO Amount: </strong>{{ totalAmount }}</p>
                        <p class="data-large"> <strong>Total PO Batch: </strong>{{ po_group.length }}</p>
                      </div>

                      <div class="sub-flex last-flex">
                        <span v-if="documentType != 7">
                          <div class="label-small">Reference Information</div>
                          <p class="data-large"> <strong>Total Reference Quantity: </strong>{{ totalRefQuantity }}</p><br>
                          <p class="data-large"> <strong>Total Reference Amount: </strong>{{ totalRefAmount }}</p><br>
                          <p class="data-large"> <strong>Total Reference Batch: </strong>{{ refList.length }}</p>
                        </span>
                      </div>

                      
                      
                    </div>

                    <div class="balance-grid">
                      <div class="right-flex">
                        <p><strong>Total Document Amount:</strong></p>
                        <p><strong>Total PO Amount:</strong></p>
                        <p v-if="documentAmount<totalAmount"><strong>Total Document Amount:</strong></p>
                        <div></div>
                        <p class="text-success" v-if="totalBalanceOne==0"><strong>Remaining Balance:</strong></p>
                        <p class="text-danger" v-else><strong>Remaining Balance:</strong></p>

                      </div>

                      <div class="left-flex">
                        <p><strong>{{ documentAmount }}</strong></p>
                        <p class="last-amount"><strong>{{ totalAmount }}</strong></p>
                        <div class="underlined"></div>
                        <p class="last-amount text-success" v-if="totalBalanceOne==0"><strong>{{totalBalanceOne}}</strong></p>
                        <p class="last-amount text-danger" v-else><strong>{{totalBalanceOne}}</strong></p>
                      </div>
                    </div>


                    

                    

                    

                    <hr>
                    <div class="row">
                      <div class="col-lg-2 offset-lg-8 pr-1">
                        <button class="btn btn-success btn-block border">Submit</button>
                      </div>
                      <div class="col-lg-2 pl-1">
                        <button @click="hideBalance(0)" class="btn btn-block border">Back</button>
                      </div>
                    </div>

                  </div>
                </div>
            </div>
        </div>
        </form>
    </div>
  </div>
</template>



<script>

// npm install git+https://github.com/sagalbot/vue-select.git#feat/vue-3-compat
import Sidebar from '../../components/shared-components/Sidebar'
import Navbar from '../../components/shared-components/Navbar'
import DataTable from '../../components/shared-components/DataTable'
import Modal from '../../components/shared-components/Modal'
import Loading from '../../components/shared-components/Loading'
import {mapState} from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import {gsap} from 'gsap'

export default {
    components: { Sidebar, Navbar, DataTable, Modal, Loading},
    data(){
      return{
        isDone: true,
        documents: [],
        companies: [],
        suppliers: [],
        withCategories: false,
        categories: [],
        cat: [],
        result: [],
        userId: null,
        letters: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
        
        poNumber: null,
        rrNumber: null,
        poAmount: '',

        refAmount: '',
        references: [],
        supplierType: '',
        refNumber: null,
        refs: [],
        shiftBox: 0,

        receiptNumber: null,
        rrQuantity: null,
        receipts: [],
        po_group: [],
        poQuantity: null,
        editMode: false,
        batchIndex: null,
        // unitPrice: null,
        rrHolder: [],
        refQty: null,
        total: {
          qty: 0,
          amt: 0,
          price: 0,
          batch: 0,
        },
        rrGroupHold: [],
        error: null,
        rrList: [],
        isClear: 0,


        // REFERRENCES
        refList: [],
        totalRef: {
          amount: 0,
          qty: 0,
        },
        documentType: null,
        paymentType: null,
        documentCategory: null,
        dateFrom: null,
        dateTo: null,
        documentCompany: null,
        documentNumber: null,
        documentSupplier: null,
        documentDate: null,
        documentAmount: null,
        documentRemarks: null,
      
        
      }
    },
    created(){
      this.fetchDocuments()
      this.fetchCompanies()
      this.fetchSuppliers()
      this.fetchReferences()
    },
    
    methods:{
      formSubmit(){

      },
      resetTransaction(){
        this.documentType = null
        this.paymentType = null
        this.documentCategory = null
        this.dateFrom = null
        this.dateTo = null
        this.documentCompany = ''
        this.documentNumber = null
        this.documentSupplier = null
        this.documentDate = null
        this.documentAmount = null
        this.documentRemarks = null
        this.po_group = []
        this.refList = []
      },
      removeRef(index){
        const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                confirmButton: 'btn btn-success ml-2',
                cancelButton: 'btn btn-danger ml-2'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                  this.refList.splice(index, 1)  
                  Swal.fire({
                    icon: 'info',
                    title: 'Removed',
                    text: 'PO Batch removed successfully'
                  })  

                } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'PO Batch not remove',
                    'error'
                )
                }
            })
      },
      hideBalance(num){
        this.shiftBox = num
      },
      showBalance(num){
        this.shiftBox = num
      },
      changeSupplierType(){
        if(this.supplierType !=  ""){
          document.getElementById("refNumber").focus()
          this.refNumber = null
          this.refQty = null
          this.refAmount = null
        }
      },
      clearRef(){
        this.supplierType = null
        this.refNumber = null
        this.refAmount = null
        this.refQty = null
      },
      refAdded(){
        const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1100,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Reference Added Successfully'
      })
      },
      submitRef(){
        if(this.supplierType == 'dr'){
          if(this.refNumber){
            if(this.refAmount || this.refQty){
              this.refList.unshift({
                referrence_type: this.supplierType,
                referrence_no: this.refNumber,
                referrence_amount: this.refAmount,
                referrence_qty: this.refQty
              })
              this.clearRef()
              this.refAdded()
            }else{
              document.getElementById("refQty").focus()
            }
          }
          
        }else if(this.supplierType == 'si'){
          if(this.refAmount || this.refQty){
            this.refList.unshift({
              referrence_type: this.supplierType,
              referrence_no: this.refNumber,
              referrence_amount: this.refAmount,
              referrence_qty: this.refQty
            })
            this.refAdded()
            this.clearRef()
          }else{
            document.getElementById("refAmount").focus()
          }
        }else{
          alert("Please select one Supplier Type")
        }
        
      },
      addCommaDocAmount(){
     
        const result = this.documentAmount
        .replace(/[^0-9a-zA-Z.]/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")

        this.documentAmount = result
        
      },
      addCommaRefQty(){
        try {
          const result = this.refQty
          .replace(/[^0-9a-zA-Z.]/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")

          this.refQty = result
        } catch (error) {
          document.getElementById("refType").focus()
        }
      },
      addCommaRefAmount(){
        try {
          const result = this.refAmount
          .replace(/[^0-9a-zA-Z.]/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")

          this.refAmount = result
        } catch (error) {
          document.getElementById("refType").focus()
        }
        
      },
      clearFields(){
        this.poNumber = null
        this.poAmount = null
        // this.unitPrice = null
        this.poQuantity = null
        this.receipts = []
        this.rrQuantity = null
        this.receiptNumber = null
      },
      deleteRRHolder(receiptNumber, index){
        this.rrHolder.rr_group.splice(index, 1)
      },
      changeBoxTwo(num){
        this.shiftBox = num
        this.clearFields()
      },
      updateBatch(){
        Swal.fire({
          title: 'Do you want to update this PO Batch?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Update`,
 
          }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.po_group.splice(this.batchIndex, 1)
            this.po_group.unshift({
              po_no: this.poNumber,
              po_amount: this.poAmount,
              // unit_price: this.unitPrice,
              po_qty: this.poQuantity,
              rr_group: this.rrHolder.rr_group,
            })

            this.shiftBox = 0
            Swal.fire('Updated!', '', 'success')
            setTimeout(()=>{
              this.clearFields()
            }, 200)


          } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
          }
      })
        
      },
      editPO(index){
       this.shiftBox = 3
       this.batchIndex = index
       this.rrHolder = JSON.parse(JSON.stringify(this.po_group[index]))
      // this.rrHolder = this.po_group[index]
      //  console.log(this.rrHolder)
      this.poNumber  = this.rrHolder.po_no
      this.poAmount = this.rrHolder.po_amount
      this.poQuantity = this.rrHolder.po_qty
      // this.unitPrice = this.rrHolder.unit_price

      },
      deletePO(index){
        const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                confirmButton: 'btn btn-success ml-2',
                cancelButton: 'btn btn-danger ml-2'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                  this.po_group.splice(index, 1);     
                  Swal.fire({
                    icon: 'info',
                    title: 'Removed',
                    text: 'PO Batch removed successfully'
                  })  

                } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'PO Batch not remove',
                    'error'
                )
                }
            })
      },
      saveBatch(){
        this.editMode = false
        let poHolder = []
        this.po_group.forEach(po=>{
          poHolder.push(po.po_no)
        })

        let arr = poHolder
        let index = arr.indexOf(this.poNumber)

        if(index > -1){
            this.error = "PO Number already exist in this transaction"
            document.getElementById("alert-error").classList.remove('hidden')
        }else{
          Swal.fire({
              title: 'Do you want to add this PO Batch?',
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: `Save`,
              }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                if(this.shiftBox == 1){
                  this.po_group.unshift({
                    po_no: this.poNumber,
                    rr_group: this.receipts,
                    po_amount: this.poAmount,
                    // unit_price: this.unitPrice,
                    po_qty: this.poQuantity,
                  })
                  
                }else{
                  this.po_group.unshift({
                    po_no: this.poNumber,
                    rr_group: this.rrHolder.rr_group,
                    po_amount: this.poAmount,
                    // unit_price: this.unitPrice,
                    po_qty: this.poQuantity,
                  })
                }
                Swal.fire('Saved!', '', 'success')
                this.shiftBox = 0
                this.supplierType = ''
                this.clearFields()
                // setTimeout(()=>{
                //   try {
                //     this.po_group.forEach(rr=>{
                //       rr.rr_group.forEach(num=>{
                //         let holder = this.rrList
                //         this.rrList = []
                //         holder.push(num.rr_no)
                //         this.rrList = {...holder}
                //       })
                //     })
                    
                //   } catch (error) {
                //     console.log(error)
                //   }
                // },100)


              } else if (result.isDenied) {
                  Swal.fire('Changes are not saved', '', 'info')
              }
          })
        
        }
      },
      moveFocus(num){
        console.log(num, this.documentType)
        if(num == 1){
          if(this.documentType == 7){
            console.log('po amount')
            document.getElementById("poAmount").focus();
          }else{
            console.log('po amount')
            document.getElementById("poQuantity").focus();
          }
        }else if(num == 2){
          try {
            document.getElementById("poAmount").focus();
          } catch (error) {
            document.getElementById("receiptNumber").focus();
          }
          
        }else if(num == 3){
          if(this.documentType == 7){
            this.saveBatch()
          }else{
            document.getElementById("receiptNumber").focus();
          }
        }
      },
      
      deleteRR(receiptNumber, index){
        this.receipts.splice(index, 1)
      },
      preventSubmit(){
      },
      submitRRUpdate(){
        if(this.receiptNumber && this.rrQuantity){
          let holder = []
          this.rrHolder.rr_group.forEach(receipt=>{
            holder.push(receipt.rr_no)
          })
          let arr = holder
          let index = arr.indexOf(this.receiptNumber)
          
          if(index > -1){
            this.error = "Receipt Number already exist in this PO Batch"
            document.getElementById("alert-error").classList.remove('hidden')
            document.getElementById("receiptNumber").focus();
          }else{
            document.getElementById("alert-error").classList.add('hidden')
            this.rrHolder.rr_group.push({rr_no: this.receiptNumber, rr_qty: this.rrQuantity})
            this.receiptNumber = null
            this.rrQuantity = null
            document.getElementById("receiptNumber").focus();
          }
        }else if(this.receiptNumber && !this.rrQuantity){
          document.getElementById("rrQuantity").focus();
        }
      },
      submitRR(){
        if(this.receiptNumber && this.rrQuantity){
          let holder = []
          this.receipts.forEach(receipt=>{
            holder.push(receipt.rr_no)
          })
          let arr = holder
          let index = arr.indexOf(this.receiptNumber)
          
          if(index > -1){
            this.error = "Receipt Number already exist in this PO Batch"
            document.getElementById("alert-error").classList.remove('hidden')
            document.getElementById("receiptNumber").focus();
          }else{
            // console.log("PO GROUP", this.po_group)
            // console.log(this.rrList)
            

            
            document.getElementById("alert-error").classList.add('hidden')
            this.receipts.push({rr_no: this.receiptNumber, rr_qty: this.rrQuantity})
            this.receiptNumber = null
            this.rrQuantity = null
            document.getElementById("receiptNumber").focus();
          }
        }else if(this.receiptNumber && !this.rrQuantity){
          document.getElementById("rrQuantity").focus();
        }
      },
      
    
      changeBox(num){
        this.shiftBox = num
        this.receiptNumber = null
        
        setTimeout(()=>{
          if(num == 1){
            document.getElementById("poNumber").focus();
          }else{
            this.clearFields()
            this.editMode = false

          }
        },200)
        
      },

      addCommaQty(){
        const result = this.poQuantity
        .replace(/[^0-9a-zA-Z.]/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        this.poQuantity = result
      },
      // addCommaPrice(){
      //   const result = this.unitPrice
      //   .replace(/[^0-9a-zA-Z.]/g, "")
      //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      //   this.unitPrice = result
      // },
      addCommaRef(){
        const result = this.refAmount
        .replace(/[^0-9a-zA-Z.]/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        this.refAmount = result
      
      },
      addComma(){
        const result = this.poAmount
        .replace(/[^0-9a-zA-Z.]/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        this.poAmount = result
      
      },
  
      
      changeDocumentType(){
        this.categories = []
        this.cat = []
        let holder = this.documentType
        if(this.documentType){
          this.isClear += 1
          if(this.isClear > 1){
            this.resetTransaction()
            this.documentType = holder
          }
          axios.get(`/documents/${this.documentType}`).then(res=>{
            let result = res.data[0]
            
            if(result.categories[0] == null){
              this.withCategories = false
            }else{
              this.withCategories = true
              this.categories = result.categories
              axios.get(`/categories`).then(res=>{
                let cat = res.data
                let final = cat.data
                final.forEach((category, index)=>{
                  result.categories.forEach(cat=>{
                    if(category.id == cat){
                      this.cat.push(category)
                    }
                  })
                })
              })
            }
          })
        }else{
          this.resetTransaction()
          this.isClear = 0
        }
      },
      commaSeparate(){  
          $( "#salary" ).val( parseFloat($( "#salary" ).val(), 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
      },
      fetchReferences(){
        axios.get('referrences/all?is_active=active').then(res=>{
          this.isDone = true
          let final = res.data
          this.references = final.data
        }).catch(err=>{
           let msg = err.response.data.errors
            this.isDone = true
            Swal.fire(msg.referrence_type[0], 'Data not Updated', 'warning')
        })
      },
      fetchDocuments(){
        this.isDone = false
        axios.get('/documents?is_active=active').then(res=>{
          this.isDone = true
          this.documents = res.data
        }).catch(err=>{
           let msg = err.response.data.errors
            this.isDone = true
            Swal.fire(msg.referrence_type[0], 'Data not Updated', 'warning')
        })
      },
      fetchCompanies(){
        this.isDone = false
        axios.get('/companies?is_active=active').then(res=>{
          this.isDone = true
          let holder = res.data
          let final = holder.data
          this.companies = final.data
        }).catch(err=>{
           let msg = err.response.data.errors
            this.isDone = true
            Swal.fire(msg.referrence_type[0], 'Data not Updated', 'warning')
        })
      },
      fetchSuppliers(){
        this.isDone = false
        axios.get('/suppliers?is_active=active').then(res=>{
          this.isDone = true
          let holder = res.data
          this.suppliers = holder.data
     
        }).catch(err=>{
           let msg = err.response.data.errors
            this.isDone = true
            Swal.fire('', 'Data not Updated', 'warning')
        })
      },
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

      

    },
    computed:{
      //  THIS IS THE PROBLEM
      getCompanyInfo(){
        let output
        if(this.documentCompany){
          

          axios.get(`/companies/${this.documentCompany}`).then(res=>{
            
              let holder = res.data
              let result = holder.data
              output = `${result.company_code}-${result.company_description}`
            
            
          })
          setTimeout(()=>{
            return output
            console.log('OUTPUTdd', output)
          }, 1000)



        }
        
        
        
      },
      getCategoryInfo(){

      },
      getSupplierInfo(){

      },
      totalBalanceOne(){
        if(this.documentAmount && this.totalAmount){
          let holder 
          let documentAmount = this.documentAmount.replace(/,/g, '')
          let totalAmount = this.totalAmount.replace(/,/g, '')

          let total = parseFloat(documentAmount) - parseFloat(totalAmount)
          holder = total.toString()
          const result = holder.replace(/[^0-9a-zA-Z.]/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          holder = result

          return holder
        }
        
        
      },
      emptyFieldValidation(){
        if(this.documentType == 7){
          if(this.documentCompany &&
            this.documentNumber &&
            this.documentSupplier &&
            this.documentDate &&
            this.documentAmount){
              return true
          }else{
            return false
          }
        }

        if(this.documentType == 2 || this.documentType == 4){
          if(this.documentCategory &&
            this.documentCompany &&
            this.documentNumber &&
            this.documentSupplier &&
            this.documentDate &&
            this.documentAmount){
              return true
          }else{
            return false
          }
        }
      },
      documentValidation(){

        if(this.documentType){
          // PAD validation
          if(this.documentType == 7 && this.documentAmount){
           
            let removed = this.totalAmount.replace(/,/g, '')
            let docAmount = this.documentAmount.replace(/,/g, '')
            if(parseFloat(docAmount) == parseFloat(removed) && this.documentAmount && parseFloat(removed)){
              return true
            }else{
              return false
            }
          }
          // End of PAD Validation



          // PRM Validation
          if(this.documentType == 2 && this.documentAmount){
            let totalPoAmount = this.totalAmount.replace(/,/g, '')
            let totalRefAmount = this.totalRefAmount.replace(/,/g, '')
            let docAmount = this.documentAmount.replace(/,/g, '')
            
            // PRM FULL
            if(this.paymentType == 'full'){
              
              if((parseFloat(docAmount) <= parseFloat(totalPoAmount) && parseFloat(totalRefAmount) <= parseFloat(totalPoAmount) && this.documentAmount && totalPoAmount)){
                if(totalRefAmount){
                  if(parseFloat(totalRefAmount) == parseFloat(docAmount)){
                    return true
                  }else{
                    return false
                  }
                }else{
                  return false
                }
              }else{
                return false
              }
            }
            // PRM PARTIAL
            else{
           
              if(parseFloat(docAmount) == parseFloat(totalPoAmount) && parseFloat(docAmount) > parseFloat(totalRefAmount) && parseFloat(totalRefAmount)){
                return true
              }else{
                return false
              }
            }
          }
          // End of PRM Validation

          // Contractor's Billing Validation
          if(this.documentType == 4 && this.documentAmount){
            let totalPoAmount = this.totalAmount.replace(/,/g, '')
            let totalRefAmount = this.totalRefAmount.replace(/,/g, '')
            let docAmount = this.documentAmount.replace(/,/g, '')

            if(parseFloat(docAmount) == parseFloat(totalPoAmount) && parseFloat(docAmount) > parseFloat(totalRefAmount) && parseFloat(totalRefAmount)){
              return true
            }else{
              return false
            }
          }
          // End of CB Validation

        }else{
          return false
        }
        


      },
      totalRefQuantity(){
        this.totalRef.qty = 0
        this.refList.forEach(total=>{
          if(total.referrence_qty){
            let removed = total.referrence_qty.replace(/,/g, '');
            this.totalRef.qty += parseFloat(removed)
          } 
        })

        let holder = this.totalRef.qty.toString()
        
        const result = holder
        .replace(/[^0-9a-zA-Z.]/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        holder = result

        return holder
      },
      totalRefAmount(){
        this.totalRef.amount = 0
        this.refList.forEach(total=>{
          if(total.referrence_amount){
            let removed = total.referrence_amount.replace(/,/g, '');
            this.totalRef.amount += parseFloat(removed)
          }
        })

        let holder = this.totalRef.amount.toString()
        
        const result = holder
        .replace(/[^0-9a-zA-Z.]/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        holder = result

        return holder
      },
      totalQty(){
        if(this.documentType != 7){
          this.total.qty = 0
          this.po_group.forEach(total=>{
            let removed = total.po_qty.replace(/,/g, '')
            this.total.qty += parseFloat(removed)
          })
          let holder = this.total.qty.toString()
          
          const result = holder
          .replace(/[^0-9a-zA-Z.]/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          holder = result

          return holder
        }
        
      },
      totalAmount(){
        this.total.amt = 0
        this.po_group.forEach(total=>{
          if(total.po_amount){
            let removed = total.po_amount.replace(/,/g, '')
            this.total.amt += parseFloat(removed)
          } 
        })
        let holder = this.total.amt.toString()
        
        const result = holder
        .replace(/[^0-9a-zA-Z.]/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        holder = result

        return holder
        
      },
      // totalUnitPrice(){
      //   this.total.price = 0
      //   this.po_group.forEach(total=>{
      //     if(total.unit_price){
      //       let removed = total.unit_price.replace(/,/g, '')
      //       this.total.price += parseFloat(removed)
      //     }
      //   })

      //   let holder = this.total.price.toString()
        
      //   const result = holder
      //   .replace(/[^0-9a-zA-Z.]/g, "")
      //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      //   holder = result

      //   return holder
      // }
    },
}
    
</script>



<style scoped>

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

  .tr-grid :nth-child(11){
    grid-column:1/3;
    border-radius:0 0 0 7px;
  }

  .tr-grid :nth-child(12){
    grid-column:3/5;
    border-radius:0 0 0 7px;
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

  .absolute-div{
    position:absolute;
    background:rgb(180, 148, 148);
    padding:3px 8px;
    color:white;
    top:-10px;
    left:10px;
    border-radius:3px;
  }
  .line-calc{
    border-bottom:2px solid black;
    margin:5px 0;
  }
  .hidden{
    display:none;
  }

  #custom-target {
  position: relative;
  width: 600px;
  height: 300px;
  border-style: solid;
}

.position-absolute {
  position: absolute;
}

  .center-batch{
    padding:0;
    width:100%;


  }

  .btn-flex-po span:nth-child(1){
    margin-right:10px;
  }

  .btn-flex-po span{
    font-size:17px;
    cursor:pointer;
  }

  .flex-details{
    display:flex;
    justify-content:space-between;
  }

  .my-card-2{
    border:1px solid white;
    /* margin-bottom:10px; */
    padding:10px 8px;
    background:rgba(255, 255, 255, 0.658);
    /* border-radius:10px; */
    display:flex;
    justify-content:space-between;
    padding-top:4px;
    box-shadow:2px 2px 3px rgba(1, 1, 1, 0.171);
  }

  .rr_qty{
    color:rgb(48, 47, 47);
  }
  .rr_header{
    font-size:17px;
  }

  .flex-col{
    display:flex;
    flex-flow:column;
  }


  .flex-btn-icon span{
    font-size:17px;
    cursor:pointer;
    margin-top:1px;
  }

  .grid-column{
    display:grid;
    grid-template-columns:repeat(4, 1fr);
    grid-auto-rows: minmax(60px, 30px);
    width:100%;
    gap:7px;
  }

  .box-rr{
    background:rgba(255, 255, 255, 0.658);
    border-radius:10px;
    display:flex;
    justify-content:space-between;
    padding-top:4px;
    box-shadow:2px 2px 3px rgba(1, 1, 1, 0.171);
  }

  .btn-rr{
    outline:none;
    height:10px;
    margin-top:5px;
    padding:3px;
  }

  

  .bg-gray{
    background:rgb(158, 158, 158);
  
  }
  .header-receipt{
    border:1px solid white;
  }

  .my-card{
    position:relative;
    border:1px solid rgb(190, 190, 190);
    
    padding:20px 0;
 

    border-radius:5px;
    background:rgb(241, 241, 241);
  }

    .text-black{
        color:black;
    }
 

    #updateCat{
        min-width:500px;
    }
</style>