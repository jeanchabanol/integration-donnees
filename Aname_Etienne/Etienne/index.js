
"use strict";

const express = require('express')
const app = express()
const axios = require('axios');
const { response } = require('express');
const PORT = process.env.PORT || 3000;



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


app.listen(PORT, function(){
	console.log('Bienvenu sur le port :'+ PORT);
})