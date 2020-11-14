mapboxgl.accessToken =
"pk.eyJ1IjoiYmJyaW50bGUiLCJhIjoiY2toY2VzMXVuMDA1YjJ4bnk3a3Myc2xoOSJ9.utPq30o3rq4GihknsRgSFQ";

var geojson = {
    'type': 'FeatureCollection',
    'features': [{
                'type': 'Feature',
                'properties': {
                    'message': 'Foo',
                    'iconSize': [25, 25]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-117, 39]
                    }
                }]
};

$.get("/api/animals").then(data => {
    data.forEach(animal => {
        console.log(animal);
        let newFeature = {
            'type': 'Feature',
            'properties': {
                'message': 'Foo',
                'iconSize': [20, 20]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [animal.longitude, animal.latitude]
                }
            }
        geojson.features.push(newFeature)
    });

});

        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-117, 39],
            zoom: 9
        });
         
        // add markers to map
        geojson.features.forEach(function (marker) {
            // create a DOM element for the marker
            var el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage =
            'url(https://placekitten.com/g/' +
            marker.properties.iconSize.join('/') +
            '/)';
            el.style.width = marker.properties.iconSize[0] + 'px';
            el.style.height = marker.properties.iconSize[1] + 'px';
            
            el.addEventListener('click', function () {
            window.alert(marker.properties.message);
            });
            
            // add marker to map
            new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
        });
//         console.log(geojson)
// });
