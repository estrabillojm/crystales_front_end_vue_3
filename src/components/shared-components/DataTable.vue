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
                    <input type="text" placeholder="Search">
                </div>

                <div class="flex-table">
                    <table>
                        <thead class="thead">
                            <tr>
                                <slot name="tb-header">
                                    
                                </slot>
                            </tr>
                        </thead>
                        <tbody>
                            <slot name="tb-data">
                                
                            </slot>
                        </tbody>
                    </table>
                </div>
            </div>
      </div>

  </div>
</template>

<script>
import Loading from './Loading'
export default {
    components: { Loading },
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
        padding-right:2%;
        font-weight:600;
    }

    .cr-datatable{   
        height:calc(100vh - 100px);
    }
 
    tbody tr td{
        color:white;
        padding:10px 0;
        padding-left:5px;
    }
</style>