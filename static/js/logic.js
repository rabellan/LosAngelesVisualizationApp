//Creating test flag to toggle SQL queries vs static CSV files to retrieve data
// let flag = false;
let flag = true;

let yearOptions = [2023];

let dayOptions = [];
for (let i = 1; i <= 31; i++)
  dayOptions.push(i);

let monthOptions = [];
for (let i = 1; i <= 12; i++)
  monthOptions.push(i);


function checkDate(year, month, day) {
  if (!(month in monthOptions)){
    return false;
  }

    

  let short_months = [4, 6, 9, 11]
  if (month == 2 && day in dayOptions.slice(0, -3)){
    let leapYear = false;
    if (year % 400 == 0) 
      leapYear = true;
    if (year % 4 == 0 && year % 100 != 0)
      leapYear = true;
    if (leapYear && day in dayOptions.slice(0, -2))
      return true;
    console.log('ehllo')
    return false;
  }
    
  else if (month in short_months && !(day in dayOptions.slice(0, -1))){
    
    return false;
  }
    
  else
    return true;
}
console.log(checkDate(2023, 12, 1))
console.log(monthOptions)

// Create a McDonald's icon
let mcdonaldsIcon = new L.Icon({
  //iconUrl: 'https://www.pinclipart.com/picdir/big/368-3688927_mcdonalds-logo-png-mcdonalds-logo-png-clipart.png',
  iconUrl: '../resources/mcd2.png',
  iconSize: [35, 40],      // Size of the icon
  iconAnchor: [17, 40],    // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -40],    // Point from which the popup should open relative to the iconAnchor
  fillOpacity: 0
});

// Marker for McDonald's locations
let mcdLayer = L.layerGroup()
if (!flag) {
  mcd_locations.forEach(location => {
    if (location.location_1 && location.location_1.latitude && location.location_1.longitude) {
      let mcdMarker = L.marker([location.location_1.latitude, location.location_1.longitude], {icon: mcdonaldsIcon})
        .bindPopup(`<h1>${location.dba_name}</h1> <hr> <h4>Zip Code ${location.zip_code}</h4> <h4>Business Owner ${location.business_name}</h4>`)
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
// We need more styling done for this legend
// Research CSS for Marker Cluster plugin
// 
// var legend = L.control({ position: 'bottomleft' });

// legend.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = ['Color 1', 'Color 2', 'Color 3'], // Replace with your color codes
//         labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     grades.forEach(function (grade, index) {
//         div.innerHTML +=
//             '<i style="background:' + getColor(grade) + '"></i> ' +
//             grade + '<br>';
//     });

//     return div;
// };

// legend.addTo(myMap);

// // Function to return color based on the grade
// function getColor(grade) {
//     switch (grade) {
//         case 'Color 1': return '#ff0000'; // replace with actual color code
//         case 'Color 2': return '#00ff00'; // replace with actual color code
//         case 'Color 3': return '#0000ff'; // replace with actual color code
//         default: return '#ffffff';
//     }
// }