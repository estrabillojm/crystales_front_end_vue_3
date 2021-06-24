<template>
  <div id="cr-grid">
    <div class="sidebar-container">
      <Sidebar/>
    </div>
    <div class="main-container">
    <Navbar/>

    <div class="grid-container">
       
        <div class="auser add-user">
            {{ set_id_prefix }}
            <form @submit.prevent="userSave">
                <div class="form-group row fg mt-3">
                    <!-- <div class="col-md-6">
                        <label for="#"><strong>ID Prefix</strong></label>    
                        <select class="form-control">
                            <option value="">Select ID Prefix</option>
                            <option value="rdfflfi">RDFFLFI</option>
                            <option value="o+">O+</option>
                        </select>                    
                    </div> -->
                    
                    <div class="col-md-6">
                        <label for="#"><strong>Employee ID</strong></label>
                        <input type="text" class="employeeId form-control mb-1" required v-model="apiTextBox" @keyup="findApiUser(apiTextBox)">                        
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
                        
                        <input type="text" class="employeeId form-control mb-1" v-model="userName" required @keyup="findNonExistedUser(userName)"> 
                        <span v-if="userNameAvailability && userName && employeeAvailability">
                            <p class="text-success">Username Available</p>
                        </span>
                        <span v-else-if="!userNameAvailability && userName && employeeAvailability">
                            <p class="text-danger">Username Existed</p>
                        </span>
                
                        
                    </div>
                    

                </div>
                
                <div class="form-group fg">
                    <label for="#"><strong>Role</strong></label>
                    <select class="form-control" @change="changeRole(role)" v-model="role" required>
                        <option value="">Select Role</option>
                        <option v-for="role in roles" :key="role.id" :value="role" >
                            {{ role.name }}
                        </option>
                    </select>
                </div>
                
               <span v-if="role.name != `Administrator`">
                <transition tag="div" name="priv" appear
                 class="fg">
                 
                    <div v-if="role" id="grid-priv">
                        
                        
                            <div class="header mb-2">
                                <p><strong>Privilege</strong></p>
                            </div>
                        
                        
                        
                        <transition name="privilege-animate" appear class="mt-2 privilege" v-for="pr in permissions" :key="pr.id">
                            <span v-if="role.name != `Administrator`">
                                <input type="checkbox" class="document_cb mr-2" :id="`pr${pr.id}`" :value="pr.name" v-model="defaultPermission" @change="permissionChange(pr.name)">
                                <label :for="`pr${pr.id}`">{{pr.name}}</label> 
                            </span>
                        </transition>
                        
                        
                        
                    </div>
                </transition>
                </span>
                
               

                <span v-if="btnSubmit">
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
            
            <div class="auser user-info">
                <div class="col-md-12 mt-3 row" v-if="apiData">                   
                    <transition tag="div" class="col-md-12" name="header-info" appear mode="out-in">
                        <h3 class="children">
                            <span id="last_name">{{ apiData.last_name.toUpperCase() }}</span>, 
                            <span id="first_name">{{ apiData.first_name.toUpperCase() }}</span>{{ " " }}
                            <span>{{ apiData.middle_name[0].toUpperCase() }}</span>.

                            <input type="hidden" v-model="first_name">
                            <input type="hidden" v-model="last_name">
                            <input type="hidden" v-model="id_prefix">
                            <input type="hidden" v-model="id_no">
                            <input type="hidden" v-model="department">
                            <input type="hidden" v-model="position">
                            
                        </h3>
                    </transition>

                    
                    <div class="col-md-12 auser-address">
                        <transition  tag="span" name="headersub" appear mode="out-in">
                            <span>
                                <p><strong>ID Prefix : </strong>{{ apiData.prefix_id }}</p>
                                <br>
                                <p><strong>Employee ID : </strong>{{ apiData.id_number }}</p>
                                <br>
                                <p><strong>Department : </strong><span id="department">{{ apiData.department }}</span></p>
                                <br>
                        
                                <p><strong>Position : </strong><span id="position">{{ apiData.position }}</span></p>
                                <br>
                                <hr>
                            </span>
                        </transition>

                        {{ userCategory }} <br>
                        {{ userSelection }}


                        <transition-group  tag="span" name="header-info" appear mode="out-in" class="row" v-if="taggingOfRequest">
                            <div class="col-md-12 mb-3 childr-1">
                                <p><strong>Document Types</strong> <em>(For Tagging of Request)</em> </p>
                            </div>
                            
                            <div :class="`col-lg-6 col-md-6 child-${index}`" v-for="(dt, index) in documents" :key="dt.document_id">
                                
                                <input type="checkbox" :id="`dt${dt.document_id}`" class="document_cb" v-model="selectedDocument" :value="dt.document_type" @change.once="checkCategory(dt.document_id, dt.document_type, index)" @change="docTypeAdd(dt.document_id)" @click="removeCat(dt.document_id, $event)">&nbsp;
                                <label :for="`dt${dt.document_id}`">{{ dt.document_type.toUpperCase() }}</label>
                            </div>      
                                                                 
                        </transition-group>
                        <!-- {{ documents }} -->
                        
                        <transition-group tag="span" name="card-animate" appear mode="out-in" v-if="taggingOfRequest">
                            
                            <div class="row mb-2 hc header-cat" v-for="(sd, index) in selectedDocument" :key="index">
                                <div :class="`doc${index}`" v-for="document in documents" :key="document.id">
                                    <span v-for="index in 1" :key="index">
                                    
                                    
                                    <div v-if="document.categories.length != 0 && document.document_type == sd" class="">
                                  
                                        <p class="col-md-12 hc header-cat-text"><strong>{{ sd }} Category <br></strong></p>
                                    </div>
                                    </span>
                                </div>
                                
                                <div v-for="(dc) in docCategories" :class="`dcm${dc}`" :key="dc">
                    
                                    <span v-if="sd.toUpperCase() === dc.document_type.toUpperCase()" class="row pl-3">
                                        <div class="col-md-6" v-for="categ in dc.categories" :key="categ">
                                        
                                            <span v-for="(oct) in categories" :key="oct.id">
                                                <span v-if="oct.id == categ">                                
                                                    <input type="checkbox" :id="`prm-cat-${dc.document_type}${oct.id}}`" :value="oct.id" @change="addCategory(dc.document_id, oct.id)"> &nbsp;
                                                    <label :for="`prm-cat-${dc.document_type}${oct.id}}`"> {{ oct.name.toUpperCase() }}</label>                                                    
                                                </span>
                                            </span>
                                        </div>
                                    </span>
                                
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
            apiTextBox: '',
            apiData: '',
            userName: '',
            userNameAvailability: true,
            employeeAvailability: true,
            role: '',
            first_name: '',
            last_name: '',
            middle_name: '',
            id_prefix: '',
            id_no: '',
            departmane: '',
            position:'',
            defaultPermission: [],
            taggingOfRequest: false,
            docCategories: [],
            document_type: [],
            selectedDocument: [],
            separatedDoc: [],
            categories: [],
            showHeader: false,
            userSelection:[],
            userCategory: [],
            isDocCheck: false,
            selectedCategory:[],
            arrCheck: false,
            varrCheck: false,
            categoryObject: [],
            onMark: false,
            btnSubmit: false,
            set_id_prefix: null,
            
        }       
    },
    created(){ 
        this.$store.dispatch('loadPermissions')
        this.$store.dispatch('loadDocuments')

        

        
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


        // this.apiData = res.data[0]
            // this.userName = this.apiData.first_name[0].toLowerCase() + this.apiData.last_name.toLowerCase()
            // this.first_name = this.apiData.first_name
            // this.last_name = this.apiData.last_name
            // this.middle_name = this.apiData.middle_name
            // this.id_prefix = this.apiData.prefix_id
            // this.id_no = this.apiData.id_number
            // this.department = this.apiData.department
            // this.position = this.apiData.position
        userSave(){
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Save`,
                denyButtonText: `Don't save`,
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire('Saved!', '', 'success')
                    axios.post('/users', {

                        "id_prefix": this.id_prefix,
                        "id_no": this.id_no,
                        "role": this.role.name,
                        "first_name": this.first_name,
                        "middle_name": this.middle_name,
                        "last_name": this.last_name,
                        "suffix": "suffix",
                        "department": this.department,
                        "position": this.position,
                        "permissions": this.defaultPermission,
                        "document_types": this.userSelection.concat(this.userCategory),
                        "username": this.userName,
                        "password": this.userName,
                        "password_confirmation": this.userName,
                        "is_active": true
                    }).then((res)=>{
                        console.log("Data Saved")
                        this.$router.push({name: 'Users'})
                    }).catch(err=>{
                        console.log(err)
                    })
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
            
        },

        // addNoCat(document_id){
        
        //     // this.userSelection.push({document:val, category: 0})

        //     axios.get(`/documents/${document_id}`).then(res=>{
        //         this.separatedDoc = res.data
        //         if(this.separatedDoc.categories.length == 0){
        //             if(this.userSelection.length != 0){
        //             }else{

        //                 this.userSelection.push({document: document_id, category: 0})
        //             }
                    
        //         }
        //     })
        // },
      
        addCategory(doc, cat){
            
            this.arrCheck = false
            console.log('length', this.userSelection)
            var ind;
            if(this.userSelection != 0){
                for(let i=0; i<this.userSelection.length; i++){
                    if(this.userSelection[i].document == doc && this.userSelection[i].category == cat) {
                        ind = i;
                        this.arrCheck = true
                        break
                        
                    }else{
                        
                        this.arrCheck = false
                    }
                }
                if(this.arrCheck){
                    this.userSelection.splice(ind, 1)
                    this.categoryObject.splice(ind, 1)
                    
                }else{
                    this.userSelection.push({document_id: doc, category_id: cat})
                    this.categoryObject.push(cat)
                }
            }else{
                this.userSelection.push({document_id: doc, category_id: cat})
            }

                        

            
        
        },
        removeCat(document_id, event){
            
            
            // for(let i=0; i<this.userSelection.length; i++){
            //     if(this.userSelection[i].document == document_id){
            //         var arr = this.userSelection
            //         var index = arr.indexOf(this.userSelection[i]);
            //             arr.splice(index, 1); 
            //     }
            // }

            var array =  this.userSelection;
            this.userSelection = [];
            this.userSelection = array.filter((category, index, arr)=>{
                return category.document != document_id
            });
           
        },
        docTypeAdd(val){


            axios.get(`/documents/${val}`).then(res=>{
                this.separatedDoc = res.data
    

                
                console.log('separated doc', this.separatedDoc[0].categories)
                if(this.separatedDoc[0].categories.length == 0){
                    if(this.userCategory.length == 0){
                        this.userCategory.push({document_id: val, category_id: 0})
                        this.btnSubmit = true

                    }else{
                        for(let i=0; i<this.userCategory.length; i++){
                            if(this.userCategory[i].document == val){
                                this.onMark = true
                                
                                break
                            }else{                                
                                this.onMark = false
                                

                            }
                        }
                        if(!this.onMark){
                            this.userCategory.push({document_id: val, category_id: 0})
                        }else{
                            var holder = []
                            this.userCategory.forEach(uc=>{
                                 if(uc.document != val){
                                     holder.push(uc)
                                 }
                            })
                            
                            this.userCategory = holder;
                        }
                        
                    }
                }else{
                    console.log(">0")
                }

                
                
            })

        },
        checkCategory(val, name, idx){
            alert(val)
            axios.get(`/documents/${val}`).then(res=>{
                this.separatedDoc = res.data

                console.log('document/id', this.separatedDoc[0])

                if(this.separatedDoc[0].categories.length){
                    this.showHeader = true
                }else{
                    this.showHeader = false
                    
                }
                
                this.docCategories.push(this.separatedDoc[0])
         
            })

            axios.get(`/categories/all`).then(res=>{
                this.categories = res.data
                console.log(this.categories)
            })
            
        },

        permissionChange(val){
            if(val==='Tagging of Request'){
                this.btnSubmit = false
                this.isDocCheck = false
                this.selectedDocument = []
                this.docCategories = []
                this.userSelection = []
                this.taggingOfRequest = !this.taggingOfRequest
                if(!this.taggingOfRequest){
                    this.btnSubmit = true
                }

            }
        },
        findApiUser(val){
           
            this.employeeAvailability = false
            this.userNameAvailability = false
            axios.get(`http://localhost:3000/api?id_number=${val}`).then(res=>{
                if(res.data.length != 0){
                    this.apiData = res.data[0]
                    console.log('user data',this.apiData)
                    this.userName = this.apiData.first_name[0].toLowerCase() + this.apiData.last_name.toLowerCase()
                    this.first_name = this.apiData.first_name
                    this.last_name = this.apiData.last_name
                    this.middle_name = this.apiData.middle_name
                    this.id_prefix = this.apiData.prefix_id
                    this.id_no = this.apiData.id_number
                    this.department = this.apiData.department
                    this.position = this.apiData.position
                    this.btnSubmit = true

                    
                    axios.get(`/users/username-validation?username=${this.userName}`).then(res=>{
                        
                        if(res.data.length === 0){ 
                            this.userNameAvailability = true
                            this.btnSubmit = true
                        }else{
                            this.userNameAvailability = false
                            this.btnSubmit = false
                        }
                    })


                    axios.get(`/users/id-validation?id_no=${val}`).then(res=>{
                        console.log('id_number', res.data)
                        if(res.data.length === 0){
                            this.employeeAvailability = true
                            this.btnSubmit = true

                        }else{
                            this.employeeAvailability = false
                            this.btnSubmit = false

                        }
                    })
                }else{
                    this.apiData = ""
                    this.userName = ""
                    this.btnSubmit = false
                }
            })
        },
        findNonExistedUser(val){
           
            axios.get(`/users/username-validation?username=${val}`).then(res=>{
                let findUsername = res.data
                console.log('fu', findUsername)

                if(findUsername.length === 0){
                    this.userNameAvailability = true
                    this.btnSubmit = true
                }else{
                    this.userNameAvailability = false
                    this.btnSubmit = false

                }

                if(this.employeeAvailability == false){
                    this.btnSubmit = false
                }else{
                    this.btnSubmit = true
                }

                if(this.userName.length<3){
                    this.btnSubmit = false

                }else{
                    this.btnSubmit = true

                }
            })
            
            
            
        },
        changeRole(val){
    
            this.defaultPermission = []
            this.isDocCheck = false
            this.taggingOfRequest = false
            if(val.name != undefined || val.name != "Administrator"){        
                for (var key in this.roles) {   
                    if(this.roles[key].name == val.name){
                        for(let i=0; i< this.roles[key].permissions.length; i++){
                            console.log(this.roles[key].permissions[i])
                            this.defaultPermission.push(this.roles[key].permissions[i])
                            var arr = this.defaultPermission
                            var index = arr.indexOf("Tagging of Request")
                            if(index > -1){
                                this.taggingOfRequest = true
                                this.btnSubmit = false

                            }else{
                                this.taggingOfRequest = false
                                this.btnSubmit = true

                            }             
                        }
                    }
                                
                } 
        
            }
        }

    }

}
</script>


<style scoped>
    @import 'style/add-user-styles.css';
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