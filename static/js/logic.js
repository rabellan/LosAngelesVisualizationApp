//Creating test flag to toggle SQL queries vs static CSV files to retrieve data
//let flag = false;
let flag = true;

// Marker for business locations
let mcdLayer = L.layerGroup();
let chipotleLayer = L.layerGroup();
let walmartLayer = L.layerGroup();
let starbucksLayer = L.layerGroup();
let walgreensLayer = L.layerGroup();

if (!flag) {
  mcd_locations.forEach(mcd => {
    if (mcd.lat && mcd.lon) {
      let mcdMarker = L.marker([mcd.lat, mcd.lon], {icon: mcdIcon})
        .bindPopup(`<h1>${mcd.dba_name}</h1> <hr> <h4>Zip Code ${mcd.zipcode}</h4> <h4>Business Owner ${mcd.business_name}</h4>`)
      mcdLayer.addLayer(mcdMarker);
    }
  });
}
else {
  fetchBusiness('http://localhost:3000/api/mcd', mcdLayer, mcdIcon);
  fetchBusiness('http://localhost:3000/api/chipotle', chipotleLayer, chipotleIcon);
  fetchBusiness('http://localhost:3000/api/walmart', walmartLayer, walmartIcon);
  fetchBusiness('http://localhost:3000/api/starbucks', starbucksLayer, starbucksIcon);
  fetchBusiness('http://localhost:3000/api/walgreens', walgreensLayer, walgreensIcon);
}

function fetchBusiness(route, layer, logo) {
  fetch(route)
  .then(response => response.json())
  .then(data => {
    //console.log(data);
    data.forEach(business => {
      if (business.lat && business.lon) {
        let businessMarker = L.marker([business.lat, business.lon], {icon: logo})
        .bindPopup(`<h1>${business.dba_name}</h1> <hr> <h4>Zip Code ${business.zipcode}</h4> <h4>Business Owner ${business.business_name}</h4>`);

        businessMarker.on('click', function() {
          // Toggle the class 'active' on both the map and sidebar elements
          console.log('turning on');
          var mapContainer = document.getElementById('map');
          
          if(!mapContainer.classList.contains('active')){
            console.log("didnt contain active");
            mapContainer.classList.toggle('active');
            document.getElementById('sidebar').classList.toggle('active');
          }
    
          // Update the content of the sidebar with marker information
          document.getElementById('marker-info').textContent = business.street_address;
        });

        layer.addLayer(businessMarker);
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
  fetch('http://localhost:3000/api/crime/2023-12-04/2023-12-18')
  .then(response => response.json())
  .then(data => {
    //console.log(data);
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
  McDonalds: mcdLayer,
  Chipotle: chipotleLayer,
  Walmart: walmartLayer,
  Starbucks: starbucksLayer,
  Walgreens: walgreensLayer,
  Crime: crimeClusterGroup
}

// Create Map - coordinates of LACMA at 10 zoom
let myMap = L.map("map", {
  center: [34.07034926864842, -118.35914276112172],
  zoom: 10.5,
  layers: [street, mcdLayer, crimeClusterGroup]
});

// Creating control layer
let control = L.control.layers(baseMap, overlayMap, {
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