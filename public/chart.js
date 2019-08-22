// chart functionality
let myChart = document.getElementById('chart').getContext('2d');
let chart_data = null;

function drip(){

  fetch('/score', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
  .then(response => {
    // console.log(response);
    if (response.ok) {
      return response.json()
    }
  }).then(data => {
    chart_data = data.data;
    attempts = []
    for (var i = 0; i < chart_data.length; i++) {
      attempts.push(`${i + 1} try`)   //adding a try to the chart
    }

    resultChart = new Chart(myChart, {
      type:'bar',
      data:{
        labels:attempts,
        datasets:[{
          label:'Results',
          data:chart_data.map(data => data.score),
          backgroundColor:[
            'purple',
            'purple',
            'purple',
            'purple',
            'purple',
            'purple',
            'purple',
            'purple',
            'purple',
            'purple',
            'purple',
            'purple',
            'purple',
            'purple',
            'purple',
            'purple',
            'purple',
            'purple',
            'purple',
            'purple',
            'purple',
            'purple',
            'purple',
            'purple',
            'purple'
          ],
          borderWidth:1,
          borderColor:'white',
          hoverBorderWidth:1,
          hoverBorderColor:'white'
        }]
      },
      options:{
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              steps: 10,
              stepValue: 5,
              max: 100
            }
          }]
        },
        title:{
          display:true,
          text:'Results From Game',
          fontSize:25
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    })

  })
};
// drip();
document.querySelector('.results').addEventListener('click', drip)
