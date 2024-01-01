//Creating test flag to toggle SQL queries vs static CSV files to retrieve data
let flag = false;
//let flag = true;

// Create a McDonald's icon
let mcdonaldsIcon = new L.Icon({
  //iconUrl: 'https://www.pinclipart.com/picdir/big/368-3688927_mcdonalds-logo-png-mcdonalds-logo-png-clipart.png',
  iconUrl: '../resources/mcd.png',
  iconSize: [35, 40],      // Size of the icon
  iconAnchor: [17, 40],    // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -40],    // Point from which the popup should open relative to the iconAnchor
  fillOpacity: 0
});

// Marker for McDonald's locations
let mcdLayer = L.layerGroup()
if (!flag) {
  mcd_locations.forEach(mcd => {
    if (mcd.lat && mcd.lon) {
      let mcdMarker = L.marker([mcd.lat, mcd.lon], {icon: mcdonaldsIcon})
        .bindPopup(`<h1>${mcd.dba_name}</h1> <hr> <h4>Zip Code ${mcd.zipcode}</h4> <h4>Business Owner ${mcd.business_name}</h4>`)
      mcdLayer.addLayer(mcdMarker);
    }
  });
}

else {
  fetch('http://localhost:3000/api/mcd')
  .then(response => response.json())
  .then(data => {
    //console.log(data);
    data.forEach(mcd => {
      if (mcd.lat && mcd.lon) {
        let mcdMarker = L.marker([mcd.lat, mcd.lon], {icon: mcdonaldsIcon})
        .bindPopup(`<h1>${mcd.dba_name}</h1> <hr> <h4>Zip Code ${mcd.zipcode}</h4> <h4>Business Owner ${mcd.business_name}</h4>`);

        mcdMarker.on('click', function() {
          // Toggle the class 'active' on both the map and sidebar elements
          console.log('turning on');
          var mapContainer = document.getElementById('map');
          
          if(!mapContainer.classList.contains('active')){
            console.log("didnt contain active");
            mapContainer.classList.toggle('active');
            document.getElementById('sidebar').classList.toggle('active');
          }
    
          // Update the content of the sidebar with marker information
          document.getElementById('marker-info').textContent = mcd.street_address;
        });

        mcdLayer.addLayer(mcdMarker);
      }
    })
  })
  .catch(error => console.error('Error:', error));
}

document.addEventListener('click', function(event) {
  //console.log('its called');
  var sidebar = document.getElementById('sidebar');
  var clickedElement = event.target;

  // Check if the clicked element is inside the sidebar or a marker
  var isInsideSidebar = sidebar.contains(clickedElement);
  var isInsideMarker = clickedElement.classList.contains('leaflet-marker-icon');

  // If not inside the sidebar or a marker, close the sidebar
  if (!isInsideSidebar && !isInsideMarker && sidebar.classList.contains('active')) {
    sidebar.classList.remove('active');
    document.getElementById('map').classList.remove('active');
  }
});


// Marker Cluster for Crime Data
let crimeClusterGroup = L.markerClusterGroup();
if (!flag) {
  la_crime_data.forEach(crime => {
    if (crime.LAT && crime.LON) {
      let crimeMarker = L.marker([crime.LAT, crime.LON])
          .bindPopup(`<h1>${crime['Crm Cd Desc']}</h1><hr><p>${crime.LOCATION}</p><p>Date Reported: ${crime['Date Rptd']}</p>`);
      crimeClusterGroup.addLayer(crimeMarker);
    }
  });
}

else {
  fetch('http://localhost:3000/api/crime')
  .then(response => response.json())
  .then(data => {
    //console.log(data);
    //myMap.removeLayer(crimeClusterGroup);
    //crimeClusterGroup = L.markerClusterGroup();
    data.forEach(crime => {
      let crimeMarker = L.marker([crime.lat, crime.lon])
      .bindPopup(`<h1>${crime.crim_cd_desc}</h1><hr><p>${crime.location}</p><p>Date Reported: ${crime.date_rptd}</p>`);;
      crimeClusterGroup.addLayer(crimeMarker);
    })
  })
  .catch(error => console.error('Error:', error));
}


// Create tile layer.
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

let baseMap = {
  Street: street
}

let overlayMap = {
  Crime: crimeClusterGroup,
  McDonalds: mcdLayer
}

// Create Map - coordinates of LACMA at 10 zoom
let myMap = L.map("map", {
  center: [34.07034926864842, -118.35914276112172],
  zoom: 10.5,
  layers: [street, mcdLayer, crimeClusterGroup]
});

// Creating control layer
L.control.layers(baseMap, overlayMap, {
  collapsed: false
}).addTo(myMap);




// Create a legend for Cluster Marker frequency and position it at the bottom right
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