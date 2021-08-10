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
                <div class="col-md-4 pl-4 mt-2 custom-card-bd-img">
                    <form @submit.prevent="supplierTypeSave()" autocomplete="off">
                        <div class="form-group">
                            <label for="category">Type</label>
                            <input type="text" class="form-control" id="supplierType-type" required v-model="userInput.type">
                        </div>

                        <div class="form-group">
                            <label for="category">Transaction Days</label>
                            <input type="number" class="form-control" id="supplierType-transaction_days" required  v-model="userInput.transaction_days">
                        </div>

                        

                        <div class="form-group row">
                            <div class="col-md-3 pr-0" v-if="!editMode">
                
                                <span v-if="userInput.type.length < 2 || userInput.transaction_days < 1">
                                    <button type="submit" class="btn btn-sm btn-success disable text-black" disabled>Save</button>
                                </span>
                                <span v-else>
                                    <button type="submit" class="btn btn-sm btn-success" >Save</button>
                                </span>
                            
                            </div>

                            <div class="col-md-3 pr-0" v-else>
                
                                <span v-if="userInput.type.length < 2 || userInput.transaction_days < 1">
                                    <button type="submit" class="btn btn-sm btn-success disable text-black" disabled>Update</button>
                                </span>
                                <span v-else>
                                    <button type="submit" class="btn btn-sm btn-success" >Update</button>
                                </span>
                            
                            </div>

                            <div class="col-md-3 pl-1">
                                <router-link :to="{name: 'Users'}" v-if="!editMode">
                                    <button class="btn btn-sm btn-default">Back</button>     
                                </router-link>
                                <button class="btn btn-sm btn-default" @click="cancelUpdate()" v-else>Cancel</button>     

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
          <th>Type</th>
          <th>Transaction Days</th>
          <!-- <th>Date Created</th> -->
          
          <th class="text-center">Action</th>
        </template>
        
        <template v-slot:tb-data>

          <tr class="hovered" v-for="supplierType in supplierTypes" :key="supplierType.id">
            <td>{{ supplierType.id }}</td>
            <td>{{ supplierType.type }}</td>
            <td>{{ supplierType.transaction_days }}</td>
            <!-- <td>{{ supplierType.created_at }}</td> -->
            <td class="text-center">
                <div class="btn-group setMaxWidth" role="group">   
                    <span id="btnGroupDrop1 mb-1" type="button" class="material-icons btn-block ellipsis" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">more_horiz</span>
                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <button class="dropdown-item text-black mb-1" @click="updateMode(supplierType.id, supplierType.type, supplierType.transaction_days)">
                        <span class="text-warning">Edit</span> 
                    </button>
                    <button class="dropdown-item text-black mb-1"  @click="supplierTypeArchive(supplierType.id)">
                        <span class="text-danger">Delete</span> 
                    </button>
                    </div>
                </div>
            </td> 
        
    

        </tr>
        </template>

        <template v-slot:tb-paginate>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><button class="page-link" @click="changePage(rootSupplierType.prev_page_url, 1)">Previous</button></li>
                    <li class="page-item"><button class="page-link">{{ currentPage }}</button></li>               
                    <li class="page-item"><button class="page-link" @click="changePage(rootSupplierType.next_page_url, 2)">Next</button></li>
                </ul>
            </nav>
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
import {mapState} from 'vuex'
import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'
import {gsap} from 'gsap'

export default {
    components: { Sidebar, Navbar, DataTable, Modal, Loading},
    data(){
       return {
            editId: null,
            editMode: false,
            supplierTypes: [],
            supplierTypeid: 0,
            userInput: {
                type: '',
                transaction_days: '',
                active: true
            },
            isDone: true,
            query: '',
            rootSupplierType: [],
            currentPage: 1,
       }
    },
    created(){
        this.fetchsupplierTypes()
        this.$store.dispatch('setHeaderTitle', null)
    },
    computed:{
        ...mapState([
            'pageResult'
        ])
    },
 
    methods:{
        async changePage(url, action){
            if(url != null){
                await this.$store.dispatch('changePage', [url, action])
                this.supplierTypes = this.pageResult.data.data
                this.rootSupplierType = this.pageResult.data
                this.currentPage = this.pageResult.data.current_page  
            }else{
                await this.$store.dispatch('changePage', [url, action])
            }
                 
        },
        searchData(){
            this.banks = []
            this.isDone = false
            axios.post(`/supplier-types/search`, {
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
                    this.fetchsupplierTypes()
                }else{
                     this.supplierTypes = []
                     
                    holder.forEach(hold=>{
                        this.supplierTypes.push({
                            id: hold.id,
                            type: hold.type.toUpperCase(),
                            transaction_days: hold.transaction_days,
                            created_at: moment(hold.created_at).format('LL')
                        })
                    })        
                } 
                
            }).catch(err=>{
                console.log(err)
            })
        },
        cancelUpdate(){
            this.editMode = false
            this.userInput.id = ''
            this.userInput.type = ''
            this.userInput.transaction_days = ''
        },
        updateMode(id, type, transaction_days){
            console.log(id, type, transaction_days)
            this.editMode = true
            this.editId = id
            this.userInput.type = type
            this.userInput.transaction_days = transaction_days
        },
       
        showEditModal(supplierType_id){
            axios.get(`/supplier-types/${supplierType_id}`).then(res=>{
                let holder = res.data
                this.editsupplierType = holder.data
            })
        },
        supplierTypeArchive(id){
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
                    this.isDone = false
                    axios.post(`/supplier-types/archive/${id}`).then(()=>{
                        this.isDone = true
                        swalWithBootstrapButtons.fire(
                            'Archived!',
                            'Data has been moved to archive.',
                            'success'
                        )
                        this.fetchsupplierTypes()
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

        supplierTypeSave(){
            if(!this.editMode){
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
                        axios.post('/supplier-types', {
                            type: this.userInput.type.toLowerCase(),
                            transaction_days: this.userInput.transaction_days,
                            is_active: true
                        }).then(()=>{
                            this.isDone = true
                            Swal.fire('Saved!', '', 'success')
                            this.fetchsupplierTypes()
                            this.cancelUpdate()
                        }).catch(err=>{
                            let msg = err.response.data.errors
                            this.isDone = true
                            console.log(msg)
                            Swal.fire(msg.type[0], 'Data not Saved', 'warning')
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
                        axios.put(`/supplier-types/${this.editId}`, {
                            type: this.userInput.type.toLowerCase(),
                            transaction_days: this.userInput.transaction_days,
                        }).then(()=>{
                            this.isDone = true
                            Swal.fire('Updated!', '', 'success')
                            this.fetchsupplierTypes()
                            this.cancelUpdate()
                        })
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
            }
            
        },
    
        fetchsupplierTypes(){
            this.supplierTypes = []
            axios.get('/supplier-types?is_active=active')
            .then(response=>{
                let result = response.data
                let holder = result.data

                this.rootSupplierType = holder
                
                holder.data.forEach(hold=>{
                    this.supplierTypes.push({
                        id: hold.id,
                        type: hold.type.toUpperCase(),
                        transaction_days: hold.transaction_days,
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