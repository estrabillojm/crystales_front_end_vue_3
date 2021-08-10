<template>
  <router-view/>
</template>

<style>
*{
  padding:0;
  margin:0;
  box-sizing:border-box;
  font-family: 'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif;
}

.custom-card-bd-img{
    padding: 40px;
    margin: auto;
	  background: rgba(255, 255, 255, 0.568);
	  border: 3px solid transparent;
	  
	  /* border-image: linear-gradient(to right, #a8c2eb 0%, #09c6f9 100%);
	  border-image-slice: 1; */
    border:1px solid #98c6f9;
    border-radius:5px;
    margin-top:25px !important;
}

.grid-header{
  padding-left:20px;
}

.text-no-show{
  color:rgb(179, 179, 179);
  font-size:17px;
}

input[type="checkbox"], label{
  cursor:pointer;
}

label{
  font-weight:550;
}

select, input[type="date"]{
  cursor: pointer;
}

em{
  font-weight:100;
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
  background:url('./assets/bg.png');
  background-repeat:no-repeat;
  background-size:cover;
  
  
}

.sidebar-container{
  position:relative;
  grid-column:1/3;
}

.main-container{
  grid-column:3/13;
  box-sizing:border-box;
  padding:50px 30px;
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




.cr-data-btn ul button:focus{
  outline:none;
  border:none;
}





.cr-data-btn ul button{
  padding: 5px 20px;
  border:none;
  cursor:pointer;
  opacity:.81;
  color:white;
}


.cr-data-btn{
  display:flex;
  justify-content:space-between;
}

.cr-data-content{
  background:white;
  border-radius:10px;
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
  border-radius:15px !important;
 
}

.flex-table .thead{
  color:white;
  background:#045de9;
  height:30px;

  
}

.flex-table .thead th{
  padding:10px 5px;
  color:white;
}


.text-warning{
  color:#7a7e88 !important;
}


.btn-warning{
  color:#7a7e88 !important;
}

.ellipsis{
  display:block;
  width:30px;
}

.setMaxWidth *{
  cursor: pointer;
}

</style>
