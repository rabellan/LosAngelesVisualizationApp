import { hi } from './db.js'
//var db = require('./database.js');


// create map here
// Downtown LA zoomed at 10
let myMap = L.map("map", {
  center: [34.02717700409306, -118.2769483261598],
  zoom: 10
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// This is the marker logic below
// check mcd_locations array for missing entries
mcd_locations.forEach(location => {
  if (location.location_1 && location.location_1.latitude && location.location_1.longitude) {
    L.marker([location.location_1.latitude, location.location_1.longitude])
      .bindPopup(`<h1>${location.dba_name}</h1> <hr> <h4>Zip Code ${location.zip_code}</h4> <h4>Business Owner ${location.business_name}</h4>`)
      .addTo(myMap);
  }
});