$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.userName);
    const sendLocBtn = $("#send-location");
    const recenterBtn = $("#recenter");

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
