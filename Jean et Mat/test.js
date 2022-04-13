const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	await page.goto(`https://public.opendatasoft.com/explore/dataset/correspondance-code-insee-code-postal/table/?flg=fr`);
	const ville = await page.evaluate(() => {
		let ville = [];
    let i = 0;
		let elements = document.querySelectorAll('tr.odswidget-table__internal-table-row');
		for (element of elements) {
			ville.push({
				codeInsee: element.querySelector('span')?.textContent
        /*,
				title: element.querySelector('td.overview-top a')?.text.trim(),
				time: element.querySelector('p.cert-runtime-genre time')?.textContent,
				description: element.querySelector('div.outline')?.textContent.trim()*/
			})
		}
		return ville;
	});
	console.log(ville);
	await browser.close();
})();