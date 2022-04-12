
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
		var obj = {};
		obj['Commune'] = res['data']['records'][0]['fields']['nom_de_la_commune'];
		obj['Code_Insee'] = res['data']['records'][0]['fields']['code_commune_insee']
		obj['Coord'] = res['data']['records'][0]['geometry']['coordinates']



		response.send(obj)
	})

})


app.listen(PORT, function(){
	console.log('Bienvenu sur le port :'+ PORT);
})