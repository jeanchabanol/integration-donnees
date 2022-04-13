
"use strict";

import express from 'express'
const app = express()
import axios from 'axios'
const PORT = process.env.PORT || 3000;
import XLSX from 'xlsx'





app.get('/', function(request, response){
	console.log('Bienvenus')
	response.send('Bienvenue sur mon serveur');
})

function comm(){
		var data = [];
		axios
		.get('https://datanova.legroupe.laposte.fr/api/records/1.0/search/?dataset=laposte_hexasmal&rows=12')
		.then(res => {
			console.log(`statusCode: ${res.status}`)
			//obj['Commune'] = res['data']['records'][0]['fields']['nom_de_la_commune'];
			//obj['Code_Insee'] = res['data']['records'][0]['fields']['code_commune_insee']
			//obj['Coord'] = res['data']['records'][0]['geometry']['coordinates']
			console.log("nb records", res['data']['records'].length);
			res['data']['records'].forEach(element =>{
				const obj = {};
				console.log("element", element);
				obj['nom_de_la_commune'] = element['fields']['nom_de_la_commune'];
				obj['code_commune_insee'] = element['fields']['code_commune_insee']
				obj['coordinates'] = element['geometry']['coordinates']
				data = [...data, obj]
			})
			return(console.log(data));
			
		})
}




app.get('/comm_app', function(req, response){
	response.send(comm());
})
app.get('/Communes/:code_commune_insee', (request, response) => {
    var data = [];
	axios
	  .get('https://datanova.legroupe.laposte.fr/api/records/1.0/search/?dataset=laposte_hexasmal&rows=12')
	  .then(res => {
		//obj['Commune'] = res['data']['records'][0]['fields']['nom_de_la_commune'];
		//obj['Code_Insee'] = res['data']['records'][0]['fields']['code_commune_insee']
		//obj['Coord'] = res['data']['records'][0]['geometry']['coordinates']
		res['data']['records'].forEach(element =>{
			const obj = {};
			console.log("element", element);
			obj['nom_de_la_commune'] = element['fields']['nom_de_la_commune'];
			obj['code_commune_insee'] = element['fields']['code_commune_insee']
			obj['coordinates'] = element['geometry']['coordinates']
			
			data = [...data, obj]
		})
    })
    const products = [
        { id: 1, name: 'iPhone', price: 800 },
        { id: 2, name: 'iPad', price: 650 },
        { id: 3, name: 'iWatch', price: 750 }
    ]
    //app.get('/api/products/:productID', (req, res) => {

    //const id = Number(req.params.productID)
    //const product = products.find(product => product.id === id)

    const id = parseInt(request.params.code_commune_insee)
    const d = data.find(d => parseInt(data.code_commune_insee) === id)
    response.send(d + '')

})
  


function nom_app(){
    app.get('/nom1', function(request, response) {
        // Inspirée du site suivant pour le code : https://www.geeksforgeeks.org/how-to-read-and-write-excel-file-in-node-js/
        const file = XLSX.readFile('données/Presidentielle_2017_Resultats_BV_T1_clean_def.xlsx')

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
        return(console.log(tableau)); // Affichage du tableau au format json

    })
}

app.get('/nom_app', function(request, response){
	
	response.send(nom_app());
})


app.listen(PORT, function(){
	console.log('Bienvenu sur le port :'+ PORT);
})