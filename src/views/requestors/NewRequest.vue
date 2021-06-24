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
        <form>
        <div class="grid-header">
            <div class="row p-5"> 
                <div class="col-lg-4 p-1">
                  <div class="col-lg-12 px-5 my-card">
                      
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label for="">Select Document Type</label>
                              <select class="form-control">
                                <option value="">Select Document Type</option>
                                <option v-for="document in documents" :key="document.id" :value="document.document_id" >{{document.document_type.toUpperCase()}}</option>
                              </select>
                            </div>
                          </div>
                        </div>



                        <div class="row">

                          <div class="col-lg-12">
                            <div class="form-group">
                              <label for="">Payment Type</label>
                              <select class="form-control">
                                <option value="">Select Payment Type</option>
                                <option value="full">FULL</option>
                                <option value="partial">PARTIAL</option>
                              </select>
                            </div>
                          </div>
                          
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label for="">Company</label>
                              <select class="form-control">
                                <option>Select Company</option>
                                <option v-for="company in companies" :key="company.id" :value="company.id">{{ company.company_code}} - {{ company.company_description.toUpperCase() }}</option>
                              </select>
                            </div>
                          </div>

                        </div>




                        <div class="row">

                          <div class="col-lg-12">
                            <div class="form-group">
                              <label for="">Document Number</label>
                              <input type="number" class="form-control">
                            </div>
                          </div>
                          
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label for="">Supplier</label>
                              <select class="form-control">
                                <option>Select Supplier</option>
                                <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">{{ supplier.supplier_name.toUpperCase() }}</option>
                              </select>
                            </div>
                          </div>

                        </div>


                        <div class="row">

                          <div class="col-lg-12">
                            <div class="form-group">
                              <label for="">Document Date</label>
                              <input type="date" class="form-control">
                            </div>
                          </div>
                          
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label for="">Remarks</label>
                              <textarea rows="2" class="form-control"></textarea>
                            </div>
                          </div>
                        </div>


                        <div class="row">
                          <div class="col-lg-3">
                            <div class="form-group">
                              <button class="btn btn-success">Save</button>
                            </div>
                          </div>


                          <div class="col-lg-3">
                            <div class="form-group">
                              <button class="btn">Back</button>
                            </div>
                          </div>
                        </div>


                        



                  </div>
                </div>

                <div class="col-lg-4 p-1">
                  <div class="col-lg-12 px-5 my-card">
                      
                      
                        <div class="row">

                          <div class="col-lg-3 p-1">
                            <div class="form-group">
                              <label for="">PO #</label>
                              <input type="text" class="form-control">
                            
                            </div>
                          </div>
                          
                          <div class="col-lg-3 p-1">
                            <div class="form-group">
                              <label for="">RR #</label>
                              <input type="text" class="form-control">
                            
                            </div>
                          </div>

                          <div class="col-lg-6 p-1">
                            <div class="form-group">
                              <label for="">RR #</label>
                              <input type="text" class="form-control">
                            
                            </div>
                          </div>
                        
                        </div>

                        <div class="row">
                          <div class="col-lg-12">
                            <ul>
                              <li>12/34/80,000</li>
                              <li>12/104/100,000</li>
                              <li>12/105/100,000</li>
                            </ul>
                          </div>
                        </div>



                  </div>
                </div>


                <div class="col-lg-4 p-1">
                  <div class="col-lg-12 px-5 my-card">
                      
                      
                        <div class="row">

                          <div class="col-lg-3 p-1">
                            <div class="form-group">
                              <label for="">REF #</label>
                              <input type="text" class="form-control">
                            
                            </div>
                          </div>

                          

                          <div class="col-lg-9 p-1">
                            <div class="form-group">
                              <label for="">RR #</label>
                              <input type="text" class="form-control">
                            
                            </div>
                          </div>
                        
                        </div>




                        


                        


                        



                  </div>
                </div>

                
                
            </div>
        </div>
        </form>

        {{ suppliers }}


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
        suppliers: []
      }
    },
    created(){
      this.fetchDocuments()
      this.fetchCompanies()
      this.fetchSuppliers()
    },
    methods:{
      commaSeparate(){
        
          $( "#salary" ).val( parseFloat($( "#salary" ).val(), 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
        
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
          console.log('suppliers',this.suppliers)
        }).catch(err=>{
           let msg = err.response.data.errors
            this.isDone = true
            Swal.fire('', 'Data not Updated', 'warning')
        })
      }
    }
    

}
    
</script>



<style scoped>

  .my-card{
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