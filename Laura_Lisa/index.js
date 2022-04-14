"use strict";

var express = require("express") /* npm install express */
var csv = require('csv-express') /* npm install csv-express*/
var fetchUrl = require("fetch").fetchUrl
var cheerio = require('cheerio')
var cors = require('cors')
var XLSX = require('xlsx');
const app = express();
const PORT = process.env.PORT || 3000;

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


app.get('/', function(request, response) {
    console.log('Bienvenus')
    response.send('Bienvenu');
})


app.get('/nom1', function(request, response) {
    // Inspirée du site suivant pour le code : https://www.geeksforgeeks.org/how-to-read-and-write-excel-file-in-node-js/
    const file = XLSX.readFile('./données/Presidentielle_2017_Resultats_BV_T1_clean_def.xlsx')

    const files = file.SheetNames //Récupération des noms de feuilles du fichier excel : ici nous n'en n'avons qu'une seule mais je n'ai pas trouvée le moyen de faire autrement

    const insee = file.Sheets[files[0]]; //Récupération de la première et unique feuille du fichier excel pour pouvoir parser les données.


    var tab = 2 //Là où les observations du fichier excel commencent
    var nb = insee.length // taille du fichier excel

    var tableau = []
        //Création d'une boucle qui rempli le tableau json crée avec les données dont ont à besoin.
        //On itère la boucle sur le nombre total d'observation dans le but de récupérer dans un format json les données.
    for (let i = tab; i < 5; i++) {
        var json1 = {}; // Création d'une variable au format json
        json1['CodeInsee'] = insee['B' + i]['v']; // On créer un tableau json vide en récupérant comme identifiant de chaque tableau : le code insee. Création d'un identifiant unique.
        json1['bureau_vote'] = insee['A' + i]['v']; // On rempli le tableau json de la ligne i avec l'observation du bureau de vote,
        json1['Departement'] = insee['D' + i]['v']; // avec le nom des départements,
        json1['Inscrits'] = insee['H' + i]['v']; // avec le nb d'inscrit,
        json1['Votants'] = insee['K' + i]['v']; // avec le nb de votants,
        json1['LE PEN_ins'] = insee['AB' + i]['v']; // avec le % de votes de Marine Lepen,
        json1['MACRON_ins'] = insee['AC' + i]['v']; // avec le  % de votes de Macron,
        json1['HAMON_ins'] = insee['AD' + i]['v']; // avec le  % de votes de Hamon,
        json1['ARTHAUD_ins'] = insee['AE' + i]['v']; // avec le  % de votes de Arthaud,
        json1['POUTOU_ins'] = insee['AF' + i]['v']; // avec le % de votes de Poutou,
        json1['CHEMINADE_ins'] = insee['AG' + i]['v']; // avec  % de votes de Cheminade,
        json1['LASSALLE_ins'] = insee['AH' + i]['v']; // avec  % de votes de Lassalle,
        json1['MÉLENCHON_ins'] = insee['AI' + i]['v']; // avec  % de votes de Mélenchon,
        json1['ASSELINEAU_ins'] = insee['AJ' + i]['v']; // avec  % de votes de ASSELINEAU,
        json1['FILLON_ins'] = insee['AK' + i]['v']; // avec  % de votes de Fillon,

        tableau = [...tableau, json1]

    }
    response.json(tableau); // Affichage du tableau au format json

})

//But récupérer les données que nous avons besoins
app.get('/nom2', function(request, response) {
    // Inspiré du code : https://github.com/SheetJS/sheetjs/issues/249
    const file1 = XLSX.readFile('./données/Presidentielle_2017_Resultats_BV_T1_clean_def.xlsx')

    var json = process_wb(file1, { CodeInsee: 2, BureauVote: 1, Departement: 3, Inscrits: 8, Votant: 11, LE_PEN: 28, MACRON: 29, HAMON: 30, ARTHAUD: 31, POUTOU: 32, CHEMINADE: 33, LASSALLE: 34, MELENCHON: 35, ASSELINEAU: 36, FILLON: 37, DUPONTAIGNAN: 38 });

    // Printing data
    response.json(json);

})

app.get('/Communes', function(request, response) {

    var data = []
    axios
        .get(
            'https://datanova.legroupe.laposte.fr/api/records/1.0/search/?dataset=laposte_hexasmal&rows=12'
        )
        .then((res) => {
            const code_commune_insee = request.query.code_commune_insee;

            res['data']['records'].forEach((element) => {
                var obj = {}
                obj['nom_de_la_commune'] = element['fields']['nom_de_la_commune']
                obj['code_commune_insee'] = element['fields']['code_commune_insee']
                obj['coordinates'] = element['geometry']['coordinates']

                if (obj['code_commune_insee'] == code_commune_insee) {
                    data = [...data, obj]
                }
            })
            response.send(data)
        })
        //http://localhost:3000/Communes?code_commune_insee=25620
})



app.listen(PORT, function() {
    console.log('Bienvenu sur le port :' + PORT);
})