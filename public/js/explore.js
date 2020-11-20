const mapboxgAccessToken = process.env.mapboxgAccessToken;

$.get("/api/animals").then(data => {
    mapboxgl.accessToken = mapboxgAccessToken;

    var geojson = {
        'type': 'FeatureCollection',
        'features': []
    };

    var uploadFileName = [];
    const animalArray = [];

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-117.325, 33.9738],
        zoom: 9
    });
    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-left');

    // Add geolocate control to the map.
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            trackUserLocation: true,
            showAccuracyCircle: false,
            showUserLocation: false
        })
    );

    data.forEach(animal => {
        const animalCreated = animal.createdAt;
        date = new Date(animalCreated);
        entireDateString = date.toDateString()

        let newFeature = {
            'type': 'Feature',
            'properties': {
                'message': `${animal.animal_species}\n${animal.note}\nFound by: ${animal.foundByUser}\nCreated: ${entireDateString}`,
                'iconSize': [25, 25]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [animal.longitude, animal.latitude]
                }
        }
        animalArray.push(animal)
        geojson.features.push(newFeature)
        uploadFileName.push(animal.picture)
    });

    for (let i = 0; i < uploadFileName.length; i++){
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = `url("./img/pin.png")`;
        el.style.width = geojson.features[i].properties.iconSize[0] + 'px';
        el.style.height = geojson.features[i].properties.iconSize[1] + 'px'

        const animalCreated = animalArray[i].createdAt;
        date = new Date(animalCreated);
        entireDateString = date.toDateString()

        const createHTML = `
        <div class="animal_popup">
            <h1>${animalArray[i].animal_species}</h1>
            <p>${animalArray[i].note}</p>
            <p>Found by: ${animalArray[i].foundByUser}</p>
            <p>Created: ${entireDateString}</p>
            <img src="https://wildlife-observations-img-db.s3-us-west-1.amazonaws.com/${animalArray[i].picture}" >
        </div>`

        new mapboxgl.Marker(el)
        .setLngLat(geojson.features[i].geometry.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(createHTML))
        .addTo(map);
    }
});

