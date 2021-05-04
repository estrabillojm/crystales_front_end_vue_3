<template>
  <div class="home">
    <div class="login">
      <div class="color top-color"></div>
      
      <div class="login-form">
        <form @submit.prevent="loginUser">
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
            <input type="text" placeholder="Username">
          </div>

          <div class="f-group">
            <span class="material-icons user-icon">
              vpn_key
            </span>
            <input type="password" placeholder="Password">
          </div>

          <div class="f-group group-btn">
            <button>Sign In</button>
          </div>
          
        </form>
      </div>

      <div class="color bottom-color"></div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    
  },
  methods:{
    loginUser(){
      this.$router.push('/users')
    }
  }
}
</script>

<style scoped>
  @import '../assets/css/home-style.css';
</style>