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
        <div class="grid-header m5 custom-container">
            
            
            <div class="row">
                <div class="col-md-4 pl-4 mt-2">
                    
                    <form @submit.prevent="addCategory()" autocomplete="off">
                        <div class="form-group">
                            <label for="category">Category Name</label>
                            <input type="text" v-model="category_name" class="form-control" id="category">
                        </div>

                        <div class="form-group row">
                            <div class="col-md-3 pr-0" v-if="!updateForm">
                                <span v-if="category_name.length > 2">
                                <button type="submit" class="btn btn-sm btn-success">Save</button>
                                </span>

                                <span v-else>
                                <button type="submit" class="btn btn-sm btn-success" disabled>Save</button>
                                </span>
                            </div>

                            <div class="col-md-3 pr-0" v-else>
                                <span v-if="category_name.length > 2">
                                <button type="submit" class="btn btn-sm btn-success">Update</button>
                                </span>

                                <span v-else>
                                <button type="submit" class="btn btn-sm btn-success" disabled>Update</button>
                                </span>
                            </div>

                            <div class="col-md-3 pl-1">
                                <router-link :to="{name: 'Users'}" v-if="!updateForm">
                                    <button class="btn btn-sm btn-default">Back</button>     
                                </router-link>
                                <button type="button" @click="saveMode()" class="btn btn-sm btn-default" v-else>Cancel</button>     
                                
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
          <th>Category Name</th>
         
          
          <th class="text-center">Action</th>
        </template>
        
        <template v-slot:tb-data>

          
          <p class="text-white">{{ categories }}</p>
          <tr v-for="cat in category.data" :key="cat.id" class="hovered">
            <td>{{ cat.id }}</td>
            <td>{{ cat.name.toUpperCase() }}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-info" data-toggle="modal" :data-target="`#myModal${cat.id}`"  @click="editMode(cat.id, cat.name)">Edit</button>
                <button class="btn btn-sm btn-warning ml-1" @click="archivePrm(cat.id)">Archive</button>
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
import Swal from 'sweetalert2'
import {gsap} from 'gsap'

export default {
    components: { Sidebar, Navbar, DataTable, Modal, Loading},
    data(){
        return {
            update_id: null,
            category_name: '',
            updateName: '',
            category: '',
            updateForm: false,
            isDone: true
        }
    },
    created(){
        this.paginateCategory()  
    },
    computed:{
        
    },
    methods:{
        searchData(){
            this.isDone = false
            axios.post(`/categories/search`, {
                value: this.query.toLowerCase()
            }).then(res=>{
                this.isDone = true
                this.category = res.data
                if(this.category.error_message == 'Data Not Found'){
                    Swal.fire({
                        icon: 'error',
                        title: '404',
                        text: 'Data not Found'
                        
                    })
                    this.paginateCategory()
                }
                
            }).catch(err=>{
                
            })
        },
        saveMode(){
            this.updateForm = false
            this.category_name = ''
            this.update_id = ''
        },
        editMode(id, name){
            this.updateForm = true
            this.update_id = id
            this.category_name = name
        },
        paginateCategory(){
            axios.get('/categories?is_active=active').then(res=>{
                this.category = res.data
                
            })
        },
        updateCategory(val){
            
        },
        addCategory(){
            if(!this.updateForm){

            
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
                        axios.post('/categories', {
                            name: this.category_name.toLowerCase(),
                            is_active: 1
                            }).then(()=>{
                            this.isDone = true
                            Swal.fire('Saved!', '', 'success')
                            console.log('Data Saved')
                            this.paginateCategory()  
                            this.category_name = ""
                            this.saveMode()

                        }).catch(err=>{
                            let msg = err.response.data.errors
                            this.isDone = true
                            console.log(msg)
                            Swal.fire(msg.error_message[0], 'Data not Saved', 'warning')
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
                        axios.put(`/categories/${this.update_id}`, {
                            name: this.category_name.toLowerCase(),
                        }).then(()=>{
                            this.isDone = true
                            Swal.fire('Updated!', '', 'success')
                            this.paginateCategory()  
                            this.updateName = ""
                            this.saveMode()
                        }).catch(err=>{
                            let msg = err.response.data.errors
                            this.isDone = true
                            console.log(msg)
                            Swal.fire(msg.name[0], 'Data not Updated', 'warning')
                        })
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
            }
            
        },
        archivePrm(val){
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

                

                axios.post(`/categories/archive/${val}`).then(()=>{
                    this.isDone = true 
                    swalWithBootstrapButtons.fire(
                        'Archived!',
                        'Data has been moved to archive.',
                        'success'
                    )
                    this.paginateCategory()
                })
        
                } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
                ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Data not remove',
                    'error'
                )
                }
            })
        }
    }

}
    
</script>



<style scoped>

      @import '../../assets/css/loader.css';


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