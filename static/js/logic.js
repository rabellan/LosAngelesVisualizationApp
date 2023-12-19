// create function that draws the map
function createMap(){

    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create baseMaps object to hole streetmap layer
    let baseMaps = {
        "Street Map": streetmap
    };

    // Create overlapMaps object for whatever you want to lay over
    let overlayMaps = {
            
    };

    // Create the map object with options.
    let map = L.map("map-id", {
        center: [34.02717700409306, -118.2769483261598],
        zoom: 12,
        layers: [streetmap]
    });

    // Create layers control
    L.control.layers(baseMaps, overlayMaps, {
        collapse: false
    }).addTo(map);

}

createMap();

// // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
// d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(createMarkers);