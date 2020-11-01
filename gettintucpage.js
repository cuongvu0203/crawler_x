const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://thcsaimo.longbien.edu.vn/hoat-dong-chung-c5129.aspx');

        const scrappedData = [];
        
        const title = await page.$$eval('.abctitle .title a', allAs => allAs.map(a => a.innerHTML));
        const image_thumb = await page.$$eval('.img img', allAs => allAs.map(a => a.getAttribute('src')));
        const description = await page.$$eval('.abctitle .desc', allAs => allAs.map(a => a.innerHTML));
        const links = await page.$$eval('.abctitle .title a', allAs => allAs.map(a => a.href));

        var data = {
            title : title,
            image : image_thumb,
            desc : description,
            url : links
        }
        scrappedData.push(data);
        console.log(scrappedData);


    } catch (error) {
        console.log(error);

    }

})();