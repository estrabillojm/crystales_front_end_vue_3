<template>
  <div id="cr-grid">
    <div class="sidebar-container">
      <Sidebar/>
    </div>
    <div class="main-container">
    <Navbar/>
    <div class="grid-container">
        <div class="auser add-user">
            <form>
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

               

                <span class="grid-check">
                    <div class="form-check" v-for="prm in permissions" :key="prm.id">
                        <span v-for="cp in checkedPermissions" :key="cp">
                            <input type="checkbox" :id="prm.name" checked v-if="cp == prm.name" name="permi">
                        </span>
                            


                        <span v-for="ucp in uncheckedPermissions" :key="ucp">
                            <input type="checkbox" v-if="ucp == prm.name" name="permi" :value="prm.name" :id="prm.name" @change.once="onMark(prm.name)">
                        </span>

                        <span v-if="uncheckedPermissions.length != 0 || checkedPermissions.length != 0">
                            &nbsp; <label :for="`${prm.name}`">{{ prm.name }}</label>
                        </span>

   
                    </div>     
                </span>

                

                

               

                



            
    
            


                
                <button type="submit" class="btn btn-sm btn-primary mt-4">Sign Up</button>
                <router-link :to="{name: 'Users'}">
                    <button class="btn btn-sm btn-danger mt-4 ml-1">Cancel</button>
                </router-link>

                <div class="form-group">

                </div>

                

                
                

                
            </form>
        </div>
        <div class="auser user-info" v-for="res in result" :key="res.id">
            <div class="col-md-12 mt-3 row">

                <div class="col-md-12">
                    <h3>{{ `${res.lastname}, ${res.firstname} ${res.middlename[0].toUpperCase()}.` }}</h3>
                </div>

                <div class="col-md-12 auser-address">
                   <p>{{ `${res.brgy}, ` }}</p>
                   <p>{{ `${res.municipality}, ` }}</p>
                   <p>{{ `${res.province}, ` }}</p>
                   <p>{{ `${res.region} ` }}</p>
                   <hr>
                </div>
                




                <div class="col-md-6">
                    <label for="lastname">ID Number</label>
                    <input type="text" class="form-control disable" :value="res.id_number">
                    
                </div>


                <div class="col-md-6">
                    <label for="firstname">Department</label>
                    <input type="text" class="form-control disable" :value="res.department">
                </div>

                <div class="col-md-4 mt-4">
                    <label for="firstname">Date of Birth</label>
                    <input type="text" class="form-control disable" :value="res.department">
                </div>

                <div class="col-md-4 mt-4">
                    <label for="firstname">Civil Status</label>
                    <input type="text" class="form-control disable" :value="res.civil_status.toUpperCase()">
                </div>

                <div class="col-md-4 mt-4">
                    <label for="firstname">Date of Birth</label>
                    <input type="text" class="form-control disable" :value="res.date_of_birth">
                </div>

                <div class="col-md-4 mt-4">
                    <label for="firstname">Gender</label>
                    <input type="text" class="form-control disable" :value="res.gender.toUpperCase()">
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

$(document).ready(function(){
    
})


export default {
    components: { Sidebar, Navbar, DataTable, Modal, Loading},
    data(){
        return {
            userData: {
                employee_id: '',
                role: '',
                permissions: []
            },
            result: [],
            
            error: false,
            defaultPermissions: [],
            checkedPermissions: [],
            uncheckedPermissions: [],
        }
    },
    created(){
        this.$store.dispatch('loadPermissions')
        this.$store.dispatch('loadApi')
    },
    computed:{
        ...mapState([
            'api',
            'permissions',
            'roles'
        ])
        
    },
    methods:{
        findUser(eid){
            this.error = false;
            axios.get(`/api?id_number=${eid}`).then((res)=>{
               this.result = res.data
               if(this.result.length){
                   
                   this.error = false
               }else{   
                 
                   this.error =true;
               }
            })
        },
        onChange(da){
            this.uncheckedPermissions = [];
            this.checkedPermissions = [];

            if(da != ''){
                
                for(let i=0; i<18; i++){
                    //console.log(this.permissions[i].name) // ALL PERMISSIONS
                    // console.log(da) // THIS IS THE ROLE
                    // console.log(this.roles[i].name)
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
                console.log(this.uncheckedPermissions.length);


            }
        },


        onMark(val){
            this.checkedPermissions.push(val)

            for(let i=0; i<this.checkedPermissions.length; i++){
                    var arr = this.uncheckedPermissions
                    var index = arr.indexOf(this.checkedPermissions[i])

                    if(index > -1){
                        arr.splice(index, 1);
                    }
                }

        }
            
            

    }
   
      
      
    
}
</script>



<style scoped>

.employee-list{
    min-width:500px !important;
}



.auser-address p{
    display:inline;
    text-transform:uppercase;
    color:rgb(97, 97, 97);
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