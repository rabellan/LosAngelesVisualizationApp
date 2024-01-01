//Creating test flag to toggle SQL queries vs static CSV files to retrieve data
//let flag = false;
let flag = true;

let yearOptions = [2023];

let dayOptions = [];
for (let i = 1; i <= 31; i++)
  dayOptions.push(i);

let monthOptions = [];
for (let i = 1; i <= 12; i++)
  monthOptions.push(i);


function checkDate(year, month, day) {
  if (!(monthOptions.includes(month))){
    console.log("not a valid month");
    return false;
  }
  let short_months = [4, 6, 9, 11]
  if (month == 2 && !(dayOptions.slice(0, -3).includes(day))){ // Checking to see if date is not between Feb 1-28
    let leapYear = false; // Checking to see if year is leap year
    if (year % 400 == 0) {
      console.log("year is divisible by 400");
      leapYear = true;
    }
    else if (year % 4 == 0 && year % 100 != 0) {
      console.log("year is divisible by 4 and not 100");
      leapYear = true;
    }
      
    if (leapYear && dayOptions.slice(0, -2).includes(day)) { // Checking to see if year is leap year and day is Feb 29
      console.log("it is a leapyear and is  29 of Feb");
      return true;
    }
    console.log('date is not valid for this February');
    return false;
  }
  else if (short_months.includes(month) && !(dayOptions.slice(0, -1).includes(day))){ // Checking to see if this month is 30 days and the day is not 1-30
    console.log("date is not valid for short months");
    return false;
  }
  else if (!(dayOptions.slice(0, -1).includes(day))) {
    console.log("date is over 31 days");
    return false;
  }
  console.log("date is valid");
  return true;
}
console.log(checkDate(2000, 11, 32))
console.log(dayOptions.slice(0, -3))

function createDateDropdown() {
  let container = d3.select("#container");
  let space = true;
  for (let i = 0; i < 2; i ++) {
    let dropdown = container.append("select").attr("class", "menu").attr("id", "menu" + ((i*3)+1));
    dropdown.selectAll("option").data(yearOptions).enter().append("option").text(d => d);
    let dropdown1 = container.append("select").attr("class", "menu").attr("id", "menu" + ((i*3)+2));
    dropdown1.selectAll("option").data(monthOptions).enter().append("option").text(d => d);
    let dropdown2 = container.append("select").attr("class", "menu").attr("id", "menu" + ((i*3)+3));
    dropdown2.selectAll("option").data(dayOptions).enter().append("option").text(d => d);
    if (space) {
      container.append("span").attr("id", "space").text("to");
      space = false;
    }
  }
  let button = container.append("button").attr("id", "button").text("OK");
  button.on("click", function() {
    let year1 = d3.select("#menu1").property("value");
    console.log(year1);
    let month1 = d3.select("#menu2").property("value");
    console.log(month1);
    let day1 = d3.select("#menu3").property("value");
    console.log(day1);
    let year2 = d3.select("#menu4").property("value");
    console.log(year2);
    let month2 = d3.select("#menu5").property("value");
    console.log(month2);
    let day2 = d3.select("#menu6").property("value");
    console.log(day2);
  })
  
  
}
createDateDropdown();

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
