<template>
  <div id="cr-grid">
    <div class="sidebar-container">
      <Sidebar/>
    </div>
    <div class="main-container">
    <Navbar/>
        <div class="grid-header">
            <div class="row">
                <div class="col-lg-12 p-5">
                    <form @submit.prevent="updateDocument()" autocomplete="off">
                        <div class="form-group row">
                            <div class="col-lg-3">
                                <label for="document"><strong>Document Type Name</strong></label>
                                <input type="text" v-model="data.document_type" class="form-control" id="document">
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-lg-3">
                                <label for="document"><strong>Document Description</strong></label>
                                <textarea v-model="data.document_description" rows="5" class="p-2"></textarea>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <label><strong>Category</strong> <em>(Optional)</em> </label>
                            </div>

                            <div class="col-lg-4 col-md-6 col-sm-12" v-for="cat in category" :key="cat.id">
                                <div class="form-check row">
                                    <input type="checkbox" class="permissions_cb" :id="`cat${cat.id}`" :value="cat.id" v-model="data.categories">
                                    <label :for="`cat${cat.id}`" class="permissions_cb" >&nbsp; {{ cat.name.toUpperCase() }}</label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            
                            <div class="col-lg-1 pr-0">
                                <span v-if="data.document_type && data.document_description">
                                    <button type="submit" class="btn btn-sm btn-success">Update</button>
                                </span>

                                <span v-else>
                                    <button type="submit" class="btn btn-sm btn-success text-black disable" disabled>Update</button>
                                </span>

        
                            </div>

                            <div class="col-lg-1 pl-1">
                                <router-link :to="{name: 'Documents'}">
                                    <button class="btn btn-sm btn-default">Back</button>     
                                </router-link>
                            </div>
                        </div>
                    </form>
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
            category:[],
            data:[]   
        }
    },
    created(){
        
        
        this.$store.dispatch('loadDocuments')
        this.findDocument()
        this.fetchCategory()
       
        
        
    },
    computed:{
        ...mapState([
            
            'documents'
        ])
    },
    methods:{
        fetchCategory(){
            axios.get('/categories/all').then(res=>{
                this.category = res.data
            })
        },
        findDocument(){
            axios.get(`/documents/${this.$route.params.id}`).then(res=>{   
                this.data = res.data[0]  
                
                if(this.data.categories[0] == null){
                    this.data.categories = []
                }
            })
        },
        updateDocument(){
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Update`,
                denyButtonText: `Don't update`,
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    console.log(this.data)
                    Swal.fire('Updated!', '', 'success')
                    axios.put(`/documents/${this.$route.params.id}`, this.data).then(res=>{
                        this.$router.push({name: 'Documents'})   
                    })
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
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


    #updateCat{
        min-width:500px;
    }


    
</style>