
"use strict";

import express from 'express';
const app = express();
import axios from 'axios';
const PORT = process.env.PORT || 3000;



app.get('/', function(request, response){
	console.log('Bienvenus')
	response.send('Bienvenue sur mon serveur');
})

app.get('/Communes', function(request, response){
	
	axios
	  .get('https://datanova.legroupe.laposte.fr/api/records/1.0/search/?dataset=laposte_hexasmal&rows=1')
	  .then(res => {
		console.log(`statusCode: ${res.status}`)
	    console.log(res)
		var tab =[]
		var obj = {};
		res['data']['records'].array.forEach(element => {
			
			obj['Commune'] = element['fields']['nom_de_la_commune'];
			obj['Code_Insee'] = element['fields']['code_commune_insee']
			obj['Coord'] = element['geometry']['coordinates']

			tab= [...tab,obj]
		})
	



		response.send(tab)
	})

})
app.get('/Communes:code_insee', function(request, response){
	
	response.send('Bienvenue sur mon serveur'+ request.params.code_insee);
})
//app.get('/nom/:name', function(request, response) {
//    response.send('bienvenue ' + request.params.name);

app.listen(PORT, function(){
	console.log('Bienvenu sur le port :'+ PORT);
})