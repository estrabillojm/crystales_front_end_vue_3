<template>
  <div class="content">
      
      <div class="cr-datatable">
            <div class="cr-data-btn">
                <ul class="request">
                    <slot name="tb-extra-btn">
                                    
                    </slot>
                </ul>
                <ul>
                    <slot name="tb-btn-tab">
                                    
                    </slot>
                </ul>
            </div>
            <div class="cr-data-content">
                <div class="flex-input">
                    <span class="material-icons search-ic">
                        search
                    </span>
                    <slot name="tb-search">
                    
                    </slot>
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
        <!-- <button>Previous 2322</button>
        <button>Next 2322</button> -->

  </div>
</template>

<script>
import Loading from './Loading'
import axios from 'axios'
export default {
    components: { Loading },
    
}
</script>

<style>

    .thead tr th{
        padding-left:15px !important;
    }
    .cr-nav{
        background-color:;
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
        color:white;
        padding:10px 0;
        padding-left:15px;
    }
</style>