<template>
  <div id="cr-grid">
    <div class="sidebar-container">
      <Sidebar/>
    </div>
    <div class="main-container">
    <Navbar/>

    <div class="grid-container">
       
        <div class="auser add-user">
            
        
            <form @submit.prevent="userSubmit">
                <div class="form-group fg mt-3">
                    <label for="#">Employee ID</label>
                    <input type="text" class="employeeId form-control disable" required v-model="result.user_id" @keyup="findUser(userData.employee_id)" disabled> 
                    <p class="error pt-1" v-if="userData.employee_id.length > 1 && error">Employee ID not yet registered</p>
                </div>

                <div class="form-group fg">
                    <label for="#">Role</label>
                    <select class="form-control" v-model="result.role" @change="roleSelect(result.role)" required>
                        <option value="">Select Role</option>
                        <option v-for="role in roles" :value="role.name" :key="role.id">
                        {{ role.name }}
                        </option>
                    </select>
                </div>

                <span  v-if="result.role" class="grid-check">
                    
                    <p><strong>{{ userData.role }} Privilege</strong></p>
                     <br>
                    
                    <div class="form-check" v-for="prm in permissions" :key="prm.id">
                        <input type="checkbox"  class="doctype_cb" :value="prm.name" :id="`permi${prm.id}`" v-model="result.permissions" @change="changeStatus(prm.name)">
                        <label :for="`permi${prm.id}`"  class="doctype_cb">&nbsp; {{ prm.name }}</label>
                    </div>     
                </span>



                
                <span v-if="!taggingRequest && result.role != '' && perLength.length != 0">    
                    <button type="submit" class="btn btn-sm btn-primary mt-4">Update</button>
                </span>

                <span v-else-if="taggingRequest && result.document_type.length && !showPrm && !showCb && perLength.length != 0">    
                    <button type="submit" class="btn btn-sm btn-primary mt-4">Update 1</button>
                </span>


                <span v-else-if="taggingRequest && result.document_type.length && showPrm && result.prm_categories.length && !showCb">    
                    <button type="submit" class="btn btn-sm btn-primary mt-4">Update 2</button>
                </span>


                <span v-else-if="taggingRequest && result.document_type.length && showCb && result.contractor_categories.length && !showPrm">    
                    <button type="submit" class="btn btn-sm btn-primary mt-4">Update 3</button>
                </span>

                <span v-else-if="taggingRequest && result.document_type.length && showCb && result.contractor_categories.length && showPrm && result.prm_categories.length">    
                    <button type="submit" class="btn btn-sm btn-primary mt-4">Update 4</button>
                </span>

            
                <span v-else>    
                    <button type="submit" class="btn btn-sm btn-primary mt-4 btn-disabled" disabled>Update</button>
                </span>

                <span>
                    <button @click="findUser($route.params.id)" class="btn btn-sm btn-success ml-1 mt-4">Restore Defaults</button>
                </span>
                <router-link :to="{name: 'Users'}">
                    <button class="btn btn-sm btn-default mt-4 ml-1" title="Back to User Masterlist"><span class="material-icons">east</span></button>
                </router-link>
                <div class="form-group">
                </div>
            </form>
           
        </div>





       
        <div class="grid-header">

            <div class="auser user-info">
                <div class="col-md-12 mt-3 row">                  
                    <div class="col-md-12">
                        <h3>
                            <span id="lastname">{{ result.lastname }}</span>, 
                            <span id="firstname">{{ result.firstname }}</span>{{ " " }}
                            <span>{{ result.middlename }}</span>.
                        </h3>
                    </div>

                    <div class="col-md-12 auser-address">
                    <p><strong>Employee ID : </strong> {{ result.user_id }}</p>
                    <br>
                    <p><strong>Department : </strong><span id="department">{{ result.department }}</span></p>
                    <br>
                    <p><strong>Username : </strong><span id="username">{{ result.username }}</span></p>
                    <hr>
                    
                    
                    
                        <span v-if="showDocType">
                            <span>
                                <p><strong>Document Type</strong><em> (For Tagging of Documents)</em></p>
                                <div>
                                    <div class="row mt-3">
                                        <div class="col-md-4" v-for="dt in documentTypes" :key="dt.id">
                                            <input type="checkbox" name="" :id="`tor${dt.id}`" class="doctype_cb" :value="dt.name" v-model="result.document_type"  @change="docTypeStat(dt.name)">
                                            <label :for="`tor${dt.id}`"  class="doctype_cb">&nbsp; {{ dt.name }}</label>
                                
                                        </div>
                                    </div>  
                                </div>
                            </span>
                        </span>
                        
                        <!-- SHOW PRM CATEGORY -->
                        <span v-if="showPrm">
                            <hr>
                            <span>
                                <span>
                                    <p class=""><strong>PRM Category</strong></p>

                                    <!-- <div class="mt-3">
                                        <div class="row">
                                            <div class="col-md-6">
                                                
                                            </div>
                                        </div>  
                                    </div> -->
                                    
                                    <div>
                                        <div class="mt-3">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <input type="checkbox" id="checkAll" @change="checkAll()" class="doctype_cb">
                                                    <label  class="doctype_cb" for="checkAll"> &nbsp; <strong> Check All</strong></label>
                                                </div>
                                            </div>  
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6" v-for="pcat in prm" :key="pcat.id">
                                                <input type="checkbox" name="" :id="`prm${pcat.id}`" class="doctype_cb" :value="pcat.name" v-model="result.prm_categories" @change="unCheckBox()" >
                                                <label :for="`prm${pcat.id}`"  class="doctype_cb">&nbsp; {{ pcat.name }}</label>
                                            </div>
                                        </div>  
                                    </div>
                                </span>
                            </span>
                            
                        </span>

                        



                        <!-- SHOW CONTRACTORS BILL CATEGORY -->
                        <span v-if="showCb">
                            <hr>
                            <span>
                                <span>
                                    <p class=""><strong>Contractor's Billing Category</strong></p>

                                    <!-- <div class="mt-3">
                                        <div class="row">
                                            <div class="col-md-6">
                                        
                                                <label  class="doctype_cb" for="checkAllContractor"> &nbsp; <strong> Check All</strong></label>
                                            </div>
                                        </div>  
                                    </div> -->
                                    
                                    <div>
                                        <div class="row">
                                            <div class="col-md-6 mt-3">
                                                <input type="checkbox" id="checkAllContractor" @change="checkAllContractor()" class="doctype_cb">
                                                <label  class="doctype_cb" for="checkAllContractor"> &nbsp; <strong> Check All</strong></label>
                                            </div>
                                        </div>  
                                        <div class="row">
                                            <div class="col-md-6" v-for="ccat in contractor" :key="ccat.id">
                                                <input type="checkbox" name="" :id="`cont${ccat.id}`" class="doctype_cb" :value="ccat.name" v-model="result.contractor_categories">
                                                <label :for="`cont${ccat.id}`"  class="doctype_cb">&nbsp; {{ ccat.name }}</label>
                                            </div>
                                        </div>  
                                    </div>
                                </span>
                            </span>
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

import {mapState} from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'



export default {
    components: { Sidebar, Navbar, DataTable, Modal, Loading},
    data(){
        return {
            userData: {
                employee_id: '',
                role: '',
                permissions: [],
                docType: [],
                category: [],
                username: '',
                lastname: '',
                firstname: '',
                middlename: '',
                department: '',

            },
            result: [],           
            error: false,
            defaultPermissions: [],
            checkedPermissions: [],
            uncheckedPermissions: [],
            prmCategory: [],
            contractorCategory: [],
            showPrm: false,
            showCb: false,
            showDocType: false,
            taggingRequest: false,
            isCheckAll: false,
            isCheckAllContractor: false,
            isCheckAllDocument: false,
            confidentialAccess: false,
            conditionThree: false,     
            perLength: []
        }
    },
    created(){
        
        this.$store.dispatch('loadPermissions')
        this.$store.dispatch('loadPrmCategory')
        this.$store.dispatch('loadContractorsCategory')
        this.$store.dispatch('loadDocType')

        this.findUser(this.$route.params.id)
        
        
    },
    computed:{
        ...mapState([
            'api',
            'permissions',
            'roles',
            'documentTypes',
            'prm',
            'contractor',
            
        ])
        
    },
    methods:{
        roleSelect(val){
            this.result.permissions = []
            this.result.document_type = []
            this.result.prm_categories = []
            this.result.contractor_categories = []
            this.showPrm = false
            this.showCb = false
            this.showDocType = false
            this.taggingRequest = false
            this.conditionThree = false
            for(let i=0; i<this.roles.length; i++){
                if(this.roles[i].name == val){
                    for(let j=0; j<this.roles[i].def_perm.length; j++){
                        var arr = this.roles[i].def_perm.indexOf('Tagging of Request')
                        if(arr < 0){
                            this.showDocType = false
                            this.taggingRequest = false
                        }else{
                            this.showDocType = true
                            this.taggingRequest = true
                        }
                        this.result.permissions.push(this.roles[i].def_perm[j])
                    }
                }
            }
        },
        checkAll(){ 
            this.isCheckAll = !this.isCheckAll; 
            this.result.prm_categories = []; 
            if(this.isCheckAll){ 
                // Check all 
                for (var key in this.prm) {   
                    if(this.prm[key].name != "confidential request"){
                        this.result.prm_categories.push(this.prm[key].name); 
                    }
                                  
                } 
            }         
        },
        unCheckBox(){    
            $('#checkAll').prop('checked', false)
            this.isCheckAll = false

            if(this.result.prm_categories.length == this.prm.length){
                $('#checkAll').prop('checked', true)
                this.isCheckAll = true
            }
        },
        checkAllContractor(){
            this.result.contractor_categories = [] 
            this.isCheckAllContractor = !this.isCheckAllContractor
            
            if(this.isCheckAllContractor){ 
                // Check all 
                for (var key in this.contractor) {   
                    this.result.contractor_categories.push(this.contractor[key].name);          
                } 
            } 
        },
        findUser(uid){
            this.isCheckAll = false
            this.isCheckAllContractor = false 
            this.showPrm = false
            this.showCb = false
            axios.get(`/users/${uid}`).then(res=>{
                this.result = res.data
                this.result.middlename = this.result.middlename[0]
                this.perLength = this.result.permissions
                for(let i=0; i<this.result.permissions.length; i++){
                    if(this.result.permissions[i] == 'Tagging of Request'){
                        this.showDocType = true;
                        this.taggingRequest = true;
                    }
                }
                console.log(this.result.prm_categories)
        


                for(let i=0; i<this.result.document_type.length; i++){
                    if(this.result.document_type[i] == 'PRM'){
                        this.showPrm = true;
                    }
                }

                for(let i=0; i<this.result.document_type.length; i++){
                    if(this.result.document_type[i] == "Contractor's Billing"){
                        this.showCb = true;
                    }
                }

                // for(let i=0; i<this.result.contractor_categories.length; i++){
                //     if(this.result.contractor_categories[i] == "Contractor's Billing"){
                //         this.showPrm = true;
                //     }
                // }
                console.log('response', this.result)
            })
        },
        changeStatus(val){
            
            this.perLength = [];

            if(this.result.permissions.length){

                // for(let i=0; i<this.result.permissions.length; i++){
                //     if(this.result.permissions[i] == 'Tagging of Request'){
                //         this.showDocType = !this.showDocType
                //     }
                // }
                this.perLength = this.result.permissions
                if(val == 'Tagging of Request'){
                    this.showDocType = !this.showDocType
                    this.isPermission = false
                    this.result.document_type = []
                    this.result.prm_categories = []
                    this.result.contractor_categories = []
                    this.showPrm = false
                    this.showCb = false
                    this.taggingRequest = true
                }
            }else{
                this.showDocType = false
                this.showPrm = false
                this.showCb = false
                this.perLength = []
                this.taggingRequest = false
                
                    

            }
           

        },

        docTypeStat(val){
            if(this.result.permissions.length){
                if(val == 'PRM'){
                    this.result.prm_categories = []
                    this.showPrm = !this.showPrm
                    this.isCheckAll = false;
                }else if(val == "Contractor's Billing"){
                    this.result.contractor_categories = []
                    this.showCb = !this.showCb
                    this.isCheckAllContractor = false;
                }
            }else{
                this.showPrm = false
                this.showCb = false
            }
        }

        
    }

}
</script>



<style scoped>
.disable{
    cursor:not-allowed;
}
.permissions_cb, .doctype_cb{
    cursor:pointer;
}

.btn-disabled{
    cursor: not-allowed;
}

.employee-list{
    min-width:500px !important;
}



p{
    display:inline;
    text-transform:uppercase;
    color:rgb(97, 97, 97);
}

span.username{
    text-transform:lowercase;
}

.grid-check{
    display:grid;
    grid-template-columns:repeat(2, 1fr)
}


.auser form{
    min-width:80%;
}
.add-user{
    display:flex;
    justify-content:center;
}
.form-group *{
    width:100%;
}

.form-group input{
    width:100%;
}

.grid-container{
    display:grid;
    grid-template-columns:repeat(2, 1fr);
    gap:10px;
    position:relative;   
}

.user-info{
    grid-column:2/4;
    overflow:auto;
}

.auser:nth-child(1){
    border-right:1px solid rgb(228, 227, 227);
}

.auser{
    
    height:calc(100vh - 80px);
    padding:10px;
    box-sizing:border-box;

}

    
</style>