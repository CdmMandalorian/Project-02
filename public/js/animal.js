var searchByArray = [];
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
    
      animalClass.style.display = "block";
      console.log(animalClass.style.display);
    });
    
    btn2.addEventListener("change", function(event) {
      boxChecked2 = true;
      console.log(boxChecked2);
    
      animalName.style.display = "block";
      console.log(animalName.style.display);
    });
    
    btn3.addEventListener("change", function(event) {
      boxChecked3 = true;
      console.log(boxChecked3);
    
      animalColor.style.display = "block";
      console.log(animalColor.style.display);
    });
    
    btn4.addEventListener("change", function(event) {
      boxChecked4 = true;
      console.log(boxChecked4);
    
      animalNote.style.display = "block";
      console.log(animalNote.style.display);
    });
    
}
