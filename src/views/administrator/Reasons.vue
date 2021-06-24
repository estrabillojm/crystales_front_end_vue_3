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
                    <form @submit.prevent="reasonSave()" autocomplete="off">
                        <div class="form-group">
                            <label for="category">Reason</label>
                            <input type="text" class="form-control" id="company-code" v-model="userInput.reason">
                        </div>

                        <div class="form-group">
                            <label for="category">Remarks</label>
                            <input type="text" class="form-control" id="company-description"  v-model="userInput.remarks">
                        </div>

                        

                        <div class="form-group row">
                            <div class="col-md-3 pr-0" v-if="!updateMode">
                                <span v-if="userInput.reason.length < 5 || userInput.remarks.length < 3">
                                    <button type="submit" class="btn btn-sm btn-success disable text-black" disabled>Save</button>
                                </span>
                                <span v-else>
                                    <button type="submit" class="btn btn-sm btn-success" >Save</button>
                                </span>   
                            </div>

                            <div class="col-md-3 pr-0" v-else>
                                <span v-if="userInput.reason.length < 5 || userInput.remarks.length < 3">
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
          <th>Reason</th>
          <th>Remarks</th>
          <!-- <th>Date Created</th> -->
          
          <th class="text-center">Action</th>
        </template>
        
        <template v-slot:tb-data>
          <tr class="hovered" v-for="reason in reasons" :key="reason.id">
            <td>{{ reason.id }}</td>
            <td>{{ reason.reason }}</td>
            <td>{{ reason.remarks }}</td>
            <!-- <td>{{ company.created_at }}</td> -->
            <td class="text-center">
                <button class="btn btn-sm btn-info" data-toggle="modal" data-target="#myModal" @click="editMode(reason.id, reason.reason, reason.remarks)">Edit</button>
                <button class="btn btn-sm btn-warning ml-1" @click="reasonArchive(reason.id)">Archive</button>
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
           reasons: [],
           companyid: null,
           userInput: {
               reason: '',
               remarks: '',
               active: true
           },
           isDone: true,
           query: ''
       }
    },
    created(){
        this.fetchReasons()
        
    },
 
    methods:{
        searchData(){
            this.isDone = false
            axios.post(`/reasons/search`, {
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
                    this.reasons = []
                     
                    holder.forEach(hold=>{
                        this.reasons.push({
                            id: hold.id,
                            reason: hold.reason.toUpperCase(),
                            remarks: hold.remarks.toUpperCase(),
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
            this.userInput.reason = ''
            this.userInput.remarks = ''
        },
        editMode(id, reason, remarks){
            console.log("reason", id, reason, remarks)
            this.updateMode = true
            this.companyid = id
            this.userInput.reason = reason
            this.userInput.remarks = remarks

        },

        showEditModal(company_id){
            axios.get(`/reasons/${company_id}`).then(res=>{
                let holder = res.data
                this.editReason = holder.data
            })
        },
        reasonArchive(id){

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
                    axios.post(`/reasons/archive/${id}`).then(()=>{
                        this.isDone = true
                        swalWithBootstrapButtons.fire(
                            'Archived!',
                            'Data has been moved to archive.',
                            'success'
                        )
                        this.fetchReasons()
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

        reasonSave(){
            // CHECK IF IT IS IN EDITING MODE
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
                        axios.post('/reasons', {
                            reason: this.userInput.reason.toLowerCase(),
                            remarks: this.userInput.remarks.toLowerCase(),
                            is_active: 1
                        }).then(()=>{
                            this.isDone = true
                            Swal.fire('Saved!', '', 'success')
                            this.fetchReasons()
                            this.userInput.reason = ''
                            this.userInput.remarks = '' 
                        }).catch(err=>{
                            let msg = err.response.data.errors
                            this.isDone = true
                            Swal.fire(msg.reason[0], 'Data not Saved', 'warning')
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
                        axios.put(`/reasons/${this.companyid}`, {
                            reason: this.userInput.reason.toLowerCase(),
                            remarks: this.userInput.remarks.toLowerCase(),
                        }).then(()=>{
                            this.isDone = true
                            Swal.fire('Updated!', '', 'success')
                            this.fetchReasons()
                            this.cancelEdit()
                        }).catch(err=>{
                            let msg = err.response.data.errors
                            this.isDone = true
                            Swal.fire(msg.reason[0], 'Data not Updated', 'warning')
                        })
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
            }            
        },
    
        fetchReasons(){
            this.reasons = []
            axios.get('/reasons?is_active=active')
            .then(response=>{
                let result = response.data
                let holder = result.data
                console.log(holder.data)
                
                holder.data.forEach(hold=>{
                    this.reasons.push({
                        id: hold.id,
                        reason: hold.reason.toUpperCase(),
                        remarks: hold.remarks.toUpperCase(),
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