<template>
  <div id="cr-grid">
    <div class="sidebar-container">
      <Sidebar/>
    </div>
    <div class="main-container">
    <Navbar/>

                
   
        <div class="grid-header m5">
            <div class="loader-container" v-if="!isDone">
                <Loading class="loader"/>
            </div>
            <div class="row">
         
                <div class="col-md-4 pl-4 mt-2">
                    <form @submit.prevent="supplierSave()" autocomplete="off">
                        <div class="form-group">
                            <label for="category">Supplier Code</label>
                            <input type="text" class="form-control" id="supplier-code" v-model="userInput.supplier_code">
                        </div>

                        <div class="form-group">
                            <label for="category">Supplier Name</label>
                            <input type="text" class="form-control" id="supplier-name"  v-model="userInput.supplier_name">
                        </div>

                        <div class="form-group">
                            <label for="category">Supplier Terms</label>
                            <input type="text" class="form-control" id="supplier-terms"  v-model="userInput.terms">
                        </div>




                        
                        <div class="form-group">
                            <label for="category">Supplier Type</label>
                           
                            <select class="form-control" v-model="userInput.supplier_type_id">
                                <option :value="st.id" v-for="st in supplierTypes" :key="st.id" class="py-1">{{ st.type }}</option>
                            </select>
                        </div>


                        


                        <div class="form-group">
                            <label for="select-search">Referrences</label>
                            <select class="form-control" v-model="userInput.referrence" @change="addReferrence()">
                                <option v-for="ref in referrences" :key="ref.id" :value="ref.id">{{ ref.referrence_type }}</option>
                            </select>
                        </div>

                        <!-- INSERT LOADER HERE -->
                        
                        <span class="small-loader" v-if="!smLoader">
                            <SmallLoader class="loader-sm"/>
                        </span>
                        <div class="form-group grid-custom">
                            <div v-for="(sr, index) in selectedRef" :key="index" class="small-fs">
                                
                                <span>{{ sr }}</span>
                                <span class="material-icons" :title="`remove ${sr}`" @click="removeRef(sr)">highlight_off</span>
                                
                            </div>
                        </div>

                        
                        
                    
                   
                        <div class="form-group row">
                            <div class="col-md-3 pr-0" v-if="!updateMode">
                                <span v-if="userInput.supplier_code.length < 3 || userInput.supplier_name.length < 2 || userInput.terms.length < 3 ">
                                    <button type="submit" class="btn btn-sm btn-success disable text-black" disabled>Save</button>
                                </span>
                                <span v-else>
                                    <button type="submit" class="btn btn-sm btn-success" >Save</button>
                                </span>
                            </div>
                            <div class="col-md-3 pr-0" v-else>
                                <span v-if="userInput.supplier_code.length < 3 || userInput.supplier_name.length < 2 || userInput.terms.length < 5">
                                    <button type="submit" class="btn btn-sm btn-success disable text-black" disabled>Update</button>
                                </span>
                                <span v-else>
                                    <button type="submit" class="btn btn-sm btn-success" >Update</button>
                                </span>
                            </div>

                            <div class="col-md-3 pl-1">
                                <router-link :to="{name: 'Users'}" v-if="!updateMode">
                                    <button class="btn btn-sm btn-default">Back</button>     
                                </router-link>
                                <button class="btn btn-sm btn-default" v-else @click="cancelEdit()">Cancel</button>     

                            </div>
                        </div>
                    </form>
                </div>
                
               
                <div class="col-md-8 pt-1">
        <DataTable>

        
        <template v-slot:tb-btn-tab>
        
        </template>


        <template v-slot:tb-search>
            <input type="text" @keyup.enter="searchData()" v-model="query" placeholder="Search">
        </template>

        
        
        <template v-slot:tb-header>
          <th>ID #</th>
          <th>Code</th>
          <th>Name</th>
          <th>Terms</th>
          <th>Type</th>
          <!-- <th>Date Created</th> -->
          
          <th class="text-center">Action</th>
        </template>
        
        <template v-slot:tb-data>
          <tr class="hovered" v-for="supplier in suppliers" :key="supplier.id">
            <td>{{ supplier.id }}</td>
            <td>{{ supplier.supplier_code }}</td>
            <td>{{ supplier.supplier_name }}</td>
            <td>{{ supplier.terms }}</td>
            <td>{{ supplier.type }}</td>
            <!-- <td>{{ company.created_at }}</td> -->
            <td class="text-center">
                <button class="btn btn-sm btn-info" data-toggle="modal" data-target="#myModal" @click="editMode(supplier.id, supplier.supplier_code, supplier.supplier_name, supplier.terms, supplier.supplier_type_id)">Edit</button>
                <button class="btn btn-sm btn-warning ml-1" @click="supplierArchive(supplier.id)">Archive</button>
            </td> 
        </tr>
        </template>
      </DataTable>
      
                </div>
            </div>
        </div>

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
import SmallLoader from '../../components/shared-components/SmallLoader'
import {mapState} from 'vuex'
import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'
import {gsap} from 'gsap'

export default {
    components: { Sidebar, Navbar, DataTable, Modal, Loading, SmallLoader},
    data(){
       return {
           query: '',
           url: '/suppliers',
           referrences: [],
           updateMode: false,
           suppliers: [],
           companyid: null,
           supplierTypes: null,
           selectedRef:[],
           selectedRefId:[],
           userInput: {
               supplier_code: '',
               supplier_name: '',
               terms: '',
               supplier_type_id: '',
               active: true,
               referrence:[]
           },
           finalRef: [],
           isDone: true,
           smLoader:true
       }
    },
    created(){
        this.fetchsuppliers()
        this.fetchSupplierType()
        this.fetchReferrence()
    },
    
    methods:{
        searchData(){
           
            this.isDone = false
            axios.post(`/suppliers/search`, {
                value: this.query.toLowerCase()
            }).then(res=>{
                this.isDone = true
                let result = res.data
                let holder = result.data
                
                if(holder.length == 0){
                    Swal.fire({
                        icon: 'error',
                        title: '404',
                        text: 'Data not Found'
                        
                    })
                    this.fetchsuppliers()
                    
                    
                }else{
                    this.suppliers = []
                    holder.forEach(hold=>{
                        this.suppliers.push({
                            id: hold.id,
                            supplier_name: hold.supplier_name.toUpperCase(),
                            supplier_code: hold.supplier_code,
                            terms: hold.terms.toUpperCase(),
                            type: hold.type.toUpperCase(),
                            transaction_days: hold.transaction_days,
                            supplier_type_id: hold.supplier_type_id,
                            created_at: moment(hold.created_at).format('LL')
                            
                        })
    
                    })        
                } 
                
            }).catch(err=>{
                this.isDone = true
                Swal.fire({
                    icon: 'error',
                    title: '500',
                    text: 'Internal Server Error'
                })
                this.fetchsuppliers()
            })
            
        },
        async transfer(){
            this.finalRef = []
            await axios.get(`/referrences`).then(res=>{
                let holder = res.data
                let final = holder.data
                
                final.data.forEach(fd=>{
                    this.selectedRef.forEach(sr=>{
                        if(sr == fd.referrence_type){
                            this.finalRef.push(fd.id)
                        }
                    })
                })
            })
            setTimeout(()=>{
                this.smLoader = true
            }, 3000)
        },
        removeRef(ref){
            axios.get('/referrences').then(res=>{
                let holder = res.data
                let final = holder.data
                console.log('data', final.data)

                final.data.forEach((fd, index)=>{

                    if(fd.referrence_type == ref){
                        
                        this.selectedRef.splice(ref, 1)

                    }
                })
            })
        },
        addReferrence(id, type){
            
            axios.get(`/referrences/${this.userInput.referrence}`).then(res=>{
                let holder = res.data
                var arr = this.selectedRef
                var index = arr.indexOf(holder.data.referrence_type)
                if(index < 0){
                    this.selectedRef.push(holder.data.referrence_type)
                }else{

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'This data is already exist',
                        footer: ''
                    })
                }
                
            })
            this.userInput.referrence = []
            
            
        },
        
        fetchReferrence(){
            let theVue = this
            axios.get(`/referrences/all?is_active=active`).then(res=>{
                let holder = res.data         
                theVue.referrences = holder.data
                theVue.$nextTick(function(){ $('.selectpicker').selectpicker('refresh'); });
            })
        },
        
        fetchSupplierType(){
            let theVue = this
            axios.get(`/supplier-types`).then(res=>{
                let holder = res.data
                let final = holder.data
                theVue.supplierTypes = final.data
                theVue.$nextTick(function(){ $('.selectpicker').selectpicker('refresh'); });
            })
        },
        cancelEdit(){
            this.updateMode = false
            this.companyid = null
            this.userInput.supplier_code = ''
            this.userInput.supplier_name = ''
            this.userInput.terms = ''
            this.userInput.supplier_type_id = ''
            this.userInput.referrence = ''
            // this.userInput.supplier_type_id = ''
        },
        editMode(id, code, name, terms, suppid){
            this.updateMode = true
            this.companyid = id
            this.userInput.supplier_code = code
            this.userInput.supplier_name = name
            this.userInput.terms = terms
            this.userInput.supplier_type_id = suppid
            this.selectedRef = []
            this.finalRef = []
            this.transfer()
            this.smLoader = false
            axios.get(`/referrences`).then(res=>{
                    let holder2 = res.data
                    let final2 = holder2.data
                    
                    final2.data.forEach(fdata=>{
                        axios.get(`/suppliers/${id}`).then(res=>{
    
                            let holder = res.data
                            let final = holder.data
                            
                            final[0].referrences.forEach(fin=>{
                                if(fdata.id == fin){
                                    let holderData = res.data
                                    var arr = this.selectedRef
                                    var index = arr.indexOf(fdata.id)
                                    if(index < 0){
                                        this.selectedRef.push(fdata.referrence_type)
                                    }
                                }
                            })

                        })
                    })  
            })
            
        },
        supplierArchive(id){
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
                confirmButtonText: 'Yes, move to archive!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    this.isDone = true
                    axios.post(`/suppliers/archive/${id}`).then(()=>{
                        this.fetchsuppliers()
                        swalWithBootstrapButtons.fire(
                            'Archived!',
                            'Data has been moved to archive.',
                            'success'
                        )
                    })
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Data not remove',
                    'error'
                )
                }
            })
            
        },

        async supplierSave(){
            await this.transfer()
            console.log('final data', this.finalRef)
            if(!this.updateMode){
                Swal.fire({
                    title: 'Do you want to save data?',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: `Save`,
                    denyButtonText: `Don't save`,
                    }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        this.isDone = false
                        axios.post('/suppliers', {
                            supplier_code: this.userInput.supplier_code,
                            supplier_name: this.userInput.supplier_name,
                            terms: this.userInput.terms,
                            supplier_type_id: this.userInput.supplier_type_id,
                            is_active: true,
                            referrences: this.finalRef,
                        }).then(()=>{
                            this.isDone = true
                            Swal.fire('Saved!', '', 'success')
                            this.fetchsuppliers()
                            this.cancelEdit()
                            this.selectedRef = []
                            this.finalRef = []
                        }).catch(err=>{
                            console.log('error', err)
                        })
        
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
                
                
            }else{
                



                Swal.fire({
                    title: 'Do you want to update this data?',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: `Update`,
                    denyButtonText: `Don't update`,
                    }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        this.isDone = false
                        setTimeout(()=>{
                            axios.put(`/suppliers/${this.companyid}`, {
                                supplier_code: this.userInput.supplier_code,
                                supplier_name: this.userInput.supplier_name,
                                terms: this.userInput.terms,
                                supplier_type_id: this.userInput.supplier_type_id,
                                is_active: true,
                                referrences: this.finalRef,
                            }).then(()=>{
                                this.isDone = true
                                Swal.fire('Updated!', '', 'success')
                                console.log('final', this.finalRef)
                                this.fetchsuppliers()
                                this.cancelEdit()
                                this.selectedRef = []
                                this.finalRef = []
                            }).catch(err=>{
                                console.log('error', err)
                            })
                        },1500)
                        


                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
                
            }
        },
    
        fetchsuppliers(){
            this.suppliers = []
            axios.get('/suppliers?is_active=active')
            .then(response=>{
                let result = response.data
                
                let holder = result.data
                
                
                holder.forEach(hold=>{
                    this.suppliers.push({
                        id: hold.id,
                        supplier_name: hold.supplier_name.toUpperCase(),
                        supplier_code: hold.supplier_code,
                        terms: hold.terms.toUpperCase(),
                        type: hold.type.toUpperCase(),
                        transaction_days: hold.transaction_days,
                        supplier_type_id: hold.supplier_type_id,
                        created_at: moment(hold.created_at).format('LL')
                    })
                })        
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

}
    
</script>



<style scoped>

    .grid-custom{
        display:grid;
        grid-template-columns: repeat(3,1fr);
        gap:5px;
    }
    .small-fs{
        border-radius:3px;
        background:#ccc;
        padding:3px;
        display:flex;
        justify-content:space-between;
    }

    .small-fs span{
        font-size:12px;
        
    }

    .small-fs span:nth-child(2){
        text-align:right;
        color:red;
        font-weight:bold;
        cursor:pointer;
        
    }
    .text-black{
        color:black;
    }

    #updateCat{
        min-width:500px;
    }

    .custom-size{
        min-width:500px;
    }
    
</style>