//Creating test flag to toggle SQL queries vs static CSV files to retrieve data
//let flag = false;
let flag = true;
let crimes = [];
let cache = {};
let dateRange = "2023-12-04/2023-12-18";

// Marker for business locations
let mcdLayer = L.layerGroup();
let chipotleLayer = L.layerGroup();
let walmartLayer = L.layerGroup();
let starbucksLayer = L.layerGroup();
let walgreensLayer = L.layerGroup();


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
      .bindPopup(`<h1>${crime.crim_cd_desc}</h1><hr><p>${crime.location}</p><p>Date Reported: ${crime.date_rptd}</p>`);
      crimeClusterGroup.addLayer(crimeMarker);
      crimes.push(crime);
    })
  //console.log(crimes);
  })
  .catch(error => console.error('Error:', error));
}


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
          if(cache.hasOwnProperty(business.id)){
            console.log(`cache = ${Object.keys(cache[business.id])}`)
          }
          
          // Toggle the class 'active' on both the map and sidebar elements
          // console.log('turning on');
          var mapContainer = document.getElementById('map');
          
          if(!mapContainer.classList.contains('active')){
            // console.log("didnt contain active");
            mapContainer.classList.toggle('active');
            document.getElementById('sidebar').classList.toggle('active');
          }
    
          // Update the content of the sidebar with marker information
          document.getElementById('marker-info').textContent = business.street_address;

          // Get crimes nearby
          let nearbyCrimes = [];
          // If the location's nearby crimes has already been searched, it will be stored in the cache
          if(cache.hasOwnProperty(business.id) && cache[business.id].hasOwnProperty(dateRange)){
            nearbyCrimes = cache[business.id][dateRange];
            console.log("found in cache");
          }
          else{
          // Otherwise calculate the nearby crimes
          console.log("crimes below");
          console.log(crimes);
            crimes.forEach(crime => {
              if (geolib.getDistance([business.lat, business.lon], [crime.lat, crime.lon]) <= 1000){
                nearbyCrimes.push(crime);
              }
            })
            // store nearby crimes in cache
            if(!cache.hasOwnProperty(business.id)){
              // console.log("clearing");
              cache[business.id] = {};
            }
            cache[business.id][dateRange] = nearbyCrimes;
            console.log("not found in cache")
          }
          console.log(nearbyCrimes);
          createPie(nearbyCrimes);
          createAgeHistogram(nearbyCrimes); 

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

function createPie(crimeData){
  //console.log(crimeData);

  var config = {
    displayModeBar: false
  };

  const descentNames = {
    "A": "Other Asian",
    "B": "Black",
    "C": "Chinese",
    "D": "Cambodian",
    "F": "Filipino",
    "G": "Guamanian",
    "H": "Hispanic/Latin/Mexican",
    "I": "American Indian/Alaskan Native",
    "J": "Japanese",
    "K": "Korean",
    "L": "Laotian",
    "O": "Other",
    "P": "Pacific Islander",
    "S": "Samoan",
    "U": "Hawaiian",
    "V": "Vietnamese",
    "W": "White",
    "X": "Unknown",
    "Z": "Asian Indian"
};

  var victDescentValues = crimeData.map(crime => crime.vict_descent);

  var victDescentCounts = {};
  victDescentValues.forEach(value => {
      victDescentCounts[value] = (victDescentCounts[value] || 0) + 1;
  });

  const pieChartData = {
    labels: Object.keys(victDescentCounts).map(code => descentNames[code]),
    values: Object.values(victDescentCounts),
    type: 'pie',
    marker: {
      colors: ['rgba(8, 29, 88, 0.7)', 'rgba(37, 52, 148, 0.7)', 'rgba(34, 94, 168, 0.7)', 'rgba(29, 145, 192, 0.7)',
              'rgba(65, 182, 196, 0.7)', 'rgba(127, 205, 187, 0.7)', 'rgba(199, 233, 180, 0.7)', 'rgba(237, 248, 251, 0.7)',
              'rgba(255, 255, 204, 0.7)', 'rgba(255, 237, 160, 0.7)', 'rgba(254, 217, 118, 0.7)', 'rgba(254, 178, 76, 0.7)',
              'rgba(253, 141, 60, 0.7)', 'rgba(252, 78, 42, 0.7)', 'rgba(227, 26, 28, 0.7)', 'rgba(189, 0, 38, 0.7)',
              'rgba(128, 0, 38, 0.7)', 'rgba(84, 0, 27, 0.7)']
    }
  };

  console.log("ethnicities below");
  console.log(Object.keys(victDescentCounts));
  
  var pieChartLayout = {
    height: 0.3 * window.innerHeight, // Set to one-fifth of the window height
    margin: { t: 35, b: 27, l: 0, r: 0 }, // Adjust margins as needed
    paper_bgcolor: '#f2f2f2', // Lighter background color for the pie chart
  };

  // Render the Plotly pie chart
  Plotly.newPlot('vict-descent-pie-chart', [pieChartData], pieChartLayout, config);
}

function createAgeHistogram(crimeData) {
  var config = {
    displayModeBar: false
  };

  // Extract victim ages
  const victimAges = crimeData.map(crime => crime.vict_age).filter(age => age > 0);

  if (victimAges.length === 0) {
    // Handle the case where there are no valid ages
    console.error('No valid ages available for histogram.');
    return;
  }

  // Calculate the average age
  var averageAge = victimAges.reduce((sum, age) => sum + age, 0) / victimAges.length;
  console.log(averageAge);
  if (averageAge==NaN){
    averageAge = 'All ages unknown';
  }

  const averageAgeText = isNaN(averageAge) ? 'All Ages Unknown' : `Average Age: ${averageAge.toFixed(2)}`;

  // Create a histogram trace with YlGnBu color scale
  const histogramTrace = {
    x: victimAges,
    type: 'histogram',
    nbinsx: 20,
    marker: {
      color: victimAges,
      colorscale: 'YlGnBu',
      cmin: Math.min(...victimAges),
      cmax: Math.max(...victimAges),
      // colorbar: {
      //   title: 'Age',
      //   tickvals: [Math.min(...victimAges), Math.max(...victimAges)],
      //   ticktext: [Math.min(...victimAges), Math.max(...victimAges)],
      // }
    }
  };

  // Layout options for the histogram
  const histogramLayout = {
    xaxis: {
      title: 'Age'
    },
    yaxis: {
      title: 'Frequency'
    },
    annotations: [
      {
        x: 0.95,
        y: 1.05,
        xref: 'paper',
        yref: 'paper',
        text: averageAgeText,
        showarrow: false,
        showlegend: false,
        font: {
          size: 12,
          color: 'black'
        },
        margin: { t: 10, b: 0, l: 0, r: 0 }
      }
    ]
  };

  // Render the Plotly histogram with the layout configuration
  Plotly.newPlot('age-distribution', [histogramTrace], histogramLayout, config);
}