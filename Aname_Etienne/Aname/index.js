
"use strict";

import express from 'express';
const app = express();
import axios from 'axios';
const PORT = process.env.PORT || 3000;


// const courses =[
//     {id: 1, name: 'course1'},
//     {id: 2, name: 'course2'},
//     {id: 3, name: 'course3'}
// ]

// app.get('/api/courses', function(req, res) {
//     response.send('<strong>bienvenue sur mon serveur<strong>');
// })

// //:name variable
// //Paramètre qui rest dans l'utilisation de la route
// //app.get('/nom/:name', function(request, response) {
// //    response.send('bienvenue ' + request.params.name);
// //})

// //:name?var1=1&var2=2
// app.get('/api/courses', function(req, res) {
//     res.send(courses);
// })

// app.get('/api/courses/:id', function(req, res) {
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if (!course) res.status (404).send ('The course with the given ID was not found');
//     res.send(course);
// })

// app.listen(PORT, function() {
//     console.log('Hello :' + PORT);
// })


app.get('/', function(request, response){
	console.log('Bienvenus')
	response.send('Bienvenue sur mon serveur');
})

app.get('/Communes', function(request, response){
	var obj = new Object();
	
	axios
	  .get('https://datanova.legroupe.laposte.fr/api/records/1.0/search/?dataset=laposte_hexasmal&rows=1')
	  .then(res => {
		console.log(`statusCode: ${res.status}`)
	    console.log(res)

		obj.a = res['data']['records'][0]['fileds']['nom_de_la_commune']
		obj.b = res['data']['records'][0]['fileds']['nom_de_la_commune']
		obj.c = res['data']['records'][0]['fileds']['nom_de_la_commune']

		var jsons = JSON.stringify(obj)




		response.send(jsons)
	})

})


app.listen(PORT, function(){
	console.log('Bienvenu sur le port :'+ PORT);
})