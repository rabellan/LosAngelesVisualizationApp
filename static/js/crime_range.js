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