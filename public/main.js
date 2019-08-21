// playButton
let playButton = document.getElementById("play");
let btnPress = 0;

playButton.addEventListener('click', function(data){
  btnPress ++
  document.querySelector('.score').style.display = 'none';
  if (btnPress > 1) {

    document.getElementById("timer").innerHTML = '00 : 10';

  };

  // block -> css manipulation where it will 'block' the display:none
  document.getElementById("recipeInstructions").style.display = 'block';
  startTimer()
});
