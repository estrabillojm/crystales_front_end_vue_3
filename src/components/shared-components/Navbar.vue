<template>
  <nav class="cr-nav">
      <p class="cr-user">
          {{ result.last_name }}, {{ result.first_name }}
      </p>
  </nav>
</template>


<script>
import axios from 'axios'
export default {
    created(){
        this.checkCookie()
    },
    data(){
        return {
            userId: null,
            result: []
        }
        
    },

    methods:{
        getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      },
      checkCookie() {
        
          let role = this.getCookie("role");
          this.role = role

          let id = this.getCookie("id");
          this.userId = id
          
            axios.get(`/users/${this.userId}`).then(res=>{
              this.result = res.data
            })
      },
    }

}
</script>

<style>
    .cr-nav{
        background-color:#596FEC;
        height:80px;
        display:flex;
        justify-content:flex-end;
        align-items:center;
    }

    .cr-user{
        color:rgb(245, 245, 245);
        padding-right:5%;
        font-weight:600;
    }
</style>