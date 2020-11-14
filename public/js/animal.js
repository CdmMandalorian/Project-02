var searchByArray = [];

var modal = document.getElementById("myModal");
var submitBtn = document.getElementById("submitBtn");
var btn1 = document.getElementById("defaultCheck1");
var btn2 = document.getElementById("defaultCheck2");
var btn3 = document.getElementById("defaultCheck3");
var btn4 = document.getElementById("defaultCheck4");

document.onload = function(){

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
        for(var i = 0; i < searchByArray.length; i++){

            searchByArray[i].style.display = "block";

        }
        modal.style.display= "none";
    });
}

$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(data => {
      $(".member-name").text(data.userName);
      const userName = data.userName;
      const sendLocBtn = $("#send-location");
      const recenterBtn = $("#recenter");
      const createObserverBtn = $(".add-observation");
          
      function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
      }
  
      createObserverBtn.on("submit", event => {
        event.preventDefault();
        const animal = $("#animal-type").val();
        const animalLng = $("#animal-lng").val();
        const animalLat = $("#animal-lat").val();
        const animalNote = $("#animal-note").val();
        // const animalPic = $("#animal-pic").val();
  
        $.post("/api/animals", {
          animal_species: animal,
          longitude: animalLng,
          latiitude: animalLat,
          hostile: true,
          foundByUser: userName,
          note: animalNote,
          // picture: animalPic
        })
          .then(() => {
            window.location.replace("/members");
          })
          .catch(handleLoginErr);
      });
  
      sendLocBtn.on("click", event => {
        event.preventDefault();
        const location = marker.getLngLat();
        $("#animal-lat").val(location.lat);
        $("#animal-lng").val(location.lng);
      });
  
      recenterBtn.on("click", event => {
        event.preventDefault();
        const center = map.getCenter();
        marker.setLngLat(center);
      });
  
      mapboxgl.accessToken =
        "pk.eyJ1IjoiYmJyaW50bGUiLCJhIjoiY2toY2VzMXVuMDA1YjJ4bnk3a3Myc2xoOSJ9.utPq30o3rq4GihknsRgSFQ";
      const coordinates = document.getElementById("coordinates");
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-117, 39],
        zoom: 10
      });
  
      const marker = new mapboxgl.Marker({
        draggable: true
      })
        .setLngLat([-117, 39])
        .addTo(map);
  
      // Add geolocate control to the map.
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        })
      );
  
      function onDragEnd() {
        const lngLat = marker.getLngLat();
        coordinates.style.display = "block";
        coordinates.innerHTML =
          "Longitude: " + lngLat.lng + "<br />Latitude: " + lngLat.lat;
      }
  
      marker.on("dragend", onDragEnd);
    });
  });
