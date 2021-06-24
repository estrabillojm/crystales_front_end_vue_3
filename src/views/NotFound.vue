<template>
  <div class="home">
    <div class="login">
      <div class="color top-color"></div>
      
      <div class="login-form">
        <form @submit.prevent="loginUser" class="login-form">
          <div class="f-group group-logo">
            <img src="../assets/logo_bk.png" class="login-logo">
          </div>

          <div class="line-cont">
            <div class="line"></div>
          </div>
          
          <div class="f-group">
            <span class="material-icons user-icon">
              account_circle
            </span>
            <input type="text" placeholder="Username" v-model="username">
          </div>
          <div class="f-group">
            <span class="material-icons user-icon">
              vpn_key
            </span>
          
            <input type="password" placeholder="Password" v-model="password">
            
            
          </div>


          <div class="f-group group-btn" v-if="!username && !password">
            <button type="button" class="disable text-dark" disable>Sign In</button>
          </div>
          <div class="f-group group-btn" v-else>
            <button type="submit">Sign In</button>
          </div>
          
        </form>
      </div>

      <div class="color bottom-color"></div>
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
      error: ''
    }
    
  },
 
  methods:{
    loginUser(){
      axios.post(`/login`, {username: this.username, password: this.password}).then(res=>{
        document.cookie = `token=${res.data.token}`
        console.log(document.cookie)
  
        this.$router.push({name: "Users"})
      }).catch(err=>{
        // console.log("err", err.data)
        // Swal.fire(this.error.message)
        
      })
    }
  }
}
</script>

<style scoped>
  @import '../assets/css/home-style.css';

  .disable{
    cursor:not-allowed;
  }
</style>