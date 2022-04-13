
"use strict";

const express = require('express')
const app = express()
const axios = require('axios');
const PORT = process.env.PORT || 3000;



app.get('/', function(request, response){
	console.log('Bienvenus')
	response.send('Bienvenue sur mon serveur');
})

app.get('/Communes', function(request, response){
	var data = [];
	axios
	  .get('https://datanova.legroupe.laposte.fr/api/records/1.0/search/?dataset=laposte_hexasmal&rows=12')
	  .then(res => {
<<<<<<< HEAD
=======
		console.log(`statusCode: ${res.status}`)
<<<<<<< HEAD
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
=======
>>>>>>> 312a402c3ec98f24dda3eda74618aa8e7a7aa218
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
		response.send(data)


>>>>>>> 3c75509ac597cf4f72e5c50908d1ee93e6f55e14
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