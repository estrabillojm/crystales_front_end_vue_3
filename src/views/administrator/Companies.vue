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
                    <form @submit.prevent="companySave()" autocomplete="off">
                        <div class="form-group">
                            <label for="category">Company Code</label>
                            <input type="number" class="form-control" id="company-code" v-model="userInput.code">
                        </div>

                        <div class="form-group">
                            <label for="category">Company Description</label>
                            <input type="text" class="form-control" id="company-description"  v-model="userInput.description">
                        </div>

                        

                        <div class="form-group row">
                            <div class="col-md-3 pr-0" v-if="!editMode">
                
                                <span v-if="userInput.code < 1 || userInput.description.length < 3">
                                    <button type="submit" class="btn btn-sm btn-success disable text-black" disabled>Save</button>
                                </span>
                                <span v-else>
                                    <button type="submit" class="btn btn-sm btn-success" >Save</button>
                                </span>
                            
                            </div>

                            <div class="col-md-3 pr-0" v-else>
                
                                <span v-if="userInput.code < 1 || userInput.description.length < 3">
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
          <th>Code</th>
          <th>Company</th>
          <!-- <th>Date Created</th> -->
          
          <th class="text-center">Action</th>
        </template>
        
        <template v-slot:tb-data>

          <tr class="hovered" v-for="company in companies" :key="company.id">
            <td>{{ company.id }}</td>
            <td>{{ company.company_code }}</td>
            <td>{{ company.company_description }}</td>
            <!-- <td>{{ company.created_at }}</td> -->
            <td class="text-center">
                <div class="btn-group setMaxWidth" role="group">   
                    <span id="btnGroupDrop1 mb-1" type="button" class="material-icons btn-block ellipsis" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">more_horiz</span>
                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <button class="dropdown-item text-black mb-1" @click="updateMode(company.id, company.company_code, company.company_description)">
                        <span class="text-warning">Edit</span> 
                    </button>
                    <button class="dropdown-item text-black mb-1" @click="companyArchive(company.id)">
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
                    <li class="page-item"><button class="page-link" @click="changePage(rootCompany.prev_page_url, 1)">Previous</button></li>
                    <li class="page-item"><button class="page-link">{{ currentPage }}</button></li>               
                    <li class="page-item"><button class="page-link" @click="changePage(rootCompany.next_page_url, 2)">Next</button></li>
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
            query: '',
            editId: null,
            editMode: false,
            editCompany: [],
            companies: [],
            companyid: 0,
            userInput: {
                code: '',
                description: '',
                active: true
            },
            isDone: true,
            currentPage: 1,
            query: null,
            rootCompany: null
       }
    },
    computed:{
        ...mapState([
            'pageResult'
        ])
    },
    created(){
        this.fetchCompanies()
        this.$store.dispatch('setHeaderTitle', null)

    },
 
    methods:{
        async changePage(url, action){
            


            if(url != null){
                await this.$store.dispatch('changePage', [url, action])
                this.companies = this.pageResult.data.data
                this.rootCompany = this.pageResult.data
                this.currentPage = this.pageResult.data.current_page  
            }else{
                await this.$store.dispatch('changePage', [url, action])
            }
            
                
         
              
        },
        searchData(){
            this.companies = []
            this.isDone = false
            axios.post('/companies/search',{
                value: this.query.toLowerCase()
            })
            .then(response=>{
                this.isDone = true
                let result = response.data
                let holder = result.data
                
                if(holder.length == 0){
                    Swal.fire({
                        icon: 'error',
                        title: '404',
                        text: 'Data not Found'
                        
                    })
                    this.fetchCompanies()
                    
                }else{
                    holder.forEach(hold=>{
                        this.companies.push({
                            id: hold.id,
                            company_code: hold.company_code,
                            company_description: hold.company_description.toUpperCase(),
                            created_at: moment(hold.created_at).format('LL')
                        })
                    })    
                }    
            })
            .catch(error => {
                console.log(error)
            })
        },
        cancelUpdate(){
            this.editMode = false
            this.userInput.id = ''
            this.userInput.code = ''
            this.userInput.description = ''
        },
        updateMode(id, code, description){
            this.editMode = true
            this.editId = id
            this.userInput.code = code
            this.userInput.description = description
        },
        updateCompany(){
            let company_id = this.editCompany.id
            axios.put(`/companies/${company_id}`, {
                company_code: this.editCompany.company_code,
                company_description: this.editCompany.company_description,
            }).then(()=>{
                this.fetchCompanies()
                $(`#myModal`).modal('toggle')

            })
        },
        showEditModal(company_id){
            axios.get(`/companies/${company_id}`).then(res=>{
                let holder = res.data
                this.editCompany = holder.data
            })
        },
        companyArchive(id){
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
                    axios.post(`/companies/archive/${id}`).then(()=>{

                        this.isDone = true
                        swalWithBootstrapButtons.fire(
                            'Archived!',
                            'Data has been moved to archive.',
                            'success'
                        )
                        this.fetchCompanies()
                        console.log('deleted')
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

        companySave(){
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
                        axios.post('/companies', {
                            company_code: this.userInput.code.toLowerCase(),
                            company_description: this.userInput.description.toLowerCase(),
                            is_active: true
                        }).then(()=>{
                            this.isDone = true
                            Swal.fire('Saved!', '', 'success')  
                            this.fetchCompanies()
                            this.userInput.code = ''
                            this.userInput.description = '' 
                        }).catch(err=>{
                            let msg = err.response.data.errors
                            this.isDone = true
                            Swal.fire(msg.company_code[0], 'Data not Saved', 'warning')
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
                        axios.put(`/companies/${this.editId}`, {
                            company_code: this.userInput.code.toLowerCase(),
                            company_description: this.userInput.description.toLowerCase()
                        }).then(()=>{
                            this.isDone = true
                            Swal.fire('Updated!', '', 'success')
                            this.fetchCompanies()
                            this.userInput.code = ''
                            this.userInput.description = '' 
                            this.editMode = false

                        }).catch(err=>{
                            let msg = err.response.data.errors
                            this.isDone = true
                            Swal.fire(msg.company_code[0], '', 'warning')
                        })
                        
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })                
            }
            
        },
    
        fetchCompanies(){
            this.companies = []
            axios.get('/companies?page=1')
            .then(response=>{
                let result = response.data
                let holder = result.data
                this.rootCompany = result.data

                console.log(this.rootCompany)
                
                holder.data.forEach(hold=>{
                    this.companies.push({
                        id: hold.id,
                        company_code: hold.company_code,
                        company_description: hold.company_description.toUpperCase(),
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