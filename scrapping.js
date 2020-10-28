const puppeteer = require('puppeteer');

(async() => {

    // Mở trình duyệt mới và tới trang của kenh14
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://phimporn.com/');

    const links = await page.$$eval('.post .m .post-title a', allAs => allAs.map(a => a.href));
    console.log(links);
    await browser.close();
})();