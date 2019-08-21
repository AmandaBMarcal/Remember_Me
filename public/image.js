var recipeImages = document.querySelectorAll(".recipe-image");
var selectedImages = document.querySelectorAll(".selected-image")

// image click
recipeImages.forEach(function(recipeImage){
  recipeImage.addEventListener('click', function(){
    let imageSrc = recipeImage.src    //getting src from element that was clicked
    let imageKeyword = recipeImage.getAttribute("keyword")
    for(var selectedImage of selectedImages){    //for loop creating selectedImage var looping through selectedImages
      if(window.location.href.startsWith(selectedImage.src)){   //W/ the img src is when it's empty   //window.location on console
        selectedImage.src = imageSrc;
        selectedImage.setAttribute("keyword", imageKeyword)
        break;    //breaks the loop
      }
    }
  })
});

// unselect img
selectedImages.forEach(function(selectedImage){
  selectedImage.addEventListener('click', function(){
    selectedImage.src = ""
    selectedImage.setAttribute("keyword", "")
  })
});
