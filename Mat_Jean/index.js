"use strict";

const puppeteer = require('puppeteer');
const express = require('express');
const { response } = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
var XLSX = require('xlsx');

app.get('/', function(request, response){
	response.send('bienvenue sur mon serveur');
})

app.get('/comm_app', function (req, response) {
	(async () => {
		const browser = await puppeteer.launch({headless: true});
		const page = await browser.newPage();
		await page.goto(`https://public.opendatasoft.com/explore/dataset/correspondance-code-insee-code-postal/table/?flg=fr`);
		await page.waitFor(1000);
		const ville = await page.evaluate(() => {
			let ville = [];
			let elements = document.querySelectorAll('tr.odswidget-table__internal-table-row');
			for (element of elements) {
				let elem = element.querySelectorAll('div.odswidget-table__cell-container');
				i = 0;
				for (el of elem) {
					if (i==1) {
						ok = el.querySelector('span')?.textContent;
					}
					else if (i==9) {
						ville.push({
							codeInsee: ok,
							pop: parseFloat((el.querySelector('span')?.textContent).replace(",", "."))*1000
						});
					}
					else {
						;
					}
					i += 1;
				};
			}
			return ville;
		});
		console.log(ville);
		response.send(ville);
		return ville;
	})();
})

app.listen(PORT, function () {
	console.log('Hello ' + PORT);
})