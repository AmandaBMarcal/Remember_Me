// Calculating Score
var trash = document.getElementsByClassName("fa-trash-alt");

let currentScore = [];     //GET getting the scores that are saved for the user

let getScore = ()=>{
  fetch('/score', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
  .then(response => {
    if (response.ok) {
      return response.json()
    }
  }).then(data=> {
    currentScore = data.data
    return data.data
  })
}

getScore()
let tries = 1; // keeps track of attempts


let saveScore = () => { // function to keep track of score
  let correct = 0;// keeps track of correct choices so that the grade may be averaged out
  let chartData = currentScore; //holds results from each attempt   //used when updating the score
  let selectedImages = document.querySelectorAll('.selected-image'); // array of selected images
  let grade = document.querySelector('.grade'); // paragraph to show grade    //PUT


  for (let i = 0; i < selectedImages.length; i++) {
    console.log('derp', selectedImages[i].getAttribute("keyword"), recipe.keywords[i])
    
    if (selectedImages[i].getAttribute("keyword") === recipe.keywords[i] ) {
      correct += 1;
    }
  };


  let newScore = Number(Math.floor((correct / recipe.keywords.length ) * 100))
  grade.innerHTML = newScore + "%"; // puts grade % in paragraph
  console.log('new score', newScore)
  chartData.push(newScore); // pushes grade to chart array

  fetch('/score',{
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      score: grade.innerHTML.replace(/\% ?/g, "")
    })
  }).then(function() {
    tries++
  });
}

// listing scores
let listScore = () => {
    window.location.reload()
}

// // trash
// let renderTrash = (info) => {
//   console.log(info, "info");
// }



Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    console.log(element, "element");
    const deletedScore = this.parentNode.parentNode.childNodes[1].innerText;
    fetch('/score', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'score': deletedScore,
      })
    }).then(function (response) {
      console.log(response.json());
      window.location.reload()
    })
  });
});


document.getElementById('score').addEventListener('click', saveScore)

document.getElementById('listScore').addEventListener('click', listScore)
