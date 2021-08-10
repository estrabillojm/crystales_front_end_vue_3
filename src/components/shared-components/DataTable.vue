<template>
  <div class="content pt-0">
      
      <div class="cr-datatable">
            <div class="cr-data-btn">
                <ul class="request crystales-logo" v-if="headerTitle">
                    <!-- <slot name="tb-extra-btn"
                    </slot> -->
                    <img src="../../assets/icon.png" class="logo">
                    <span class="header-info">{{ headerTitle }}</span>

                </ul>
                <ul>
                    <slot name="tb-btn-tab">
                                    
                    </slot>
                </ul>
            </div>
            <div class="cr-data-content">
                <div class="flex-parent">
                    <div class="flex-input-1">
                        <ul class="request p-0 mb-1">
                            <slot name="tb-extra-btn">
                            
                            </slot>
                        </ul>
                    </div>
                    <div class="flex-input p-0 mb-1">
                        <span class="material-icons search-ic">
                            search
                        </span>
                        <slot name="tb-search">
                        
                        </slot>
                    </div>
                </div>
                

                <div class="flex-table">
                    <table>
                        <thead class="thead table-header">
                            <tr>
                                <slot name="tb-header">
                                    
                                </slot>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <slot name="tb-no-data">
                                    
                                </slot>
                            </tr>
                            <slot name="tb-data">
                                
                            </slot>
                        </tbody>
                    </table>
                    <hr>
                </div>
            </div>
        </div>
        <div class="paginate">
            <slot name="tb-paginate">

            </slot>
        </div>
        

  </div>
</template>

<script>
import Loading from './Loading'
import { mapState } from 'vuex'
import axios from 'axios'
export default {
    components: { Loading },
    computed:{
        ...mapState(['headerTitle'])
    }

    
}
</script>

<style>

    .header-info{
        font-size:20px;
        color:#7a7e88;
        position:relative !important;
        top:-10px;

    }
    


    .color-yellow{
        position:absolute;
        background:#ffd24c;
        box-shadow: 0px 0px -5px black;
        min-width:100%;
        height:30px;
        transform:rotateZ(2deg);
        z-index:99;
        left:5px;
        bottom:4px;
    }

    .search-ic{
        left:7px;
        
    }


    .flex-input-1{
        display:flex;
        flex-flow:column;
        justify-content:center;
        position:relative;
        border-radius:5px;
    }

    .flex-parent{
        display:flex;
        justify-content: space-between;
        background:rgba(70, 70, 70, 0);
        
    }

    .paginate{
        width:100%;
        display:flex;
        justify-content:flex-end;
    }

    .paginate-page{
        font-size:22px;
        color:rgb(37, 37, 37);
    }

    .paginate-btn{
        padding:2px 7px;
        border-radius:5px;
        border:#ccc;
        width:100px !important;
        cursor:pointer;
    }

    .thead tr th{
        padding-left:15px !important;
    }
    .cr-nav{
        height:80px;
        display:flex;
        justify-content:flex-end;
        align-items:center;
    }

    .cr-user{
        color:rgb(245, 245, 245);
        padding-right:2%;
        font-weight:600;
    }

    
 
    tbody tr td{
        color:#1b51be;
        padding:5px 0;
        padding-left:15px;
    }

    tbody tr:nth-child(even){
        background:rgb(247, 247, 247);
    }

    tbody tr:nth-child(odd){
        background:white;
    }

    tbody tr{
        border:1px solid #e0e0e0;

    }

    .flex-input input{
        border:1px solid #9e9e9e;
        /* border-radius:0 3px 3px 0 !important; */
        right:0;
        height:38px;
        position:relative;
        margin:0;
        color:#061a43;
        background:rgba(255, 255, 255, 0.445);
        position:relative;
        z-index:1;
    }

    .btn-group{
    margin-bottom:8px !important;
  }

  .btn-group .btn-primary{
    background:none;
    color:#061a43;
    padding:3px 13px;
  }

  .btn-group .active-nav{
    background:#e9e9e9 !important;
    border-radius:1px;
    color:#7a7e88 !important;
    font-weight:bolder;
    padding:3px 13px;
    box-sizing:border-box;
  }

  .content{
      position: relative;
      top:-20px !important;
  }

  .cr-data-content{
      background:transparent;
      position: relative;
  }

  .crytales-logo{
      position:relative;
  }

  .crystales-logo img{
      max-width: 40px;
      opacity:.7;
      position: absolute;
      top:-17px;
      left:-10px;
  }

  .crystales-logo span{
      position: absolute;
      top: -10px;
      left: -7px;
  }

</style>