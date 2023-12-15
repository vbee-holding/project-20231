const puppeteer = require('puppeteer');
const fs = require('fs');
const url = "https://voz.vn/f/chuyen-tro-linh-tinh.17/";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36 Edg/94.0.992.31');
  await page.goto(url, { waitUntil: 'networkidle2' });

  const data = await page.evaluate(() => {
    let results = [];
    let items = document.querySelectorAll('.structItem');
    items.forEach((item) => {
      const title = item.querySelector('.structItem-title a').innerText.trim();
      const link = item.querySelector('.structItem-title a').href;
      const author = item.querySelector('.structItem-parts a').innerText.trim(); 
      const createAt = item.querySelector('.u-dt').title;
      const updateAt = item.querySelector('.structItem-latestDate.u-dt').title;
      const replies = item.querySelector('.pairs.pairs--justified dd').innerText.trim();
      const views = item.querySelector('.pairs.pairs--justified.structItem-minor dd').innerText.trim();
     
      results.push({
        title, link, author, createAt, updateAt, replies, views
      });
    });
    return results;
  });
  try {
    fs.writeFileSync('crawldata.json', JSON.stringify(data, null, 2));
    console.log('Saved!');
  } catch (err) {
    console.error(err);
  }
  await browser.close();
})();
