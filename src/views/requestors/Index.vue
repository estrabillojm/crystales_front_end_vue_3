<template>
  <div id="cr-grid">
    <div class="sidebar-container">
      <Sidebar/>
    </div>
    <div class="main-container">
      <Navbar/>

      <!-- MODAL FOR REQUEST -->
      <Modal id="myModal" role="dialog">
        <template v-slot:modal-header  class="text-center">
          <p>Request for Tagging</p>
        </template>
        <template v-slot:modal-body>
          <div class="header-input">
            <div class="input-grp">
              <label for="">Select Document Type</label>
              <input type="text">
            </div>
          </div>
          <div class="grid-parent">
            <div class="first-input-group">
              <div class="input-grp mb-3">
                <label>Payment Type</label>
                <select class="input">
                  <option value="">FULL</option>
                  <option value="">PARTIAL</option>
                </select>
              </div>

              <div class="input-grp mb-3">
                <label for="">Document Number</label>
                <input type="text">
              </div>

              <div class="input-grp mb-3">
                <label for="">Document Date</label>
                <input type="text">
              </div>

              <div class="input-grp mb-3">
                <label for="">Document Amount</label>
                <input type="text">
              </div>
            </div>





            <div class="second-input-group">
              <div class="input-grp mb-3">
                <label for="">Company</label>
                <input type="text">
              </div>

              <div class="input-grp mb-3">
                <label for="">Supplier</label>
                <input type="text">
              </div>

              <div class="input-grp mb-3">
                <label for="">Remarks</label>
                <textarea name="" id=""></textarea>
              </div>
            </div>
          </div>

          
        </template>
      </Modal>






      



      <!-- TABLE MODAL -->
      <span v-if="posts.length">
      <DataTable>


        <template v-slot:tb-extra-btn>
          <button class="request-btn" type="button" data-toggle="modal" data-target="#myModal">New Request</button>
        </template>

        <template v-slot:tb-btn-tab>
          <button class="active">Requested</button>
                    
        </template>
        <template v-slot:tb-header>
          <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
            <th>Column 5</th>
            <th>Column 6</th>
            <th>Column 7</th>
            <th class="text-center">Column 8</th>
        </template>

        <template v-slot:tb-data>
          <tr v-for="post in posts" :key="post.id" class="hovered">
            <td>{{ post.id }}</td>
            <td>{{ post.name }}</td>
            <td>{{ post.email }}</td>
            <td>{{ post.username }}</td>
            <td>
              {{ `${post.address.street} , ${post.address.city}` }}
            </td>
            <td>{{ post.phone }}</td>
            <td>{{ post.website }}</td>
            <td class="text-center">
                <a href="#" class="text-white" data-toggle="modal" :data-target="'#myModal' + post.id" @click.self="getSinglePost(post.id)">
                  <span class="material-icons">visibility</span>
                </a>
            </td>






            <!-- MODAL -->
            <Modal :id="`myModal${post.id}`" role="dialog">
              <template v-slot:modal-header>
                <p class="text-center">Transaction</p>
              </template>
              <template v-slot:modal-body>
                <div class="modal-grid">
                  <div> 
                    <p class="text-sm">Transaction Number</p>
                    <p class="font-weight-bold">{{ post.id }}</p>
                  </div>

                  <div> 
                    <p class="text-sm">Document type</p>
                    <p class="font-weight-bold">{{ post.name }}</p>
                  </div>

                  <div> 
                    <p class="text-sm">Document Number</p>
                    <p class="font-weight-bold">{{ post.name }}</p>
                  </div>

                  <div> 
                    <p class="text-sm">Payment Type</p>
                    <p class="font-weight-bold">{{ post.name }}</p>
                  </div>

                  <div> 
                    <p class="text-sm">Document Date</p>
                    <p class="font-weight-bold">{{ post.name }}</p>
                  </div>

                  <div> 
                    <p class="text-sm">Date Requested</p>
                    <p class="font-weight-bold">{{ post.name }}</p>
                  </div>

                  <div> 
                    <p class="text-sm">Company</p>
                    <p class="font-weight-bold">{{ post.name }}</p>
                  </div>

                  <div> 
                    <p class="text-sm">Supplier</p>
                    <p class="font-weight-bold">{{ post.name }}</p>
                  </div>

                  <div> 
                    <p class="text-sm">Document Amount</p>
                    <p class="font-weight-bold">{{ post.name }}</p>
                  </div>

                  <div> 
                    <p class="text-sm">Remarks</p>
                    <p class="font-weight-bold">{{ post.name }}</p>
                  </div>                  
                </div>

                <div class="modal-grid-2">
                  <div class="header text-center">
                    <p>Purchase Order Information</p>
                  </div>

                  <div class="tb-column text-center">
                    <p>Purchase Order</p>
                  </div>

                  <div class="tb-column text-center">
                    <p>Received Receipt Report</p>
                  </div>

                  <div class="tb-column text-center">
                    <p>Amount</p>
                  </div>

                  <!-- FOR LOOP OF DYNAMIC DATA -->
                    <div class="tb-data text-center">Dynamic Data 1</div>
                    <div class="tb-data text-center">Dynamic Data 2</div>
                    <div class="tb-data text-center">Dynamic Data 3</div>
                  <!-- END OF DATA -->




                  <div class="header text-center">
                    <p>Reference Information</p>
                  </div>

                  <div class="tb-column text-center">
                    <p>Type</p>
                  </div>

                  <div class="tb-column text-center">
                    <p>Number</p>
                  </div>

                  <div class="tb-column text-center">
                    <p>Amount</p> 
                  </div>

                  <!-- FOR LOOP OF DYNAMIC DATA -->
                    <div class="tb-data text-center">Dynamic Data 1</div>
                    <div class="tb-data text-center">Dynamic Data 2</div>
                    <div class="tb-data text-center">Dynamic Data 3</div>
                  <!-- END OF DATA -->      


                </div>
              </template>
            </Modal> 
        </tr>
        </template>
      </DataTable>
      </span>
      <span v-else>
        <Loading/>
      </span>
    </div>
  </div>
</template>

<script>
import Sidebar from '../../components/shared-components/Sidebar'
import Navbar from '../../components/shared-components/Navbar'
import DataTable from '../../components/shared-components/DataTable'
import Modal from '../../components/shared-components/Modal'
import Loading from '../../components/shared-components/Loading'
import {mapState} from 'vuex'
import vSelect from 'vue-select'

export default {
    components: { Sidebar, Navbar, DataTable, Modal, Loading},
    created(){
        this.$store.dispatch('loadPosts')
    },
    computed:{
        ...mapState([
            'posts'
        ]),
        
    },
    methods:{
      getSinglePost(id){        
         this.posts.filter(post => post.id = id)   
      },
      dataHover(){
        
      }
    }
    
}
</script>

<style scoped>
  @import '../../assets/css/dashboard-style.css';


</style>