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
                    <form @submit.prevent="refsave()" autocomplete="off">
                        <div class="form-group">
                            <label for="category">Type</label>
                            <input type="text" class="form-control" id="company-code" v-model="userInput.type">
                        </div>

                        <div class="form-group">
                            <label for="category">Description</label>
                            <input type="text" class="form-control" id="company-description"  v-model="userInput.description">
                        </div>

                        

                        <div class="form-group row">
                            <div class="col-md-3 pr-0" v-if="!updateMode">
                                <span v-if="userInput.type.length < 2 || userInput.description.length < 3">
                                    <button type="submit" class="btn btn-sm btn-success disable text-black" disabled>Save</button>
                                </span>
                                <span v-else>
                                    <button type="submit" class="btn btn-sm btn-success" >Save</button>
                                </span>   
                            </div>

                            <div class="col-md-3 pr-0" v-else>
                                <span v-if="userInput.type.length < 2 || userInput.description.length < 3">
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
          <th>Referrence Type</th>
          <th>Description</th>
          <!-- <th>Date Created</th> -->
          
          <th class="text-center">Action</th>
        </template>
        
        <template v-slot:tb-data>
          <tr class="hovered" v-for="ref in refs" :key="ref.id">
            <td>{{ ref.id }}</td>
            <td>{{ ref.type }}</td>
            <td>{{ ref.description }}</td>
            <!-- <td>{{ company.created_at }}</td> -->
            <td class="text-center">
                <button class="btn btn-sm btn-info" data-toggle="modal" data-target="#myModal" @click="editMode(ref.id, ref.type, ref.description)">Edit</button>
                <button class="btn btn-sm btn-warning ml-1" @click="refArchive(ref.id)">Archive</button>
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
import {mapState} from 'vuex'
import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'
import {gsap} from 'gsap'

export default {
    components: { Sidebar, Navbar, DataTable, Modal, Loading},
    data(){
       return {
            updateMode: false,
            refs: [],
            referenceid: null,
            userInput: {
               type: '',
               description: '',
               active: true
            },
            isDone: true,
            query: ''
       }
    },
    created(){
        this.fetchrefs()
    },
 
    methods:{
        searchData(){
            this.refs = []
            this.isDone = false
            axios.post(`/referrences/search`, {
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
                    this.fetchrefs()
                    
                }else{
                    holder.forEach(hold=>{
                        this.refs.push({
                            id: hold.id,
                            type: hold.referrence_type,
                            description: hold.referrence_description.toUpperCase(),
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
            this.referenceid = null
            this.userInput.type = ''
            this.userInput.description = ''
        },
        editMode(id, ref, type){
            console.log("ref", id, ref, type)
            this.updateMode = true
            this.referenceid = id
            this.userInput.type = ref
            this.userInput.description = type

        },

        showEditModal(company_id){
            axios.get(`/referrences/${company_id}`).then(res=>{
                let holder = res.data
                this.editref = holder.data
            })
        },
        refArchive(id){

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
                axios.post(`/referrences/archive/${id}`).then(()=>{
                    this.isDone = true
                    swalWithBootstrapButtons.fire(
                        'Archived!',
                        'Data has been moved to archive.',
                        'success'
                    )
                    this.fetchrefs()
                    this.cancelEdit()
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

        refsave(){
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
                        axios.post('/referrences', {
                            referrence_type: this.userInput.type.toLowerCase(),
                            referrence_description: this.userInput.description.toLowerCase(),
                            is_active: true
                        }).then(()=>{
                            this.isDone = true
                            Swal.fire('Saved!', '', 'success')
                            this.fetchrefs()
                            this.userInput.type = ''
                            this.userInput.description = '' 
                        }).catch(err=>{
                            let msg = err.response.data.errors
                            this.isDone = true
                            Swal.fire(msg.referrence_type[0], 'Data not Saved', 'warning')
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
                        axios.put(`/referrences/${this.referenceid}`, {
                            referrence_type: this.userInput.type.toLowerCase(),
                            referrence_description: this.userInput.description.toLowerCase(),
                        }).then(()=>{
                            this.isDone = true
                            Swal.fire('Updated!', '', 'success')
                            this.fetchrefs()
                            this.cancelEdit()
                        }).catch(err=>{
                            let msg = err.response.data.errors
                            this.isDone = true
                            Swal.fire(msg.referrence_type[0], 'Data not Updated', 'warning')
                        })
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
            }    
                
          
        },
    
        fetchrefs(){
            this.refs = []
            axios.get('/referrences?is_active=active')
            .then(response=>{
                let result = response.data
                console.log(result)
                let holder = result.data
                
                
                holder.data.forEach(hold=>{
                    this.refs.push({
                        id: hold.id,
                        type: hold.referrence_type,
                        description: hold.referrence_description.toUpperCase(),
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