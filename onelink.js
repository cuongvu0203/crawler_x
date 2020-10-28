const puppeteer = require('puppeteer');

(async() => {

    // Mở trình duyệt mới và tới trang của kenh14
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://phimporn.com/sex-du-nu-sinh-nhat-ban-thich-lam-gai/');
    await page.waitFor(3000);

    const links = await page.$eval('.srv.default-srv', links => links.getAttribute('data'));

    // In ra kết quả và đóng trình duyệt
    console.log(links);  
})();