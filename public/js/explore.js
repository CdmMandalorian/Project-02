$.get("/api/animals").then(data => {
    mapboxgl.accessToken =
    "pk.eyJ1IjoiYmJyaW50bGUiLCJhIjoiY2toY2VzMXVuMDA1YjJ4bnk3a3Myc2xoOSJ9.utPq30o3rq4GihknsRgSFQ";

    var geojson = {
        'type': 'FeatureCollection',
        'features': []
    };

    var uploadFileName = [];

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-117, 39],
        zoom: 9
    });

    // Add geolocate control to the map.
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            trackUserLocation: true
        })
    );

    data.forEach(animal => {
        let newFeature = {
            'type': 'Feature',
            'properties': {
                'message': `${animal.animal_species}\n${animal.note}\nFound by: ${animal.foundByUser}`,
                'iconSize': [20, 20]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [animal.longitude, animal.latitude]
                }
        }
        geojson.features.push(newFeature)
        uploadFileName.push(animal.picture)
    });

    for (let i = 0; i < uploadFileName.length; i++){
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = `url("./img/pin.png")`;
        el.style.width = geojson.features[i].properties.iconSize[0] + 'px';
        el.style.height = geojson.features[i].properties.iconSize[1] + 'px'
        el.addEventListener('click', function () {
            window.alert(geojson.features[i].properties.message);
        });

        new mapboxgl.Marker(el)
        .setLngLat(geojson.features[i].geometry.coordinates)
        .addTo(map);
    }
});

