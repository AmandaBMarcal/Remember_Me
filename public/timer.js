let startMatching = false

// countDown function
const countDown = () => {
  let presentTime = document.getElementById("timer").innerHTML
  const timeArray = presentTime.split(/[:]+/) //this is redux
  let min = timeArray[0]    //first element in arr = mins
  // Keeping the count like an actual clock (ex. 5:00 -> 4:59)
  let sec = checkSecond(timeArray[1] - 1);
  if(sec==59){
    min=min-1
  }

  // completedMatching will be false until changed to true
  if (startMatching && (sec < 1 && min < 1)){
    document.getElementById("recipeInstructions").style.display = 'none';
    stopTimer()
  }

  // when time gets to 00 we need to stop
  if ((sec < 1 && min < 1) && !startMatching){
    document.getElementById("recipeInstructions").style.display = 'none';
    document.getElementById("timer").innerHTML = '00 : 10';
    document.getElementById("popPictures").style.display = 'block';
    startMatching = true
  }else {
    document.getElementById("timer").innerHTML = `${min} : ${sec}`
  }
}

// Seconds
function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {   //prepend the 0 to the seconds
    sec = "0" + sec
  }; // add zero in front of numbers < 10
  if (sec < 0) {
    sec = "59"
  };
  return sec;
}

let timer;
const startTimer = () => {
  timer = setInterval(countDown, 1000)
}

const stopTimer = () => {
  clearInterval(timer);
  document.querySelector('.score').style.display = 'block';
  // alert("You're Done!")
  // window.location.href = "http://localhost:8080/results"
}
