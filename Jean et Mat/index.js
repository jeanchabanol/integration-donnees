const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	await page.goto(`https://public.opendatasoft.com/explore/dataset/correspondance-code-insee-code-postal/table/?flg=fr`);
	const ville = await page.evaluate(() => {
		let ville = [];
		let elements = document.querySelectorAll('tr.odswidget-table__internal-table-row');
		for (element of elements) {
      		let elem = document.querySelectorAll('div.odswidget-table__cell-container');
      		i = 0;
      		for (el of elem) {
				i += 1;
				test = []
				if (i == 2) {
          			test.push({cd: el.querySelector('span')?.textContent});
        		} else {
					;
       			}
        		ville.push({ok: test})
      		}
		}
		return ville;
	});
	console.log(ville);
	await browser.close();
})();