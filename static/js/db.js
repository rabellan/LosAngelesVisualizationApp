//import { Client } from '/node_modules/pg';
const { Client } = require('pg');

async function connect_client() {
    const client = new Client({
        host: "localhost",
        user: "postgres",
        port: 5432,
        password: "postgres",
        database: "crime_db"
    });

    await client.connect();
}


var hi = "hi";
console.log('hello')
module.exports = hi;