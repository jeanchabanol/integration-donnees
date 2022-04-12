"use strict";

import fs from 'fs';
import express from 'express';
import csv from 'csv-express'
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', function(request, response) {
    console.log('Bienvenus')
    response.send('Bienvenue sur mon serveur');
})

fs.readFile('Presidentielle_2017_Resultats_BV_T1_clean_def.csv', 'utf8', function(request, response) {
    var dataArray = response.split(/\r?\n/);

    app.get('/names', function(request, response) {
        res.json(dataArray);
    })
});

app.get('/Communes', function(request, response) {
    response.send('Communes')

})

app.listen(PORT, function() {
    console.log('Bienvenu sur le port :' + PORT);
})
