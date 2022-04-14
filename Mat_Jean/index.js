//On definit les constantes
const { response } = require('express');
const puppeteer = require('puppeteer');

//code traitement scrapping
(async () => {

	//constantes
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();

	//chargement de la page web avec les donnees
	await page.goto(`https://public.opendatasoft.com/explore/dataset/correspondance-code-insee-code-postal/table/?flg=fr`);
	await page.waitFor(1000);
	const ville = await page.evaluate(() => {

		// Pour chaque ville on parcourt les elements et on recupere le code INSEE ainsi que la population
		let ville = [];
		let elements = document.querySelectorAll('tr.odswidget-table__internal-table-row');
		for (element of elements) {
      		let elem = element.querySelectorAll('div.odswidget-table__cell-container');
			test = [];

			// On donne un numero i a chaque element (INSEE 1 / Population 9)
			i = 0;
      		for (el of elem) {
				if (i==1) {
					test.push({codeInsee: el.querySelector('span')?.textContent});
				}
				else if (i==9) {
					test.push({pop: parseFloat((el.querySelector('span')?.textContent).replace(",", "."))*1000});
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

	//On renvoie chaque ville avec son code INSEE et sa population
	console.log(ville);
	response.send(ville);
	await browser.close();
})();