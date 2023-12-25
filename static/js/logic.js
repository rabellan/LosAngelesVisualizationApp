// create map here
// Coordinates of LACMA at 10 zoom
let myMap = L.map("map", {
  center: [34.07034926864842, -118.35914276112172],
  zoom: 10.5
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

// Create a legend for Cluster Marker frequency and position it at the bottom right
// We need more styling done for this legend
// Research CSS for Marker Cluster plugin

var legend = L.control({ position: 'bottomleft' });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = ['1-9 Incidents', '10 - 99 Incidents', '> 100 Incidents'], // Replace with your color codes
        labels = [];

    //Legend Title
    div.innerHTML = '<strong>Number of Incidents</strong><br>';

    // loop through our density intervals and generate a label with a colored square for each interval
    grades.forEach(function (grade, index) {
        div.innerHTML +=
            '<i style="background:' + getColor(grade) + '"></i> ' +
            grade + '<br>';
    });

    return div;
};

legend.addTo(myMap);

// Function to return color based on the grade
function getColor(grade) {
    switch (grade) {
        case '1-9 Incidents': return '#B5E28C'; // replace with actual color code
        case '10 - 99 Incidents': return '#F1D357'; // replace with actual color code
        case '> 100 Incidents': return '#FD9C73'; // replace with actual color code
        default: return '#ffffff';
    }
}
