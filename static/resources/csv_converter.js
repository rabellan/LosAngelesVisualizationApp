const fs = require('fs');
const Papa = require('papaparse');

// Read the CSV file
const csvData = fs.readFileSync('McDonald_s.csv', 'utf8');

// Parse CSV to JSON
Papa.parse(csvData, {
  header: true,  // Treat the first row as headers
  complete: function(result) {
    // Result is a JSON object
    const jsonData = JSON.stringify(result.data, null, 2);

    // Write JSON data to a file
    fs.writeFileSync('mcd_locations.json', jsonData);

    console.log('Conversion complete. JSON file created: output.json');
  }
});
