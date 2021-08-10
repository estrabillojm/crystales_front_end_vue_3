<template>
    <div id="cr-grid">
        <div class="sidebar-container">
        <Sidebar/>
        </div>
        <div class="main-container p-5">
            <Navbar/>
            

            <div class="content">
                
                <div class="detailsContainer">
                    <div class="user-info p-3">
                        <div class="row">
                            <div class="col-md-12 col-lg-4">
                                <p><strong>Transaction Number :</strong> 103245</p>
                                <p><strong>Tagged Number :</strong> 1032</p>
                                <p><strong>Document :</strong> Payment Request Memo</p>
                                <p><strong>Company :</strong>  Fresh Options </p>
                                <p><strong>Supplier :</strong>  Supplier 1 </p>
                            </div>

                            <div class="col-md-12 col-lg-4">
                                <p><strong>Document Number :</strong> 109839</p>
                                <p><strong>PO/s :</strong> 101245</p>
                                <p><strong>Receipt/s :</strong> 101245</p>
                                
                                <p><strong>Requested By :</strong> Vince Louie Abad</p>
                                <p><strong>Department :</strong> Management Information System</p>
                            </div>


                            <div class="col-md-12 col-lg-4">
                                <p><strong>Document Number :</strong> 109839</p>
                                <p><strong>PO/s :</strong> 101245</p>
                                <p><strong>Receipt/s :</strong> 101245</p>
                                
                                <p><strong>Requested By :</strong> Vince Louie Abad</p>
                                <p><strong>Department :</strong> Management Information System</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="small progress-cont">
                <div class="trace">
                    <div class="chart-grid">
                        <div class="pt-5 progress-icon">
                            <div class="lines"></div>
                            <span class="material-icons">circle</span>
                        </div>

                        <div class="pt-5 progress-icon">
                            <div class="lines"></div>
                            <span class="material-icons">circle</span>
                        </div>
                        <div class="pt-5 progress-icon">
                            <div class="lines"></div>
                            <span class="material-icons bigger-active">circle</span>
                        </div>
                        <div class="pt-5 progress-icon">
                            <div class="lines"></div>
                            <span class="material-icons">circle</span>
                        </div>
                        <div class="pt-5 progress-icon">
                            <div class="lines"></div>
                            <span class="material-icons">circle</span>
                        </div>
                        <div class="pt-5 progress-icon">
                            <div class="lines"></div>
                            <span class="material-icons text-success">circle</span>
                        </div>
                        <div class="pt-5 progress-icon">
                            <div class="lines"></div>
                            <span class="material-icons">circle</span>
                        </div>
                        <div class="pt-5 progress-icon">
                            <div class="lines"></div>
                            <span class="material-icons">circle</span>
                        </div>
                        <div class="pt-5 progress-icon">
                            <div class="lines"></div>
                            <span class="material-icons">circle</span>
                        </div>
                        <div class="pt-5 progress-icon">
                            <div class="lines process-end"></div>
                            <span class="material-icons">circle</span>
                        </div>

                        

                    </div>
                    
                    <div class="chart-grid">

                        

                        <div>
                            <p>Tagging</p>
                        </div>

                        <div>
                            <p>Identifying</p>
                        </div>

                        <div>
                            <p class="text-success">Distribution</p>
                        </div>

                        <div>
                            <p>Voucher Creation</p>
                        </div>

                        <div>
                            <p>Voucher Validation</p>
                        </div>
                        

                        <div ><p>Gas Recording</p></div>

                        <div>
                            <p>Approving of Voucher</p>
                        </div>

                        <div>
                            <p>Creation of Cheque</p>
                        </div>

                        <div>
                            <p>Releasing of Cheques</p>
                        </div>

                        <div>
                            <p>Clearing of Cheques</p>
                        </div>
                        
                    </div>
                </div>
                </div>

                <div class="transactionHistory">
                    <div :class="{transaction: true, done: true, rejected: index == 1}" v-for="index in 15" :key="index">
                        <p class="head font-weight-bold">AP Tagging</p><br>
                        <p class="body sub-head">Irish Rivera</p><br>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

export default {
    data(){
        
    },
    methods:{
        backRoute(){
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
    .progress-icon span{
        color:#ccc;
        font-size:30px !important;
    }


    .lines{
        border-bottom:5px solid #ccc;
        position:relative;
        z-index:1;
        top:18px;
        width:100%;
        left:50%;
    }


    .process-end{
        border-bottom:5px solid rgba(158, 158, 158, 0);
    }


    .chart-grid{
        display:grid;
        grid-template-columns: repeat(10, 1fr);
    }

    .chart-grid div{
        padding-top:10px;
        flex-direction:column;
        display:flex;
        justify-content:center;
        font-size:13px;
    }

    .chart-grid div p{
        text-align:center;
  
    }

    .chart-grid div span{
        text-align:center;
        font-size:20px;
        position:relative;
        z-index:100;
    }




    .btn-cont{
        display:flex;
        justify-content: flex-end;
        border-radius:3px;
    }

    .btn-cont button{
        padding: 3px 13px;
        border: none;
        border-radius: 3px;
        cursor:pointer;
    }

    #cr-grid .main-container{
        /* max-height:100vh; */
    
        background:rgba(255, 255, 255, 0.13);
    }
    .small .trace{
        background:rgb(255, 255, 255);
        border-radius:7px;
        border:1px solid #ccc;
    }
    
    .body{
        margin-left:10px;
        font-size: 12px;
    }

    .head{
        font-size:18px;
    }

    .transaction{
        padding:10px;
    }

    .done , .rejected{
        border:1px solid #ccc;
        margin-right:5px;
        background:rgba(255, 255, 255, 0.685);
        border-left: 5px solid rgb(212, 212, 212);
        cursor: pointer;
    }

    .current{
        border:1px solid #ccc;
        margin-right:5px;
        background:rgba(184, 255, 184, 0.781);
        border-left: 5px solid rgb(11, 199, 11);
        cursor: pointer;
    }

    .rejected{
        border:1px solid #ccc;
        margin-right:5px;
        background: rgba(250, 170, 170, 0.781);
        border-left: 5px solid rgb(250, 103, 103);
    }

    .rejected *{
        color:rgb(0, 0, 0);
    }



    .content{
        
        grid-template-columns:repeat(2, 1fr);
        grid-auto-rows: minmax(117px, auto);
        display:grid;
 
        gap:10px;
        max-height: calc(100vh - 80px);

    }

    .user-info p{
        display:block;
        color:#4e4e4e;
    }

    .progress-cont{
        grid-column:1/8;
    }
    
    .detailsContainer{
        background: rgba(255, 255, 255, 0.788);
        grid-row: 1/2;   
        grid-column:1/8;
        border: 1px solid rgb(199, 199, 255);
        border-radius: 5px;
    }

    .transactionHistory{
        
        grid-row: 3/5;
        grid-column:1/8;
        grid-template-columns: 1fr;
        grid-auto-rows:minmax(60px, auto);
        display:grid;
        overflow-y:scroll;
        max-height: calc(100vh - 430px);
    }

    .sub-head{
        font-size:16px;
    }

    


</style>