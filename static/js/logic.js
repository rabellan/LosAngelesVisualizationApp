// // create map here
// // Downtown LA zoomed at 10
// let myMap = L.map("map", {
//   center: [34.02717700409306, -118.2769483261598],
//   zoom: 12
// });

// // Add a tile layer.
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);

// // This is the marker logic below
// // check mcd_locations array for missing entries
// mcd_locations.forEach(location => {
//   if (location.location_1 && location.location_1.latitude && location.location_1.longitude) {
//     L.marker([location.location_1.latitude, location.location_1.longitude])
//       .bindPopup(`<h1>${location.dba_name}</h1> <hr> <h4>Zip Code ${location.zip_code}</h4> <h4>Business Owner ${location.business_name}</h4>`)
//       .addTo(myMap);
//   }
// });

// create map here
// Downtown LA zoomed at 10
let myMap = L.map("map", {
  center: [34.02717700409306, -118.2769483261598],
  zoom: 12
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Create a McDonald's icon
let mcdonaldsIcon = new L.Icon({
  iconUrl: 'https://www.pinclipart.com/picdir/big/368-3688927_mcdonalds-logo-png-mcdonalds-logo-png-clipart.png',
  iconSize: [35, 40],      // Size of the icon
  iconAnchor: [17, 40],    // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -40]    // Point from which the popup should open relative to the iconAnchor
});

// Marker for McDonald's locations
mcd_locations.forEach(location => {
  if (location.location_1 && location.location_1.latitude && location.location_1.longitude) {
    L.marker([location.location_1.latitude, location.location_1.longitude], {icon: mcdonaldsIcon})
      .bindPopup(`<h1>${location.dba_name}</h1> <hr> <h4>Zip Code ${location.zip_code}</h4> <h4>Business Owner ${location.business_name}</h4>`)
      .addTo(myMap);
  }
});

// Marker Cluster for Crime Data
let crimeClusterGroup = L.markerClusterGroup();
la_crime_data.forEach(crime => {
  if (crime.LAT && crime.LON) {
    let crimeMarker = L.marker([crime.LAT, crime.LON])
        .bindPopup(`<h1>${crime['Crm Cd Desc']}</h1><hr><p>${crime.LOCATION}</p><p>Date Reported: ${crime['Date Rptd']}</p>`);
    crimeClusterGroup.addLayer(crimeMarker);
  }
});
myMap.addLayer(crimeClusterGroup);
