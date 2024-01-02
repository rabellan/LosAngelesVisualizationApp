const { Pool } = require('pg');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "postgres",
    database: "la_crime_db"
});

crime_query = 'SELECT date_rptd, crim_cd_desc, location, lat, lon FROM crime\
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