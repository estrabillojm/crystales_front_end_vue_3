<template>
  <line-chart id="line-chart" :data="chartData" label="Transaction History" :colors="['#1b51be']" :library="chartOptions" class="chart" @click="clickChart()">
  </line-chart>
  <p class="wc">w Concern</p>
  <p class="woc">w/out <br> Concern</p>
</template>

<script>
export default {
  data(){
    return {
      chartData: {
          'Tagging': 1,
          'Identifying': 1,
          'Distribution': 1,
          'Voucher Creation': 1,
          'Voucher Validation': 1,
          'GAS Recording': 2,
          'Approving of Voucher': 2,
          'Creation of Cheque': 2,
          'Releasing of Cheques': 1,
          'Clearing of Cheques': null,
      },
      chartOptions: {
              layout: {
                  padding: {left: 90, right: 5, top: 5, bottom: 2},
              },
              scales: {
                  // yAxes: [{
                  //     display:false,
                  // }]
                  yAxes: [{display: false, id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0, max:3}}]
              },
              tooltips: {
                  enabled: false,  
              },
          }
    }
  },
  methods:{
    clickChart(){
      let chart = document.getElementById('line-chart')

      console.log(chart)
    }
  }

}
</script>

<style>
  .chart{
        background:rgba(90, 208, 255, 0.274);
        cursor: not-allowed;
    }

    .woc{
        position:absolute;
        /* transform: rotateZ(-90deg); */
        left:35px;
        top:175px;
        font-size: 12px;
        color:green;
    }

    .wc{
        position:absolute;
        /* transform: rotateZ(-90deg); */
        top:100px;
        left:30px;
        font-size: 12px;
        color:red;
    }

</style>