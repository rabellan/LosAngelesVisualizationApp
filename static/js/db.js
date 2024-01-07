const { Pool } = require('pg');
const fs = require('fs');

// Creating flag to retrieve credentials from file or in this module.
//let separate_file = false;
let separate_file = true;

//Creating flag to determine if server is deployed locally or remotely.
//let remote = false;
let remote = true;

if (!separate_file) {
    if (!remote) {
        var creds = {
            host: "localhost",
            user: "postgres",
            port: 5432,
            password: "postgres",
            database: "la_crime_db"
        }
    }
    else {
        var creds = {
            max: 2,
            host: "mahmud.db.elephantsql.com",
            user: "vimnwbvh",
            port: 5432,
            password: "hYXaJQJjKbccRbR5KcG9PkjTUq0e53hE",
            database: "vimnwbvh",
            ssl: {
            rejectUnauthorized: false,
            }
        }
    }
}
else {
    if (!remote)
        var credPath = "../resources/creds_local.json";
    else 
        var credPath = "../resources/creds_remote.json";
    var creds = JSON.parse(fs.readFileSync(credPath, 'utf8'));
}


const pool = new Pool(creds);


crime_query = 'SELECT date_rptd, crim_cd_desc, location, lat, lon, time_occ, vict_age, vict_sex, vict_descent FROM crime\
 WHERE date_rptd BETWEEN $1 AND $2'

crime_params = [
    '2023-12-04',
    '2023-12-18'
]

mcd_query = "SELECT * FROM business where dba_name like 'MCDONALD%'"

chipotle_query = "SELECT * FROM business where business_name like 'CHIPOTLE%'"

walmart_query = "SELECT * FROM business where business_name like 'WALMART%'"

starbucks_query = "SELECT * FROM business where business_name like 'STARBUCKS%'"

walgreens_query = "SELECT * FROM business where dba_name like 'WALGREEN%'"

async function selectQuery(query, params) {
    let response = await pool.query(query, params);
    //console.log(response.rows);
    return response.rows;
}

async function queryCrime(query=crime_query, params=crime_params) {
    let rows = await selectQuery(query, params);
    return rows;
}

async function queryMcd(query=mcd_query) {
    let rows = await selectQuery(query);
    return rows;
}

async function queryChipotle(query=chipotle_query) {
    let rows = await selectQuery(query);
    return rows;
}

async function queryWalmart(query=walmart_query) {
    let rows = await selectQuery(query);
    return rows;
}

async function queryStarbucks(query=starbucks_query) {
    let rows = await selectQuery(query);
    return rows;
}

async function queryWalgreens(query=walgreens_query) {
    let rows = await selectQuery(query);
    return rows;
}

//sendQuery('SELECT * FROM crime where crime_id=231518531 or crime_id=231718721')
//sendQuery('SELECT * FROM crime')

module.exports = {
    queryCrime,
    queryMcd,
    queryChipotle,
    queryWalmart,
    queryStarbucks,
    queryWalgreens,
    crime_query
};