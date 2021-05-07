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
                    <input type="text" class="employeeId form-control" required v-model="userData.employee_id" @keyup="findUser(userData.employee_id)"> 
                    <p class="error pt-1" v-if="userData.employee_id.length > 1 && error">Employee ID not yet registered</p>
                </div>

                <div class="form-group fg">
                    <label for="#">Role</label>
                    <select class="form-control" v-model="userData.role" required @change="onChange(userData.role)">\
                        <option value="">Select Role</option>
                        <option v-for="role in roles" :value="role.name" :key="role.id">
                        {{ role.name }}
                        </option>
                    </select>
                </div>

                <span  v-if="userData.role" class="grid-check">
                    
                    <p><strong>{{ userData.role }} Privilege</strong></p>
                     <br>
                    
                    <div class="form-check" v-for="prm in permissions" :key="prm.id">
                        <span v-for="cp in checkedPermissions" :key="cp">
                            <input type="checkbox" :id="`rt${prm.id}`" checked v-if="cp == prm.name" name="permi" @change.once="onUnMark(prm.name)" class="permissions_cb" @click="resetDocType()">
                        </span>
                            
                        <span v-for="ucp in uncheckedPermissions" :key="ucp">
                            <input type="checkbox" v-if="ucp == prm.name" name="permi" :value="prm.name" :id="`rt${prm.id}`" @change.once="onMark(prm.name)" class="permissions_cb">
                        </span>

                        <span v-if="uncheckedPermissions.length != 0 || checkedPermissions.length != 0">
                            &nbsp; <label :for="`rt${prm.id}`" class="permissions_cb">{{ prm.name }}</label>
                        </span>
                    </div>     
                </span>

                <span v-if="userData.role && result.length != 0 && checkedPermissions.length != 0 && !taggingRequest">
                    <button type="submit" class="btn btn-sm btn-primary mt-4">Sign Up</button>
                </span>

                <span v-else-if="taggingRequest && !showPrm && prmCategory.length == 0 && userData.docType.length != 0 && !showCb">
                    <button type="submit" class="btn btn-sm btn-primary mt-4">Sign Up</button>
                </span>

                <span v-else-if="taggingRequest && showCb && contractorCategory.length != 0 && userData.docType.length != 0 && showPrm && prmCategory.length !=0">
                    <button type="submit" class="btn btn-sm btn-primary mt-4">Sign Up</button>
                </span>

                <span v-else-if="taggingRequest && showPrm && prmCategory.length != 0 && !showCb && contractorCategory.length == 0">
                    <button type="submit" class="btn btn-sm btn-primary mt-4">Sign Up</button>
                </span>

                <span v-else-if="taggingRequest && !showPrm && prmCategory.length == 0 && showCb && contractorCategory != 0">
                    <button type="submit" class="btn btn-sm btn-primary mt-4">Sign Up</button>
                </span>

                
            
                <span v-else>    
                    <button type="submit" class="btn btn-sm btn-primary mt-4 btn-disabled" disabled>Sign Up</button>
                </span>
                <router-link :to="{name: 'Users'}">
                    <button class="btn btn-sm btn-default mt-4 ml-1" title="Back to User Masterlist"><span class="material-icons">east</span></button>
                </router-link>
                <div class="form-group">
                </div>
            </form>
           
        </div>
       
        <div class="grid-header">
            
            <div class="auser user-info" v-for="res in result" :key="res.id">
                <div class="col-md-12 mt-3 row">                  
                    <div class="col-md-12">
                        <h3>
                            <span id="lastname">{{ `${res.lastname}` }}</span>, 
                            <span id="firstname">{{ `${res.firstname}` }}</span>{{ " " }}
                            <span> {{ res.middlename[0].toUpperCase()}}</span>.
                            <input type="hidden" id="middlename" :value="res.middlename">
                        </h3>
                    </div>

                    <div class="col-md-12 auser-address">
                    <p><strong>Employee ID : </strong>{{ res.id_number }}</p>
                    <br>
                    <p><strong>Department : </strong><span id="department">{{ res.department }}</span></p>
                    <br>
                    <p><strong>Username : </strong><span id="username">{{ `${res.firstname.charAt(0).toLowerCase()}${res.lastname.toLowerCase()}-${res.id_number}`  }}</span></p>
                    <hr>
                    
                        <span v-for="cp in checkedPermissions" :key="cp.id">
                            <span v-if="cp =='Tagging of Request'">
                                <p class=""><strong>Document Type</strong><em> (For Tagging of Documents)</em></p>
                                
                                <div class="mt-3">
                                    <div class="row">
                                        <div class="col-md-4" v-for="type in documentTypes" :key="type.id">
                                            <input type="checkbox" name="" :id="`tor${type.id}`" class="doctype_cb" :value="type.name" v-model="userData.docType" @change="torChange(type.name)">
                                            <label :for="`tor${type.id}`"  class="doctype_cb">&nbsp; {{ type.name }}</label>
                                        </div>
                                    </div>  
                                </div>
                            </span>
                            <hr>
                        </span>
                        <!-- SHOW PRM CATEGORY -->
                        <span v-if="showPrm">
                            <span v-for="cp in checkedPermissions" :key="cp.id">
                                <span v-if="cp =='Tagging of Request'">
                                    <p class=""><strong>PRM Category</strong></p>

                                    <div class="mt-3">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <input type="checkbox" id="checkAll" @change="checkAll()" class="doctype_cb">
                                                <label  class="doctype_cb" for="checkAll"> &nbsp; <strong> Check All</strong></label>
                                            </div>
                                        </div>  
                                    </div>
                                    
                                    <div class="">
                                        <div class="row">
                                            <div class="col-md-6" v-for="sPrm in prm" :key="sPrm.id">
                                                <input type="checkbox" class="doctype_cb" :id="`prm${sPrm.id}`" :class="{selectedPrm: sPrm.name!='confidential request'}" :value="sPrm.name" @change="confidentialRequest(sPrm.name)" v-model="prmCategory">
                                                <label :for="`prm${sPrm.id}`" class="doctype_cb"> &nbsp; {{ sPrm.name }}</label>
                                            </div>
                                        </div>  
                                    </div>
                                </span>
                            </span>
                            <hr>
                        </span>

                        



                        <!-- SHOW CONTRACTORS BILL CATEGORY -->
                        <span v-if="showCb">
                            <span v-for="cp in checkedPermissions" :key="cp.id">
                                <span v-if="cp =='Tagging of Request'">
                                    <p class=""><strong>Contractor's Billing Category</strong></p>

                                    <div class="mt-3">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <input type="checkbox" id="checkAllContractor" @change="checkAllContractor()" class="doctype_cb">
                                                <label  class="doctype_cb" for="checkAllContractor"> &nbsp; <strong> Check All</strong></label>
                                            </div>
                                        </div>  
                                    </div>
                                    
                                    <div class="mt-3">
                                        <div class="row">
                                            <div class="col-md-6" v-for="sCb in contractor" :key="sCb.id">
                                                <input type="checkbox" class="doctype_cb" :id="`cb${sCb.id}`" :value="sCb.name" @change="unCheckAll()" v-model="contractorCategory">
                                                <label :for="`cb${sCb.id}`" class="doctype_cb"> &nbsp; {{ sCb.name }}</label>
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
            taggingRequest: false,
            isCheckAll: false,
            isCheckAllContractor: false,
            confidentialAccess: false,
           
        }
    },
    created(){
        
        this.$store.dispatch('loadPermissions')
        this.$store.dispatch('loadPrmCategory')
        this.$store.dispatch('loadContractorsCategory')
        this.$store.dispatch('loadDocType')
        
        
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
        unCheckAll(){
            $('#checkAllContractor').prop('checked', false)
            this.isCheckAllContractor = false
        },

        confidentialRequest(cr){
            if(cr == "confidential request"){
                this.confidentialAccess = !this.confidentialAccess
            }else{
                $('#checkAll').prop('checked', false)
                this.isCheckAll =  false
            
            }
        },

        checkAllContractor(){
            this.contractorCategory = [] 
            this.isCheckAllContractor = !this.isCheckAllContractor
            
            if(this.isCheckAllContractor){ 
                // Check all 
                for (var key in this.contractor) {   
                    this.contractorCategory.push(this.contractor[key].name);          
                } 
            } 
        },

        checkAll(){ 
            this.isCheckAll = !this.isCheckAll; 
            this.prmCategory = []; 
            if(this.isCheckAll){ 
                // Check all 
                for (var key in this.prm) {   
                    if(this.prm[key].name != "confidential request"){
                        this.prmCategory.push(this.prm[key].name); 
                    }
                                  
                } 
            }         
        },


        torChange(val){
            if(val == 'PRM'){
                this.showPrm = !this.showPrm
                this.prmCategory = []

                    


                
                
            }else if(val == "Contractor's Billing"){
                this.showCb = !this.showCb
                this.contractorCategory = []
                
            }
        },
        resetDocType(){
            for(let i=0; i<this.checkedPermissions.length; i++){
                var arr = this.checkedPermissions
                var index = arr.indexOf("Tagging of Request")
                if(index > -1){
                    this.userData.docType = []
                }
            }
        },
        async findUser(eid){
            this.error = false;
            axios.get(`/api?id_number=${eid}`).then((res)=>{
               this.result = res.data
               
               if(this.result.length){
                   this.error = false
                    setTimeout(()=>{
                        this.userData.lastname = $("#lastname").text()
                        this.userData.firstname = $("#firstname").text()
                        this.userData.middlename = $("#middlename").val()
                        this.userData.username = $("#username").text()
                        this.userData.department = $("#department").text()
                    },2000)
               }else{   
                   this.error =true;
               }
            })
        },
        onChange(da){

            
            this.uncheckedPermissions = [];
            this.checkedPermissions = [];
            this.defaultPermissions = []
            this.checkedPermissions = []
            this.uncheckedPermissions = []
            this.prmCategory = []
            this.contractorCategory = []
            this.userData.docType = []
            this.showPrm = false
            this.showCb = false

           

            if(da != ''){

                if(da==='Requestor' || da==='AP Tagging'){
                    this.taggingRequest = true;
                }else{
                    this.taggingRequest = false;
                }
                
                for(let i=0; i<this.permissions.length-1; i++){
                   
                    if(this.roles[i].name === da){
                        let userPer = this.roles[i].def_perm
                        userPer.forEach((data)=>{
                            this.checkedPermissions.push(data);
                            
                            for(let j=0; j<this.checkedPermissions.length; j++){
                                this.permissions.forEach(opp=>{
                                    if(userPer[j] !== opp.name){
                                    
                                        if(!this.uncheckedPermissions.includes(opp.name)){
                                            this.uncheckedPermissions.push(opp.name);
                                        }
                                    }
                                })

                            }
                            
                        })
                        break;
                    }
                }
                for(let i=0; i<this.checkedPermissions.length; i++){
                    var arr = this.uncheckedPermissions
                    var index = arr.indexOf(this.checkedPermissions[i])
                    if(index > -1){
                        arr.splice(index, 1);
                    }
                }
                
            


            }
        },


        onMark(val){

            if(val === 'Tagging of Request'){
                this.taggingRequest = true;
                
            }
            this.checkedPermissions.push(val)

            for(let i=0; i<this.checkedPermissions.length; i++){
                var arr = this.uncheckedPermissions
                var index = arr.indexOf(this.checkedPermissions[i])

                if(index > -1){
                    arr.splice(index, 1);
                }
            }

        },

        onUnMark(val){

            if(val === 'Tagging of Request'){
                this.taggingRequest = false;
                
            }

           
            if(val ===  "Tagging of Request"){
                this.prmCategory = []
                this.contractorCategory = []
                this.showPrm = false
                this.showCb = false

            }

            this.uncheckedPermissions.push(val)

            for(let i=0; i<this.uncheckedPermissions.length; i++){
                var arr = this.checkedPermissions
                var index = arr.indexOf(this.uncheckedPermissions[i])

                if(index > -1){
                    arr.splice(index, 1);
                }
            }            
        },

        // onTick(val){

        //     for(let i=0; i<this.checkedPermissions.length; i++){
        //         var arr = this.checkedPermissions
        //         var index = arr.indexOf(this.checkedPermissions[i])

        //         if(index > -1){
        //             arr.pop(index, 1);
        //         }
        //     }

            
        // },
        userSubmit(){

            Swal.fire({
                title: 'Do you want to save this data?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Save`,
                denyButtonText: `Don't save`,
                }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Saved!', '', 'success')
                    axios.post('/users', 
                    {
                        "user_id": this.userData.employee_id,
                        "username": this.userData.username,
                        "lastname": this.userData.lastname,
                        "middlename": this.userData.middlename,
                        "firstname": this.userData.firstname,
                        "role": this.userData.role,
                        "document_type": this.userData.docType,
                        "permissions": this.checkedPermissions,
                        "password": this.userData.username,
                        "department": this.userData.department,
                    }
                    ).then(()=>{
                
                        setTimeout(()=>{
                            this.$router.push({name: 'Users'})
                        }, 2000)
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