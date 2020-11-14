var searchByArray = [];

var submitBtn = document.getElementById("submitBtn");
var btn1 = document.getElementById("defaultCheck1");
var btn2 = document.getElementById("defaultCheck2");
var btn3 = document.getElementById("defaultCheck3");
var btn4 = document.getElementById("defaultCheck4");


window.onload = function(){

    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    
    var animalClass = document.getElementById("animalType");
    animalClass.style.display = "none";
    
    var animalName = document.getElementById("animalName");
    animalName.style.display = "none";
    
    var animalColor = document.getElementById("animalColor");
    animalColor.style.display = "none";
    
    var animalNote = document.getElementById("animalNote");
    animalNote.style.display = "none";
    
    btn1.addEventListener("change", function(event) {
      //var myLowerLetter = document.querySelector('.checkBox1:checked').value;
      boxChecked1 = true;
      console.log(boxChecked1);
    
      searchByArray.push(...animalClass);
      //animalClass.style.display = "block";
      console.log(searchByArray);
    });
    
    btn2.addEventListener("change", function(event) {
      boxChecked2 = true;
      console.log(boxChecked2);
    
      searchByArray.push(...animalName);
      //animalName.style.display = "block";
      console.log(searchByArray);
    });
    
    btn3.addEventListener("change", function(event) {
      boxChecked3 = true;
      console.log(boxChecked3);
    
      searchByArray.push(...animalColor);
      //animalColor.style.display = "block";
      console.log(searchByArray);
    });
    
    btn4.addEventListener("change", function(event) {
      boxChecked4 = true;
      console.log(boxChecked4);
    
      searchByArray.push(...animalNote);
      //animalNote.style.display = "block";
      console.log(searchByArray);
    });
    
    submitBtn.addEventListener("click", function(event){
        for(var i = 0, i < searchByArray.length, i++){

            searchByArray[i].style.display= "block";

        }
    });
}
