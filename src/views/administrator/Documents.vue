<template>
  <div id="cr-grid">
    <div class="sidebar-container">
      <Sidebar/>
    </div>
    <div class="main-container">
    <Navbar/>
        <div class="grid-header p-0">

           
            <div class="row">

               
                <div class="col-lg-12">
                    <DataTable>

                        <template v-slot:tb-extra-btn>
                        
                            <router-link :to="{name: 'AddDocuments'}">
                        
                                <button class="btn btn-success mb-1" type="button">New Document</button>
                            </router-link>
                        </template>
                                    
                        <template v-slot:tb-btn-tab>
                        
                                    
                        </template>


                        <template v-slot:tb-search>
                            <input type="text" @keyup.enter="searchData()" v-model="query" placeholder="Search">
                        </template>
                        <template v-slot:tb-header>
                        <th>ID</th>
                        <th>Document Type</th>
                        <th>Document Description</th>
                        <th class="text-center">Action</th>
                        </template>
                        
                        <template v-slot:tb-data>

                        <tr v-for="dt in documents" :key="dt.id" class="hovered">
                            <td>{{ dt.document_id }}</td>
                            <td>{{ dt.document_type.toUpperCase() }}</td>
                            <td>{{ dt.document_description.toUpperCase() }}</td>
                            <td class="text-center">
                                <div class="btn-group setMaxWidth" role="group">   
                                    <span id="btnGroupDrop1 mb-1" type="button" class="material-icons btn-block ellipsis" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">more_horiz</span>
                                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                    <button class="dropdown-item text-black mb-1" @click="editPage(dt.document_id)">
                                        <span class="text-warning">Edit</span> 
                                    </button>
                                    <button class="dropdown-item text-black mb-1" @click="archiveDocument(dt.document_id)">
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
                                    <li class="page-item"><button class="page-link">Previous</button></li>
                                    <!-- <li class="page-item"><button class="page-link" @click="changePage(rootDocument.prev_page_url, 1)">Previous</button></li> -->
                                    <li class="page-item"><button class="page-link">{{ currentPage }}</button></li>               
                                    <li class="page-item"><button class="page-link">Next</button></li>
                                    <!-- <li class="page-item"><button class="page-link" @click="changePage(rootDocument.next_page_url, 2)">Next</button></li> -->
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
import Swal from 'sweetalert2'
import {gsap} from 'gsap'

export default {
    components: { Sidebar, Navbar, DataTable, Modal, Loading},
    data(){
        return {
            document_type: '',
            document_description: '',
            categories: [],
            query: '',      
            rootDocument: [],
            currentPage: 1,
        }
    },
    created(){
        
        this.$store.dispatch('loadCategory')
        this.$store.dispatch('loadDocuments')
        this.$store.dispatch('setHeaderTitle', null)
    },
    computed:{
        ...mapState([
            'category',
            'documents'
        ])
    },
    methods:{
        editPage(docId){
            this.$router.push({name: 'EditDocuments', params: {id: docId}})
        },
        searchData(){
            axios.post(`/documents/search`, {
                value: this.query
            })
            .then( res => {
                console.log(res.data)
                // this.documents = res.data
                
            })
            .catch(err=>{
                console.log(err)
            })
        },
        archiveDocument(val){

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
                swalWithBootstrapButtons.fire(
                    'Archived!',
                    'Data has been moved to archive.',
                    'success'
                )

                //the new
                axios.post(`/documents/archive/${val}`).then((res)=>{
                    console.log(res)
                    this.$store.dispatch('loadDocuments')
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
    .text-black{
        color:black;
    }
 
    
</style>