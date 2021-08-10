<template>
  <div class="home2">
    <div class="login-div">
      <div class="login-sub">
        <form @submit.prevent="loginUser" class="login-2">
          <div class="f-group group-logo image-logo">
            <img src="../assets/logo_wt_1.png" class="login-logo">
          </div>
          
          <div class="form-area">
            <div class="form-group">
              <!-- <span class="material-icons user-icon">
                account_circle
              </span> -->
              <input type="text" class="text-box" placeholder="Username" v-model="username">
            </div>
            <div class="form-group">
              <!-- <span class="material-icons user-icon">
                vpn_key
              </span> -->
            
              <input type="password" class="text-box" placeholder="Password" v-model="password">
              
              
            </div>


            <div class="btn-container" v-if="!username || !password">
              <button type="button" class="btn disable text-dark" disable>Sign In</button>
            </div>
            <div class="btn-container" v-else>
              <button type="submit" class="btn btn-success">Sign In</button>
            </div>
          </div>
          
        </form>
      </div>


    
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import Swal from 'sweetalert2'


export default {
  name: 'Home',
  components: {
    
  },
  data(){
    return {
      token: '',
      username: '',
      password: '',
      error: '',
      userId: '',
    }
  },
  created(){


    
  },
  methods:{
    loginUser(){

      // axios.get('http://10.10.8.27:8000/sanctum/csrf-cookie').then(res=>{
        // console.log(res.data)

        this.$router.push({name: 'Users'})

        // axios.post(`/login`, {
        //   username: this.username,
        //   password: this.password
        // }).then(res=>{
        //   this.$router.push({name: 'Users'})
        // }).catch(err=>{
        //   console.log(err.response.data.message)
        // })


        
      // }) 
    }
  }
}
</script>

<style scoped>
  /* @import '../assets/css/home-style.css'; */

  .disable{
    cursor:not-allowed;
  }

  .login-logo{
    margin-bottom:15%;
  }

  .login-div{
    
    background-image: url("../assets/login_bg.jpg");
    background-repeat: no-repeat;
    height:100vh;
    background-size:cover;
    overflow:hidden;

    
  }

  .login-sub{
   
    display:flex;
    height:100vh;
    justify-content:center;
    position:relative;
    top:20%;
  }

  .login-2{
    max-height:300px;
    position:absolute;
    display:flex;
    flex-flow: column;
    align-items:center;
  }

  .form-area{
    padding:40px 40px;
    border-radius: 10px;
    background:#ac98f1;
    box-shadow:5px 5px 15px rgba(0, 0, 0, 0.432);
    display:flex;
    flex-flow:column;
    align-items:center;
  }

  .text-box{
    padding:7px;
    padding-left:10px;
    border-radius:30px;
    border:black;
    width:350px;
    margin-bottom:10px;
  }

  .image-logo{
    display:flex;

  }

  .btn-container button{
    border-radius:50px;
    padding:4px 30px;
  }
  
</style>