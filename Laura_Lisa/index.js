"use strict";

var express = require("express") /* npm install express */
var csv = require('csv-express') /* npm install csv-express*/
var fetchUrl = require("fetch").fetchUrl
var cheerio = require('cheerio')
var cors = require('cors')
var XLSX = require('xlsx');
const app = express();
const PORT = process.env.PORT || 3000;



app.get('/', function(request, response) {
    console.log('Bienvenus')
    response.send('Bienvenue sur mon serveur');
})

app.get('/nom', function(request, response) { // NE FONCTIONNE QU'EN LOCAL

    const file = XLSX.readFile('./données/Presidentielle_2017_Resultats_BV_T1_clean_def.xlsx')

    let data = []

    const sheets = file.SheetNames

    for (let i = 0; i < sheets.length; i++) {
        console.log(i);
        const temp = XLSX.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]], { codeinsee: "2" })
        temp.forEach((response) => {
            data.push(response)
        })
    }

    // Printing data
    response.send(data);

})

function process_wb(wb, headers) {
    var sheet = wb.Sheets[wb.SheetNames[0]];
    var H = []; // we need to convert the headers object into an array
    Object.keys(headers).forEach(function(h) {
        if (!headers.hasOwnProperty(h)) return;
        H[+headers[h] - 1] = h; // the array is zero-indexed
    });
    var s2jopts = {
        range: 1, // skip the first row -- remove this line if the first row in your worksheet is data
        header: H
    };
    var json = XLSX.utils.sheet_to_json(sheet, s2jopts);
    json.forEach(function(j) { delete j["undefined"]; }); // this will be unnecessary soon
    return json;
}

app.get('/nom1', function(request, response) { // NE FONCTIONNE QU'EN LOCAL

    const file = XLSX.readFile('./données/Presidentielle_2017_Resultats_BV_T1_clean_def.xlsx')

    var json = process_wb(file, { CodeInsee: 2, });
    console.log(json);

    // Printing data
    response.send(json);

})

app.get('/Communes', function(request, response) {
    response.send('Communes')

})



app.listen(PORT, function() {
    console.log('Bienvenu sur le port :' + PORT);
})
