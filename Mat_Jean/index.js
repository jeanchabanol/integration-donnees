const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	await page.goto(`https://public.opendatasoft.com/explore/dataset/correspondance-code-insee-code-postal/table/?flg=fr`);
	const ville = await page.evaluate(() => {
		let ville = [];
		let elements = document.querySelectorAll('tr.odswidget-table__internal-table-row');
		for (element of elements) {
      		let elem = element.querySelectorAll('div.odswidget-table__cell-container');
			test = [];
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
	console.log(ville);
	await browser.close();
})();