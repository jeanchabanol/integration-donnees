
"use strict";

const express= require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', function(request, response){
	console.log('hello')
	response.send('bienvenue sur mon serveur');
})

app.get('/commune_insee', function(request, response){
	axios
	  .get('https://data.opendatasoft.com/api/records/1.0/search/?dataset=correspondance-code-insee-code-postal%40public&q=&rows=1&facet=insee_com&facet=nom_dept')
	  .then(res => {
	    console.log(`statusCode: ${res.status}`)
        response.send(res['data']['records'])
	  })
	  .catch(error => {
	    console.error(error)
	  })
})

app.listen(PORT, function(){
	console.log('Hello :'+ PORT);
})