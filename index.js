const puppeteer = require('puppeteer');

(async() => {

    // Mở trình duyệt mới và tới trang của kenh14
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://phimporn.com/');

    // Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến article
    const articles = await page.evaluate(() => {
        var links = document.querySelectorAll('.post-title a');
        links = [...links];
        let articles = links.map(link => ({
            title: link.getAttribute('title'),
            url: link.getAttribute('href')
        }));
        return articles;
    });

    // In ra kết quả và đóng trình duyệt
    console.log(articles);


    articles.forEach(element => {
        console.log(element.url);
        const browser2 = await puppeteer.launch({ headless: false });
        const page2 = await browser2.newPage();
        await page2.goto(element.url);
        
    });

    await browser.close();
})();