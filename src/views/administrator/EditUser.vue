<template>
  <div id="cr-grid">
    <div class="sidebar-container">
      <Sidebar/>
    </div>
    <div class="main-container">
    <Navbar/>

    <div class="grid-container">
       
        <div class="auser add-user">
        
            <form @submit.prevent="userUpdate()">
                <div class="form-group row fg mt-3">
                    <div class="col-md-6">
                        <label for="#"><strong>Employee ID</strong></label>
                        <input type="text" class="employeeId form-control mb-1 disable" disabled required v-model="userData.id_no" @keyup="findApiUser(apiTextBox)">                        
                        <span v-if="employeeAvailability && apiTextBox && apiData">
                            <p class="text-success text-alert">Employee Available</p>
                        </span>
                        <span v-else-if="!employeeAvailability && apiTextBox && apiData">
                            <p class="text-danger">ID # {{ apiTextBox }} already registered </p>
                        </span>

                        <span v-else-if="!apiData && apiTextBox">
                            <p class="text-danger">ID # {{ apiTextBox }} Not Found</p>
                        </span>

                    </div>

                    <div class="col-md-6">
                        <label for="#"><strong>Username</strong></label>
                        
                        <input type="text" class="employeeId form-control mb-1 disable" disabled v-model="userData.username" required @keyup="findNonExistedUser(userName)"> 
                        <!-- <span v-if="userNameAvailability && userName && employeeAvailability">
                            <p class="text-success">Username Available</p>
                        </span>
                        <span v-else-if="!userNameAvailability && userName && employeeAvailability">
                            <p class="text-danger">Username Existed</p>
                        </span> -->
                
                        
                    </div>
                    

                </div>
                
                <div class="form-group fg">
                    <label for="#"><strong>Role</strong></label>
                    <select class="form-control" @change="changeRole(userData.role)" v-model="userData.role" required>
                        <option value="">Select Role</option>
                        <option v-for="role in roles" :key="role.id" :value="role.name" >
                            {{ role.name }}
                        </option>
                    </select>
                </div>
                <transition tag="div" name="priv" appear
                 class="fg">
                 
                    <div v-if="userData.role && userData.role != `Administrator`" id="grid-priv">
                        <div class="header mb-2">
                            <p><strong>Privilege</strong></p>
                        </div>
                        
                            <transition name="privilege-animate" appear class="mt-2 privilege" v-for="pr in permissions" :key="pr.id">
                                <span>
                                    <input type="checkbox" class="document_cb mr-2" :id="`pr${pr.id}`" :value="pr.name" v-model="userData.permissions" @change="permissionChange(pr.name)">
                                    <label :for="`pr${pr.id}`">{{pr.name}}</label> 
                                </span>
                            </transition>
                        
                        
                    </div>
                </transition>


                
               

                <span v-if="btnSubmit">
                    <button type="submit" class="btn btn-sm btn-primary mt-4" @click="dataTesting()">Update</button>
                </span>

                <span v-else>
                    <button type="button" class="btn btn-sm btn-primary mt-4" disabled>Update</button>
                </span>

                <!-- <span>
                    <button type="button" class="btn btn-sm btn-success mt-4 ml-1" @click="restoreDefault()">Restore Defaults</button>
                </span> -->
                


              
                
            


                <router-link :to="{name: 'Users'}">
                    <button class="btn btn-sm btn-default mt-4 ml-1" title="Back to User Masterlist">Cancel</button>
                </router-link>
               
                <div class="form-group">
                </div>
            </form>
           
        </div>

        
        <div class="grid-header">
            
            <div class="auser user-info">
                <div class="col-md-12 mt-3 row" v-if="userData">                   
                    <transition tag="div" class="col-md-12" name="header-info" appear mode="out-in">
                        <h3 class="children">
                            <span id="last_name">{{ userData.last_name.toUpperCase() }}</span>, 
                            <span id="first_name">{{ userData.first_name.toUpperCase() }}</span>{{ " " }}
                            <span>{{ userData.middle_name[0] }}</span>.


                            <input type="hidden" v-model="userData.first_name">
                            <input type="hidden" v-model="userData.last_name">
                            <input type="hidden" v-model="userData.middle_name">
                            <input type="hidden" v-model="userData.id_prefix">
                            <input type="hidden" v-model="userData.id_no">
                            <input type="hidden" v-model="userData.department">
                            <input type="hidden" v-model="userData.position">
                            
                        </h3>
                    </transition>

                    
                    <div class="col-md-12 auser-address">
                        <transition  tag="span" name="headersub" appear mode="out-in">
                            <span>
                                <p><strong>ID Prefix : </strong>{{ userData.id_prefix }}</p>
                                <br>
                                <p><strong>Employee ID : </strong>{{ userData.id_no }}</p>
                                <br>
                                <p><strong>Department : </strong><span id="department">{{ userData.department }}</span></p>
                                <br>
                        
                                <p><strong>Position : </strong><span id="position">{{ userData.position }}</span></p>
                                <br>
                                <hr>
                            </span>
                        </transition>
                    
                        
                        <transition  tag="span" name="header-info" appear mode="out-in" class="row" v-if="taggingOfRequest">
                            <span>
                                <div class="col-md-12 mb-3 childr-1">
                                    <p><strong>Document Types</strong> <em>(For Tagging of Request)</em> </p>
                                </div>
                              
                                <div :class="`col-lg-6 col.md-6child-${index}`" v-for="(dt, index) in documents" :key="dt.document_id">
                                    
                                    <input type="checkbox" :id="`dt${dt.document_id}`" class="document_cb" v-model="documentArray" :value="dt.document_id" @click="chooseDt(dt.document_id)" @change="formValidation">&nbsp;
                                    <label :for="`dt${dt.document_id}`">{{ dt.document_type.toUpperCase() }}</label>
                                </div>      
                            </span>                                
                        </transition>

                       
                        <!-- {{ category }} -->
                      
                        
                        <!-- INSERT CODE HERE -->

                        
                        <transition-group tag="span" name="card-animate" appear mode="out-in" v-if="taggingOfRequest">
                        <div v-for="select in selected" :key="select.document_id">
                            
                            <div v-if="select.categories.length != 0">
                                <div class="bg-dark-blue text-white pl-2">
                                    {{ select.document_type.toUpperCase() }} CATEGORY
                                </div>

                               
                                
                                <div class="mt-1 mb-3 border br-bg">
                                    <div class="row">
                                 
                                    <div v-for="(category1, index) in select.categories" :key="index" class="col-md-6 pl-4">
                                        
                                        <div v-for="cat in category" :key="cat.id">
                                          
                                            <div v-if="cat.id == category1">
                                                <input type="checkbox" :value="cat.id" :id="`category-${cat.id}${select.document_id}`" v-model="select.currentCategories.categories" @change="formValidation">
                                                &nbsp; <label :for="`category-${cat.id}${select.document_id}`">{{ cat.name.toUpperCase() }}</label>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition-group>
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
            apiData: '',
            apiTextBox: '',
            employeeAvailability: '',
            category: '',
            taggingOfRequest: false,
            defaultPermission: [],
            selectedDocument: [],
            categories: [],
            docHolder: [],
            holder: [],
            documentArray: [],
            catArray: [],
            document: [],
            finalData: [],
            selected: [],
            holder: [],
            btnSubmit: true,
            userData: {
                userName: '',
                
                first_name: '',
                last_name: '',
                middle_name: '',
                id_no: '',
                id_prefix: '',
                role: '',
                permissions: [],
                department: '',
                position: '', 
            },
            documentArray: [],

            //VAR IN FETCH DATA
            user: []
            
        }       
    },
    created(){ 
        this.$store.dispatch('loadPermissions')
        this.$store.dispatch('loadDocuments')
        

        var arr = [50,30,20,40,12]
        this.findUser()
        this.fetchCategory()


    },
    computed:{
        ...mapState([
            'api',
            'permissions',
            'roles',
            'documents',
            
        ])

    },
    methods:{
        fetchCategory(){
            axios.get(`/categories/all`).then(res=>{
                this.category = res.data
                console.log('CATEGORY', this.category)
            })
        },
        userUpdate(){

            // console.log("AP Tagging",
            //              this.finalData)

            let object = {
                permissions: this.userData.permissions,
                
              
            }
            let perm = []
            object.permissions.forEach(ob =>{
                perm.push(ob)
            })

            console.log('object', perm)

            
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Update`,
                denyButtonText: `Don't update`,
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios.put(`users/${this.$route.params.id}`, {
                            id_prefix: this.userData.id_prefix,
                            id_no: this.userData.id_no,
                            role: this.userData.role,
                            first_name: this.userData.first_name,
                            middle_name: this.userData.middle_name,
                            last_name: this.userData.last_name,
                            suffix: null,
                            department: this.userData.department,
                            position: this.userData.position,
                            permissions: perm,
                            document_types: this.finalData,
                            username: this.userData.username,
                            
                            is_active: this.userData.is_active
                        

                        
                    }).then(()=>{
                        
                        Swal.fire('Updated!', '', 'success')
                        this.$router.push({name: 'Users'})
                    }).catch(err=>{
                        console.log(err)
                    }) 
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
             
        },
        formValidation(){
           setTimeout(()=>{
               if(!this.selected.length){
                    this.btnSubmit = false
               }
               for(let i=0; i<this.selected.length; i++){

                    if(this.selected[i].categories.length == 0 && this.selected[i].currentCategories.categories.length == 0){
                        // alert("0 cat and 0 cur cat")
                        this.btnSubmit = true
                    }else if(this.selected[i].categories.length > 0 && this.selected[i].currentCategories.categories.length > 0){
                        // alert("0 > cat and 0 > cat")
                        this.btnSubmit = true

                    }else{
                        this.btnSubmit = false
                        break
                    }
                }
           }, 500)
           
                
        },
        dataTesting(){
            this.finalData = []
            this.selected.forEach(slc=>{
                if(slc.categories.length != 0 && slc.currentCategories.categories.length != 0){
                    this.finalData.push(slc.currentCategories)

                }else if(slc.categories.length == 0){
                    
                    this.finalData.push({categories: [0], document_id: slc.document_id})
                }
            })

        },
        chooseDt(document_id){
            
            axios.get(`/documents/${document_id}`).then(res=>{
                this.docHolder = res.data[0]

                if($('#dt'+document_id+':checkbox:checked').length > 0){
                    this.selected.push({ "currentCategories": { "categories": [ ], "document_id": document_id }, "document_type": this.docHolder.document_type, "document_description": this.docHolder.document_description, "categories": this.docHolder.categories, "document_id": document_id })                
                }else{
                    
                    this.selected.forEach((doc, index)=>{
                        
                        if(doc.document_id == document_id){
                            this.selected.splice(index, 1)
                        }
                    })                
                }

            })
           
        },
        
        permissionChange(val){
            
            if(val==='Tagging of Request'){
                
                
              
                this.btnSubmit = false

                
                this.docCategories = []
                this.userSelection = []
                this.taggingOfRequest = !this.taggingOfRequest
                if(!this.taggingOfRequest){
                    this.selected = []
                    this.documentArray = []
                    this.btnSubmit = true
                }
            }

            
        },
        changeRole(val){

            this.taggingOfRequest = false
            this.userData.permissions = []
            if(val.name != ""){        
                for (var key in this.roles) {   
                    if(this.roles[key].name == val){
                        for(let i=0; i< this.roles[key].permissions.length; i++){
                            this.userData.permissions.push(this.roles[key].permissions[i])
                            var arr = this.userData.permissions
                            var index = arr.indexOf("Tagging of Request")
                            if(index > -1){
                                this.taggingOfRequest = true
                                this.btnSubmit = false
                            }else{
                                this.taggingOfRequest = false
                                this.selected = []
                                this.documentArray = []
                                this.btnSubmit = true

                            }             
                        }
                    }
                                
                } 
        
            }
        },
        async findUser(){

            var id = this.$route.params.id
            
            await axios.get(`/users/${id}`).then(res=>{

                this.user = res.data
                console.log('password', this.user)
                
                this.userData.id_no = this.user.id_no
                this.userData.username = this.user.username.toUpperCase()
            
                this.userData.role = this.user.role
                this.userData.last_name = this.user.last_name
                this.userData.first_name = this.user.first_name
                this.userData.middle_name = this.user.middle_name.toUpperCase()
                this.userData.permissions = this.user.permissions
                this.userData.id_prefix = this.user.id_prefix
                this.userData.department = this.user.department
                this.userData.position = this.user.position
                this.userData.document_types = this.user.document_types
                this.userData.is_active = this.user.is_active
            
                
                
                this.userData.document_types.forEach(sl=>{
                    console.log("HEY", sl)
                    this.documentArray.push(sl.document_id)
                    // console.log('DOCUMENTS', sl.document_id)
                })
                
                axios.get(`/documents?is_active=active`).then(res => {
                    let documents = res.data

                
                    this.userData.document_types.forEach(dt =>{
                        documents.map(dc => {
                           
                            if(dc.document_id == dt.document_id) {
                                
                                this.selected.push({currentCategories:dt,...dc})
                            }
                        })
                    })
                })
                this.user.permissions.forEach(perm =>{
                    if(perm == 'Tagging of Request'){
                        this.taggingOfRequest = !this.taggingOfRequest
                    }
                })
                
                
            })

            
           

           
           
            
        }
    }


}
</script>


<style scoped>
    @import 'style/add-user-styles.css';

    .br-bg{
        background: rgb(245, 245, 245);
    }

    .bg-dark-blue{
        background: #172B4D;
    }

    .hidden{
        display:none;
    }
    .card-animate-enter-from{
        opacity:0;
        transform: translateX(-150px);
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