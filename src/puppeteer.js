const puppeteer = require('puppeteer');

async function getLatestDate(page, url){
    //ページ移動
    await page.goto(url);
    return await page.evaluate(() => document.querySelector('.newsList').children[0].firstChild.textContent.trim());
}

!(async() => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto('https://shop-healthcare.fujifilm.jp/');
      await page.click('a[href="/shop/customer/menu"]');
      await page.type('input[name="uid"]', 'kengo_tsunoda');
      sleep(2000);
      //await page.type('#user_name', 'ffs-ffhc-cp@fujifilm.com');

      await page.screenshot({
        path: 'image/indexPage.png' // スクリーンショットを撮る
      });
  
      //const latestDate = await getLatestDate(page, 'https://shop-healthcare.fujifilm.jp/');
      //console.log(`最新の新着情報の日付は${latestDate}です。`);
  
      browser.close();
    } catch(e) {
      console.error(e);
    }
  })()

  function sleep(a){
    var dt1 = new Date().getTime();
    var dt2 = new Date().getTime();
    while (dt2 < dt1 + a){
      dt2 = new Date().getTime();
    }
    return;
  }