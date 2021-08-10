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
                    <form @submit.prevent="bankSave()" autocomplete="off">
                        <div class="form-group">
                            <label for="category">Bank Code</label>
                            <input type="text" class="form-control" id="bank-code" v-model="userInput.bank_code">
                        </div>

                        <div class="form-group">
                            <label for="category">Bank Name <em>(e.g BDO - Sindalan)</em></label>
                            <input type="text" class="form-control" id="bank-name"  v-model="userInput.bank_name">
                        </div>

                        <div class="form-group">
                            <label for="category">Bank Account</label>
                            <input type="text" class="form-control" id="bank-account"  v-model="userInput.bank_account">
                        </div>
                           
                        <div class="form-group">
                            <label for="category">Bank Location</label>
                            <textarea name="" id="bank-location" class="p-1" rows="4" v-model="userInput.bank_location"></textarea>
                        </div>

                        

                        <div class="form-group row">
                            <div class="col-md-3 pr-0" v-if="!updateMode">
                                <span v-if="userInput.bank_code.length < 3 || userInput.bank_name.length < 2 || userInput.bank_account.length < 5 || userInput.bank_location.length < 5">
                                    <button type="submit" class="btn btn-sm btn-success disable text-black" disabled>Save</button>
                                </span>
                                <span v-else>
                                    <button type="submit" class="btn btn-sm btn-success" >Save</button>
                                </span>
                            </div>
                            <div class="col-md-3 pr-0" v-else>
                                <span v-if="userInput.bank_code.length < 3 || userInput.bank_name.length < 2 || userInput.bank_account.length < 5 || userInput.bank_location.length < 5">
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
          <th>Account #</th>
          <!-- <th>Date Created</th> -->
          
          <th class="text-center">Action</th>
        </template>
        
        <template v-slot:tb-data>
          <tr class="hovered" v-for="bank in banks" :key="bank.id">
            <td>{{ bank.id }}</td>
            <td>{{ bank.bank_code }}</td>
            <td>{{ bank.bank_name }}</td>
            <td>{{ bank.bank_account }}</td>
            <!-- <td>{{ company.created_at }}</td> -->
            <td class="text-center">
                <div class="btn-group setMaxWidth" role="group">   
                    <span id="btnGroupDrop1 mb-1" type="button" class="material-icons btn-block ellipsis" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">more_horiz</span>
                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <button class="dropdown-item text-black mb-1" @click="editMode(bank.id, bank.bank_code, bank.bank_name, bank.bank_account, bank.bank_location)">
                        <span class="text-warning">Edit</span> 
                    </button>
                    <button class="dropdown-item text-black mb-1" @click="bankArchive(bank.id)">
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
                    <li class="page-item"><button class="page-link" @click="changePage(rootBank.prev_page_url, 1)">Previous</button></li>
                    <li class="page-item"><button class="page-link">{{ currentPage }}</button></li>               
                    <li class="page-item"><button class="page-link" @click="changePage(rootBank.next_page_url, 2)">Next</button></li>
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
            updateMode: false,
            banks: [],
            companyid: null,
            userInput: {
                bank_code: '',
                bank_name: '',
                bank_account: '',
                bank_location: '',
                active: true
            },
            isDone: true,
            query: '',
            rootBank: [],
            currentPage: 1,
       }
    },
    created(){
        this.fetchBanks()
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
                this.banks = this.pageResult.data.data
                this.rootBank = this.pageResult.data
                this.currentPage = this.pageResult.data.current_page         
            }else{
                await this.$store.dispatch('changePage', [url, action])
            }

    
        },
        searchData(){
            this.banks = []
            this.isDone = false
            axios.post(`/banks/search`, {
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
                    this.fetchBanks()
                    
                    
                }else{
                    this.reasons = []
                     
                    holder.forEach(hold=>{
                        this.banks.push({
                            id: hold.id,
                            bank_name: hold.bank_name.toUpperCase(),
                            bank_code: hold.bank_code,
                            bank_account: hold.bank_account,
                            bank_location: hold.bank_location.toUpperCase(),
                            created_at: moment(hold.created_at).format('LL')
                        })
    
                    })        
                } 
                
            }).catch(err=>{
                console.log(err)
            })
        },
        cancelEdit(){
            this.updateMode = false
            this.companyid = null
            this.userInput.bank_code = ''
            this.userInput.bank_name = ''
            this.userInput.bank_account = ''
            this.userInput.bank_location = ''
        },
        editMode(id, code, name, account, location){
            console.log(id, code, name, account, location)
            this.updateMode = true
            this.companyid = id
            this.userInput.bank_code = code
            this.userInput.bank_name = name
            this.userInput.bank_account = account
            this.userInput.bank_location = location

        },
        showEditModal(company_id){
            axios.get(`/banks/${company_id}`).then(res=>{
                let holder = res.data
                this.editBank = holder.data
            })
        },
        bankArchive(id){
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
                    axios.post(`/banks/archive/${id}`).then(()=>{
                        this.isDone = true
                        swalWithBootstrapButtons.fire(
                            'Archived!',
                            'Data has been moved to archive.',
                            'success'
                        )
                        this.fetchBanks()
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

        bankSave(){
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
                        axios.post('/banks', {
                            bank_code: this.userInput.bank_code.toLowerCase(),
                            bank_name: this.userInput.bank_name.toLowerCase(),
                            bank_account: this.userInput.bank_account.toLowerCase(),
                            bank_location: this.userInput.bank_location.toLowerCase(),
                            is_active: true
                        }).then(()=>{
                            this.isDone = true
                            Swal.fire('Saved!', '', 'success')
                            this.fetchBanks()
                            this.cancelEdit()
                        }).catch(err=>{

                            let msg = {
                                bank_account: [],
                                bank_code: [],
                                bank_name: [],
                            }
                            msg = err.response.data.errors
                            let error = ""
                            console.log(msg)
                            
                            if(msg.bank_account){
                                error = msg.bank_account[0]
                            }
                            
                            if(msg.bank_code){
                                error = msg.bank_code[0]
                            }
                            
                            if(msg.bank_name){
                                error = msg.bank_name[0]
                            }
                            this.isDone = true
                            Swal.fire(error, 'Data not Saved', 'warning')
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
                        axios.put(`/banks/${this.companyid}`, {
                            
                            bank_code: this.userInput.bank_code.toLowerCase(),
                            bank_name: this.userInput.bank_name.toLowerCase(),
                            bank_account: this.userInput.bank_account.toLowerCase(),
                            bank_location: this.userInput.bank_location.toLowerCase()
                        }).then(()=>{
                            this.isDone = true
                            Swal.fire('Updated!', '', 'success')
                            this.fetchBanks()
                            this.cancelEdit()
                        }).catch(err=>{
                            let msg = {
                                bank_account: [],
                                bank_code: [],
                                bank_name: [],
                            }
                            msg = err.response.data.errors
                            let error = ""
                            console.log(msg)
                            
                            if(msg.bank_account){
                                error = msg.bank_account[0]
                            }
                            
                            if(msg.bank_code){
                                error = msg.bank_code[0]
                            }
                            
                            if(msg.bank_name){
                                error = msg.bank_name[0]
                            }
                            this.isDone = true
                            Swal.fire(error, 'Data not Updated', 'warning')
                        })
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
                
            }
        },
    
        fetchBanks(){
            this.banks = []
            axios.get('/banks?is_active=active')
            .then(response=>{
                let result = response.data
                let holder = result.data
                console.log(holder)
                this.rootBank = holder

                
                holder.data.forEach(hold=>{
                    this.banks.push({
                        id: hold.id,
                        bank_name: hold.bank_name.toUpperCase(),
                        bank_code: hold.bank_code,
                        bank_account: hold.bank_account,
                        bank_location: hold.bank_location.toUpperCase(),
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