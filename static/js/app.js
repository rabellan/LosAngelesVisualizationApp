const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const {
    queryCrime,
    queryMcd
} = require('./db.js');

q = 'SELECT date_rptd, crim_cd_desc, location, lat, lon FROM crime \
where crime_id=231518531 or crime_id=231718721'
q1 = 'SELECT date_rptd, crim_cd_desc, location, lat, lon FROM crime'


function createApp() {
    //app.use(express.json());
    app.use(express.static(path.join(__dirname, '..')));
    app.get('/', (req, res) => {
        res.setHeader('Content-Type', 'text/html');
        res.sendFile(path.join(__dirname, '../../index.html'));
    });
    app.get('/api/crime', async (req, res) => {
        let query = await queryCrime()
        //console.log(query);
        res.json(query);
    });
    app.get('/api/mcd', async (req, res) => {
        let query = await queryMcd()
        //console.log(query);
        res.json(query);
    });
    app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    });
}

createApp();

//console.log('hello')
