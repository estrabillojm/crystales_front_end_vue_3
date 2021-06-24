<template>
    <div class="modal fade">
    <div class="modal-dialog" id="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">

        <div class="modal-header">
            <slot name="modal-header" class="header-text"></slot> 
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          
        </div>
        <div class="modal-body">
          
          <form>

            <slot name="modal-body">
              
            </slot>
          </form>

        </div>
      </div>
      
    </div>
  </div>
  

</template>

<script>
export default {

}
</script>

<style scoped>

.modal-body{
  display:flex;
  justify-content:center;
}
  .modal-dialog{
    min-width:40%;
    min-height:00px;
  }
  form{
    min-height:300px;
  }
</style>