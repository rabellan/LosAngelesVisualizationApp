const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const {
    queryCrime,
    queryMcd,
    queryChipotle,
    queryWalmart,
    queryStarbucks,
    queryWalgreens,
    crime_query
} = require('./db.js');

q = 'SELECT date_rptd, crim_cd_desc, location, lat, lon FROM crime \
where crime_id=231518531 or crime_id=231718721';
q1 = 'SELECT date_rptd, crim_cd_desc, location, lat, lon FROM crime';


function createApp() {
    //app.use(express.json());
    app.use(express.static(path.join(__dirname, '..')));
    app.get('/', (req, res) => {
        res.setHeader('Content-Type', 'text/html');
        res.sendFile(path.join(__dirname, '../../index.html'));
    });
    app.get('/api/crime/:date1/:date2', async (req, res) => {
        const date1 = req.params.date1;
        const date2 = req.params.date2;
        //console.log(date1, date2);
        let query = await queryCrime(crime_query, [date1,date2]);
        //console.log(query);
        res.json(query);
    });
    app.get('/api/mcd', async (req, res) => {
        let query = await queryMcd()
        //console.log(query);
        res.json(query);
    });
    app.get('/api/chipotle', async (req, res) => {
        let query = await queryChipotle()
        //console.log(query);
        res.json(query);
    });
    app.get('/api/walmart', async (req, res) => {
        let query = await queryWalmart()
        //console.log(query);
        res.json(query);
    });
    app.get('/api/starbucks', async (req, res) => {
        let query = await queryStarbucks()
        //console.log(query);
        res.json(query);
    });
    app.get('/api/walgreens', async (req, res) => {
        let query = await queryWalgreens()
        //console.log(query);
        res.json(query);
    });
    app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    });
}

createApp();
