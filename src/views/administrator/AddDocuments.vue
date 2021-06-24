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
        
        <div class="grid-header">
            <div class="row">
                <div class="col-lg-12 px-5 mt-3">
                    <form @submit.prevent="addDocument()" autocomplete="off">
                        <div class="form-group row">
                            <div class="col-lg-3">
                                <label for="document"><strong>Document Type Name</strong></label>
                                <input type="text" v-model="document_type" class="form-control" id="document">
                            </div>
                        </div>
                        
                        <div class="form-group row">
                            <div class="col-lg-3">
                                <label for="document"><strong>Document Description</strong></label>
                                <textarea v-model="document_description" rows="5"></textarea>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-lg-12">
                                <label><strong>Category</strong> <em>(Optional)</em> </label>
                            </div>

                            <div class="col-lg-4 col-md-6 col-sm-12" v-for="cat in category" :key="cat.id">
                                <div class="form-check row">
                                    <input type="checkbox" class="permissions_cb" :id="`cat${cat.id}`" :value="cat.id" v-model="categories">
                                    <label :for="`cat${cat.id}`" class="permissions_cb" >&nbsp; {{ cat.name.toUpperCase() }}</label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-lg-1 pr-0">
                                <span v-if="document_type.length > 1 && document_description.length > 3">
                                <button type="submit" class="btn btn-sm btn-success">Save</button>
                                </span>

                                <span v-else>
                                <button type="submit" class="btn btn-sm btn-success disable text-black" disabled>Save</button>
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
            document_type: '',
            document_description: '',
            categories: [],
            category: [],
            isDone: true
        }
    },
    created(){
        
        this.$store.dispatch('loadCategory')
        this.$store.dispatch('loadDocuments')
        this.fetchCategories()
       
        
        
    },
    computed:{
        ...mapState([
           
            'documentType'
        ])
    },
    methods:{
        fetchCategories(){
            axios.get(`/categories?is_active=active`).then(res=>{
                let holder = res.data
                this.category = holder.data
            })
        },
        addDocument(){
            console.log(this.categories)
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Save`,
                denyButtonText: `Don't save`,
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.isDone = false
                    axios.post('/documents', {
                        document_type: this.document_type.toLowerCase(),
                        document_description: this.document_description.toLowerCase(),
                        categories: this.categories,
                        is_active: true
                    }).then(()=>{
                        this.isDone = true
                        Swal.fire('Saved!', '', 'success')
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