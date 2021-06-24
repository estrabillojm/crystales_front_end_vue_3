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

    <div class="grid-container">
       
        <div class="auser add-user">
            
          
            <form @submit.prevent="userSubmit()">
                <div class="form-group row fg mt-3">
                    <!-- <div class="col-md-6">
                        <label for="#"><strong>ID Prefix</strong></label>    
                        <select class="form-control" v-model="prefixId">
                            <option value="">Select ID Prefix</option>
                            <option value="rdfflfi">RDFFLFI</option>
                            <option value="o+">O+</option>
                        </select>                    
                    </div> -->
                    
                    <div class="col-md-6">
                        <label for="#"><strong>Employee ID</strong></label>
                        <input type="text" @keypress.enter.prevent="apiSearch()" v-model="employeeId" class="form-control">                        
                        <!-- <span>
                            <p class="text-success text-alert">Employee Available</p>
                        </span>
                        <span>
                            <p class="text-danger">ID # already registered </p>
                        </span>

                        <span>
                            <p class="text-danger">ID #  Not Found</p>
                        </span> -->
                    </div>

                    <div class="col-md-6">
                        <label for="#"><strong>Username</strong></label>
                        
                        <input type="text" v-model="username" class="employeeId form-control mb-1"> 
                        
                    </div>
                    

                </div>
                
                <div class="form-group fg">
                    <label for="#"><strong>Role</strong></label>
                    <select class="form-control" v-model="role" @change="changeRole()">
                        <option value="">Select Role</option>
                        <option v-for="role in roles" :value="role.name" :key="role.id">
                            {{ role.name }}
                        </option>
                    </select>
                </div>
                
               <span>
                <transition tag="div" name="priv" appear class="fg" v-if="role != '' && role != 'Administrator'">
                 
                    <div id="grid-priv">
                        
                        
                            <div class="header mb-2">
                                <p><strong>Privilege</strong></p>
                            </div>
                        
                        
                        
                        <transition-group name="privilege-animate" appear class="mt-2 privilege">
                            <span v-for="pn in permissions" :key="pn.id" :class="`pn${pn.id}`">
                                <input type="checkbox" class="document_cb mr-2" :value="pn.name" v-model="privilege" :id="`pn${pn.id}`" @change="checkPermission()">
                                <label :for="`pn${pn.id}`">{{ pn.name }}</label> 
                            </span>
                        </transition-group>

                    </div>
                </transition>
                </span>
                
               

                <span v-if="btnSubmit && role != ''">
                    <button type="submit" class="btn btn-sm btn-primary mt-4">Sign Up</button>
                </span>

                <span v-else> 
                    <button type="submit" class="btn btn-sm btn-primary mt-4 ml-1 disable text-dark" disabled>Sign Up</button>
                </span>
            


                <router-link :to="{name: 'Users'}">
                    <button class="btn btn-sm btn-default mt-4 ml-1" title="Back to User Masterlist">Cancel</button>
                </router-link>
                 
                <div class="form-group">
                </div>
            </form>
        </div>
                   



        <div class="grid-header">
            
            <div class="auser user-info" v-if="result">
                <div class="col-md-12 mt-3 row">                   
                    <transition tag="div" class="col-md-12" name="header-info" appear mode="out-in">
                        <h3 class="children">
                            <span id="last_name">{{ result.last_name.toUpperCase() }}</span>, 
                            <span id="first_name">{{ result.first_name.toUpperCase() }}</span>{{ " "}}
                            <span> {{ result.middle_name[0].toUpperCase() }}</span>.
                        </h3>
                    </transition>

                    
                    <div class="col-md-12 auser-address">
                        <transition  tag="span" name="headersub" appear mode="out-in">
                            <span>
                                <p><strong>ID Prefix : </strong>{{ result.prefix_id }}</p>
                                <br>
                                <p><strong>Employee ID : </strong>{{ result.id_number }}</p>
                                <br>
                                <p><strong>Department : </strong>{{ result.department }}</p>
                                <br>
                        
                                <p><strong>Position : </strong>{{ result.position }}</p>
                                <br>
                                <hr>
                            </span>
                        </transition>

                                           
                       
                        <span v-if="taggingOfRequest">
                            <transition-group  tag="span" name="header-info" appear mode="out-in" class="row">
                                <div class="col-md-12 mb-3 childr-1">
                                    <p><strong>Document Types</strong> <em>(For Tagging of Request)</em> </p>
                                </div>
                                
                                
                                <div :class="`col-lg-6 col-md-6 dt${dt.id}`" v-for="dt in documents" :key="dt.id">
                                    <input type="checkbox" :id="`dt${dt.document_id}`" @change="checkDocumentType(dt.document_id, dt.document_type)">&nbsp;
                                    <label :for="`dt${dt.document_id}`">{{ dt.document_type }}</label>
                                </div>      
                            </transition-group>

                            <transition-group tag="div" name="card-animate" appear mode="out-in" id="category-box">
                                
                                
                                    <div v-for="st in selectionTagging" :key="st.id" :class="`st${st.id}`">
                                        <div class="mt-3 header-cat">
                                            <p class="col-md-12 header-cat-text hc"><strong>{{ st.name }} Category <br></strong></p>



                                            <div>
                                                <span v-for="category in categories" :key="category.id">  
                                                    <span v-for="(cat, index) in st.categories" :key="index">
                                                        
                                                        <span v-if="cat == category.id" class="row mod-row">  
                                                            <span class="ml-4">                         
                                                                <input type="checkbox" :id="`${category.id}${st.id}`" @change="selectCategory(st.id, category.id, category.name)"> &nbsp;
                                                                <label :for="`${category.id}${st.id}`">{{ category.name }}</label>  
                                                            </span>  
                                                        </span>
                                                    </span>                                                   
                                                </span>
                                            </div>
                                        </div>
                                        
                                        
                                        
                                        
                                    </div>
                                
                            </transition-group>

                    
                        </span>
                    </div>
                </div>
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

import {createLogger, mapState} from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import {gsap} from 'gsap'



export default {
    components: { Sidebar, Navbar, DataTable, Modal, Loading},
    data(){
        return {
            employeeId: '',
            prefixId: '',
            result:null,
            role: '',
            privilege: [],
            btnSubmit: false,
            taggingOfRequest: false,
            selectionTagging: [],
            categories: null,
            selectedCategory: [],
            documentHolder: [],
            categoryHolder: [],
            holder2: [],
            isDone: true
            
        }       
    },
    created(){ 
        this.$store.dispatch('loadPermissions')
        this.$store.dispatch('loadDocuments')   
        this.fetchCategories()
        
    },
    computed:{
        ...mapState([
            'api',
            'permissions',
            'roles',
            'documents'
            
        ])
        
    },
    methods:{
        userSubmit(){
            

            



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
                        axios.post(`/users`, {
                            id_prefix: "RDFFLFI",
                            id_no: this.result.id_number,
                            role: this.role,
                            first_name: this.result.first_name,
                            middle_name: this.result.middle_name,
                            last_name: this.result.last_name,
                            suffix: null,
                            department: this.result.department,
                            position: this.result.position,
                            permissions: this.privilege,
                            document_types: this.selectionTagging,
                            username: this.username.toLowerCase(),
                            password: this.username.toLowerCase(),
                            password_confirmation: this.username.toLowerCase(),
                            is_active: 1
                        }).then(()=>{
                            this.isDone = true
                            Swal.fire('Saved!', '', 'success')
                            this.$route.push({name: 'Users'})
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

        },
        finalValidation(){
            setTimeout(()=>{
                if(this.documentHolder.length != 0 && this.taggingOfRequest){
                    let arr = this.categoryHolder
                    for(let i=0; i<this.documentHolder.length; i++){
                        let index = arr.indexOf(this.documentHolder[i])
                        if(index == -1){
                            this.btnSubmit = false
                            break
                        }else{
                            this.btnSubmit = true
                        }
                    }
                }
            }, 1000)
        },
        selectCategory(document, category, category_name){

            let concatenate = category.toString() + document.toString()
            if($(`input[id=${concatenate}]:checked`).length > 0){
                this.selectedCategory.push({document_id: document, category_id:category})
                this.categoryHolder.push(document)
                this.finalValidation()
                
            }else{
                if(this.selectedCategory.length != 0){
                    this.selectedCategory.forEach((sc, index)=>{
                        if(document == sc.document_id && category == sc.category_id){
                            this.selectedCategory.splice(index, 1)
                        }
                    })

                    this.categoryHolder.forEach((sc, index)=>{
                        if(document == sc){
                            this.categoryHolder.splice(index, 1)
                        }
                    })
                    this.finalValidation()


                }
            }
        },
        checkDocumentType(did, doctype){
            setTimeout(()=>{
                if($(`input[id=dt${did}]:checked`).length > 0){
                    axios.get(`/documents/${did}`).then(res=>{
                        let result = res.data[0]
                        if(result.categories[0] != null){
                            this.btnSubmit = false
                            this.selectionTagging.push({id: did, name: doctype, categories: result.categories})
                            this.documentHolder.push(did)
                        }else{
                            this.selectedCategory.push({document_id: did, category_id: 0 })

                            for(let i=0; i<this.selectedCategory.length; i++){
                                if(this.selectedCategory[i].category_id > 0){
                                    this.btnSubmit = false
                                }else{
                                    this.btnSubmit = true
                                }
                            }
                            
                        }
                    })
                }else{

                    for(let i=0; i<this.selectedCategory.length; i++){
                        if(this.selectedCategory[i].category_id > 0){
                            this.btnSubmit = false
                        }else{
                            this.btnSubmit = true
                        }
                    }
                    axios.get(`/documents/${did}`).then(res=>{
                        let result = res.data[0]
                        
                        if(result.categories[0] != null){
                            this.selectionTagging.forEach((st, index) =>{
                                if(st.id == did){
                                    this.selectionTagging.splice(index, 1)
                                }
                            })

                            this.documentHolder.forEach((sc, index)=>{
                                if(did == sc){
                                    this.documentHolder.splice(index, 1)
                                }
                            })
                        }else{
                            if(this.selectedCategory.length != 0){
                                this.selectedCategory.forEach((sc, index)=>{
                                    if(did == sc.document_id && sc.category_id == 0){
                                        this.selectedCategory.splice(index, 1)
                                    }
                                })
                            }
                        }
                    })    
                }

            }, 500)

            
        },
        checkPermission(){
            this.selectedCategory = []
            this.selectionTagging = []
            this.taggingOfRequest = false

            setTimeout(()=>{
                if($('input[value="Tagging of Request"]:checked').length > 0){
                    this.btnSubmit = false
                    this.taggingOfRequest = true
                }else{
                    this.taggingOfRequest = false
                    this.btnSubmit = true
                }

                if(this.privilege.length == 0){
                    this.btnSubmit = false
                }
            }, 500)
            
        },
        changeRole(){
            this.checkPermission()
            this.roles.forEach(role=>{ 
                if(role.name==this.role){
                    this.privilege = role.permissions
                }
            })
        },
        fetchCategories(){
            axios.get('/categories?is_active=active').then(res=>{
                let holder = res.data
                this.categories = holder.data
                console.log(this.categories)
            })
        },
        apiSearch(){
            this.selectionTagging = []
            this.selectedCategory = []
            this.result = null
            axios.get(`http://localhost:3000/api?id_number=${this.employeeId}&id_prefix=${this.prefixId}`).then(res=>{
                this.result = res.data[0]
                console.log(this.result)
                if(res.data.length != 0){
                    this.username = this.result.first_name[0].toLowerCase() + this.result.last_name.toLowerCase()
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: '404',
                        text: 'User not Found',
                    })
                }
            })
        }
    }

}
</script>


<style scoped>
    @import 'style/add-user-styles.css';

    .grid-parent{
        display:grid;
        grid-template-columns: repeat(2, 1fr);
        border:2px solid green;
        box-sizing:border-box;
    }


   .grid-child{
       
       padding-left:10px;
       box-sizing:border-box;
   }
 
    .card-animate-leave-to{
        opacity:0;
        transform: translateX(-50px);
    }

    .card-animate-enter-active{
        transition:all .5s ease;
    }

    .card-animate-leave-active{
        transition:all .5s ease;
    }


    
    .privilege-animate-enter-from{
        opacity:0;
        transform: translateX(-50px);
    }

    .privilege-animate-leave-to{
        opacity:0;
        transform: translateX(-50px);
    }

    .privilege-animate-enter-active{
        transition:all 1s ease;
    }

    .privilege-animate-leave-active{
        transition:all 1s ease;
    }
    .alert-text span{
        display:inline;
    }
    .hc{
        
        display:block;
    }
    .header-cat{

        display:block;
        
        width:100%;
        background:rgb(245, 245, 245);
        margin-bottom:5px;
    
        
    }

    .header-cat-text{
        color:white;
        background:#172B4D;
    }

    #grid-priv{
        display:grid;
        grid-template-columns: repeat(2, 1fr)
    }

    .header{
        grid-column:1/3;
    }
</style>