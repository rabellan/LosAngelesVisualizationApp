let yearOptions = [2023];

let dayOptions = [];
for (let i = 1; i <= 31; i++)
  dayOptions.push(i);

let monthOptions = [];
for (let i = 1; i <= 12; i++)
  monthOptions.push(i);

function checkDate(year_param, month_param, day_param) {
    let year = parseInt(year_param);
    let month = parseInt(month_param);
    let day = parseInt(day_param);
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
    else if (!(dayOptions.includes(day))) {
    console.log("date is over 31 days");
    return false;
    }
    console.log("date is valid");
    return true;
}
// console.log(checkDate(2000, 11, 30))

function compareDateStr(dateStr1, dateStr2) {
    // console.log(dateStr1, dateStr2)
    // console.log(new Date(dateStr2) - new Date(dateStr1) > 0)
    return new Date(dateStr2) - new Date(dateStr1) > 0;
}

function createDateDropdown() {
    let container = d3.select("#date-container");
    let first_date = true;
    for (let i = 0; i < 2; i ++) {
    let dropdown = container.append("select").attr("class", "menu").attr("id", "menu" + ((i*3)+1));
    dropdown.selectAll("option").data(yearOptions).enter().append("option").text(d => d);
    let dropdown1 = container.append("select").attr("class", "menu").attr("id", "menu" + ((i*3)+2));
    dropdown1.selectAll("option").data(monthOptions).enter().append("option").text(d => d).property("selected", function(d){ return d == "12"; });
    let dropdown2 = container.append("select").attr("class", "menu").attr("id", "menu" + ((i*3)+3));
    if (first_date) {
        dropdown2.selectAll("option").data(dayOptions).enter().append("option").text(d => d).property("selected", function(d){ return d == "1"; });
        container.append("span").attr("id", "space").text("to");
        first_date = false;
    }
    else
        dropdown2.selectAll("option").data(dayOptions).enter().append("option").text(d => d).property("selected", function(d){ return d == "31"; });
    }
    let button = container.append("button").attr("id", "button").text("OK");
    button.on("click", getCrimeData)
}

function printSelections() {
    let year1 = d3.select("#menu1").property("value");
    let month1 = d3.select("#menu2").property("value");
    let day1 = d3.select("#menu3").property("value");
    console.log(`${year1}-${month1}-${day1}`);
    checkDate(year1, month1, day1);
    let year2 = d3.select("#menu4").property("value");
    let month2 = d3.select("#menu5").property("value");
    let day2 = d3.select("#menu6").property("value");
    console.log(`${year2}-${month2}-${day2}`);
    checkDate(year2, month2, day2);
}

function getCrimeData() {
    let container = d3.select("#date-container");
    let year1 = d3.select("#menu1").property("value");
    let month1 = d3.select("#menu2").property("value");
    let day1 = d3.select("#menu3").property("value");
    // console.log(`${year1}-${month1}-${day1}`);
    let year2 = d3.select("#menu4").property("value");
    let month2 = d3.select("#menu5").property("value");
    let day2 = d3.select("#menu6").property("value");
    // console.log(`${year2}-${month2}-${day2}`);
    if (!(checkDate(year1, month1, day1) && checkDate(year2, month2, day2))){
        console.log("At least one of your dates are invalid.")
        container.attr("class", "wrong-date");
        return;
    }
    if (!(compareDateStr(`${year1}-${month1}-${day1}`, `${year2}-${month2}-${day2}`))){
        console.log("The first date is later than the second date.")
        container.attr("class", "wrong-date");
        return;
    }
    fetch(`http://localhost:3000/api/crime/${year1}-${month1}-${day1}/${year2}-${month2}-${day2}`)
    .then(response => response.json())
    .then(data => {
    container.attr("class", "right-date");
    dateRange = `${year1}-${month1}-${day1}/${year2}-${month2}-${day2}`
    control.removeLayer(crimeClusterGroup);
    myMap.removeLayer(crimeClusterGroup);
    crimeClusterGroup = L.markerClusterGroup();
    // Reset crimes array for new date range
    crimes.length =0;
    data.forEach(crime => {
      let crimeMarker = L.marker([crime.lat, crime.lon])
      .bindPopup(`<h1>${crime.crim_cd_desc}</h1><hr><p>${crime.location}</p><p>Date Reported: ${crime.date_rptd}</p>`);;
      crimeClusterGroup.addLayer(crimeMarker);
      crimes.push(crime);
    })
    myMap.addLayer(crimeClusterGroup);
    control.addOverlay(crimeClusterGroup, "Crime");
    console.log("crime range updated");
    
  })
  .catch(error => console.error('Error:', error));
}


createDateDropdown();