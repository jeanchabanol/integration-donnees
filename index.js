
"use strict";

var express = require("express") /* npm install express */
var csv = require('csv-express') /* npm install csv-express*/
var fetchUrl = require("fetch").fetchUrl
var cheerio = require('cheerio')
var cors = require('cors')
var XLSX = require('xlsx');
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require('axios');
const puppeteer = require('puppeteer');

function comm_f(){
	var data = [];
	return axios
	.get('https://datanova.legroupe.laposte.fr/api/records/1.0/search/?dataset=laposte_hexasmal&rows=5000')
	.then(res => {
		//console.log(`statusCode: ${res.status}`)
		//obj['Commune'] = res['data']['records'][0]['fields']['nom_de_la_commune'];
		//obj['Code_Insee'] = res['data']['records'][0]['fields']['code_commune_insee']
		//obj['Coord'] = res['data']['records'][0]['geometry']['coordinates']
		//console.log("nb records", res['data']['records'].length);
		res['data']['records'].forEach(element =>{
			const obj = {};
		//	console.log("element", element);
			obj['nom_de_la_commune'] = element['fields']['nom_de_la_commune'];
			obj['codeInsee'] = element['fields']['code_commune_insee']
			obj['coordinates'] = element['geometry']['coordinates']
			data = [...data, obj]
		});
		return data;
	});
}

function vote_f(){
	var tableau = []
	// Inspirée du site suivant pour le code : https://www.geeksforgeeks.org/how-to-read-and-write-excel-file-in-node-js/
	const file = XLSX.readFile('./données/Presidentielle_2017_Resultats_BV_T1_clean_def.xlsx')

	const files = file.SheetNames //Récupération des noms de feuilles du fichier excel : ici nous n'en n'avons qu'une seule mais je n'ai pas trouvée le moyen de faire autrement

	const insee = file.Sheets[files[0]]; //Récupération de la première et unique feuille du fichier excel pour pouvoir parser les données.


	var tab = 2 //Là où les observations du fichier excel commencent
	var nb = insee.length // taille du fichier excel
		//Création d'une boucle qui rempli le tableau json crée avec les données dont ont à besoin.
		//On itère la boucle sur le nombre total d'observation dans le but de récupérer dans un format json les données.
	for (let i = tab; i < 5000; i++) {
		var json1 = {}; // Création d'une variable au format json
		json1['codeInsee'] = insee['B' + i]['v']; // On créer un tableau json vide en récupérant comme identifiant de chaque tableau : le code insee. Création d'un identifiant unique.
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
	return(tableau); // Affichage du tableau au format json
}


app.get('/', function(request, response){
	response.send('Bienvenue sur le site qui regroupe les données relatives aux Présidentielle 2017 : /population, /Communes (?code_commune_insee=01001), /vote(?codeInsee=01001), /join');
})

app.get('/population', function (req, response) {
    (async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(`https://public.opendatasoft.com/explore/dataset/correspondance-code-insee-code-postal/table/?flg=fr`);
        await page.waitFor(1000);
        const ville = await page.evaluate(() => {
            let ville = [];
            let elements = document.querySelectorAll('tr.odswidget-table__internal-table-row');
            for (element of elements) {
                let elem = element.querySelectorAll('div.odswidget-table__cell-container');
                test = [];
                i = 0;
                for (el of elem) {
                    if (i == 1) {
                        test.push({ codeInsee: el.querySelector('span')?.textContent });
                    }
                    else if (i == 9) {
                        test.push({ pop: parseFloat((el.querySelector('span')?.textContent).replace(",", ".")) * 1000 });
                    }
                    else {
                        ;
                    }
                    i += 1;
                }
                ville.push(test);
            }
            return ville;
        });
        response.send(ville);
    })();
})


app.get('/Communes', function(request, response) {

    var data = []
    axios
        .get(
            'https://datanova.legroupe.laposte.fr/api/records/1.0/search/?dataset=laposte_hexasmal&rows=5000'
        )
        .then((res) => {
            const code_commune_insee = request.query.code_commune_insee;

            res['data']['records'].forEach((element) => {
                var obj = {}
                obj['nom_de_la_commune'] = element['fields']['nom_de_la_commune']
                obj['code_commune_insee'] = element['fields']['code_commune_insee']
                obj['coordinates'] = element['geometry']['coordinates']

                if (obj['code_commune_insee'] == code_commune_insee) data = [...data, obj]
                else {
                    if (code_commune_insee == null) data = [...data, obj]
                }
            })
            response.send(data)
        })
        //http://localhost:3000/Communes?code_commune_insee=25620
})

app.get('/vote', function(request, response){
    const codeInsee = request.query.codeInsee;

    const file = XLSX.readFile('données/Presidentielle_2017_Resultats_BV_T1_clean_def.xlsx')

    const files = file.SheetNames //Récupération des noms de feuilles du fichier excel : ici nous n'en n'avons qu'une seule mais je n'ai pas trouvée le moyen de faire autrement

    const insee = file.Sheets[files[0]]; //Récupération de la première et unique feuille du fichier excel pour pouvoir parser les données.


    var tab = 2 //Là où les observations du fichier excel commencent
    var nb = insee.length // taille du fichier excel

    var tableau = []
        //Création d'une boucle qui rempli le tableau json crée avec les données dont ont à besoin.
        //On itère la boucle sur le nombre total d'observation dans le but de récupérer dans un format json les données.
    for (let i = tab; i < 5000; i++) {
        var json1 = {}; // Création d'une variable au format json
        json1['codeInsee'] = insee['B' + i]['v']; // On créer un tableau json vide en récupérant comme identifiant de chaque tableau : le code insee. Création d'un identifiant unique.
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

        if (json1['codeInsee'] == codeInsee) tableau = [...tableau, json1]
        else {
            if (codeInsee == null) tableau = [...tableau, json1]
        }
    }
    response.send(tableau); // Affichage du tableau au format json

})


app.get('/join', function(req, response){
	var tableau = vote_f();
	comm_f().then(function(data){
		const arr1 = [...data];
		const arr2 = [...tableau]
		const a3 = arr1.map(t1 => ({...t1, ...arr2.find(t2 => t2.codeInsee === t1.codeInsee)}))
		response.send(a3);
		
	})
})



app.listen(PORT, function(){
	console.log('Bienvenu sur le port :'+ PORT);
})