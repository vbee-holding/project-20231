const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36 Edge/94.0.992.31');
  
  let url = "https://voz.vn/f/chuyen-tro-linh-tinh.17/";
  let results = [];

  const navigationTimeout = 60000;
  const waitForSelectorTimeout = 30000;

  for (let i = 1; i <= 1; i++) { 
    url = `https://voz.vn/f/chuyen-tro-linh-tinh.17/page-${i}`;
    await page.goto(url, { timeout: navigationTimeout, waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.structItem.structItem--thread', { visible: true, timeout: waitForSelectorTimeout });

    const data = await page.evaluate(() => {
      let pageResults = [];

      let pageNumberElement = document.querySelector('li.pageNav-page.pageNav-page--current a');
      let pageNumber = pageNumberElement ? pageNumberElement.innerText.trim() : 'N/A';

      let items = document.querySelectorAll('.structItem.structItem--thread');
      items.forEach((item) => {
        const title = item.querySelector('.structItem-title a').innerText.trim();
        const link = item.querySelector('.structItem-title a').href;
        const author = item.querySelector('.structItem-parts a').innerText.trim(); 
        const createAt = item.querySelector('.u-dt').title;
        const updateAt = item.querySelector('.structItem-latestDate.u-dt').title;
        const replies = item.querySelector('.pairs.pairs--justified dd').innerText.trim();
        const views = item.querySelector('.pairs.pairs--justified.structItem-minor dd').innerText.trim();
       
        pageResults.push({
          pageNumber, title, link, author, createAt, updateAt, replies, views
        });
      });
      return pageResults;
    });
    results = results.concat(data);
   
  }
  try {
    fs.writeFileSync('crawldata.json', JSON.stringify(results, null, 2));
    console.log('Saved!');
  } catch (err) {
    console.error(err);
  }
  await browser.close();
})();
