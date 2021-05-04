<template>
  
  <router-view/>
</template>

<style>
*{
  padding:0;
  margin:0;
}

.error{
  color:red;
  font-weight:bold;
}


/* PAGE TRANSITION */

.route-enter-from{
  opacity:.3;
  transform: translateX(100px)
  
}

.route-enter-active{
  transition:all .5s ease;
}

.route-leave-to{
  opacity:.3;
  transform: translateX(-100px)  
}

.route-leave-active{
  transition:all .5s ease;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.text-center{
  text-align:center;
}

#cr-grid{
  display:grid;

  grid-template-columns:repeat(12, 1fr);
}

.sidebar-container{
  position:relative;
  grid-column:1/3;
}

.main-container{
  grid-column:3/13;
  box-sizing:border-box;
}

.content{
  padding:10px 1%;
}


.cr-data-btn ul{
  margin:0;
}

.cr-data-btn ul button.active{
  padding: 5px 20px;
  border:none;
  cursor:pointer;
  background:#172B4D;
  opacity:1;
  color:white;
}


.cr-data-btn ul .request-btn{
  background:#34D206;
}

.cr-data-btn ul button:focus{
  outline:none;
  border:none;
}
.cr-data-btn ul.request button:hover{
    background:#6dd84d;
}

.cr-data-btn ul button:hover{
  background:#223a63;
}



.cr-data-btn ul button{
  padding: 5px 20px;
  border:none;
  cursor:pointer;
  background:#172B4D;
  opacity:.81;
  color:white;
}


.cr-data-btn{
  display:flex;
  justify-content:space-between;
}

.cr-data-content{
  background:#172B4D;
  width:100%;
  
  margin-top:0;

}

.flex-input{
  display:flex;
  justify-content:flex-end;
  padding:5px 1%;
  position:relative;
  align-items:center;
}

.flex-input input{
  height:35px;
  border-radius:17.5px;
  width:300px;
  outline:none;
  border:1px solid #FFFFFF;
  background:none;
  color:white;
  padding-left:40px;
}

.flex-input .search-ic{
  color:#959EAD;
  position:absolute;
  right:275px;  
}

.flex-table table{
  width:100%;
}

.flex-table .thead{
  color:white;
  background:#1C345D;
  height:30px;

  
}

.flex-table .thead th{
  padding:10px 5px;
  color:#596FEC;
}




</style>
