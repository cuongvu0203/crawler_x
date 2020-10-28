const puppeteer = require('puppeteer');
const xlsx = require('xlsx');


async function getDataFromPage(url, page) {

    await page.goto(url);
    await page.waitFor(3000);
    const title = await page.$eval('.lcol h1', h1 => h1.textContent);
    const description = await page.$eval('.dept-ct.show-less p', description => description.textContent);
    const tags = await page.$eval('.single-tags a', tags => tags.textContent);
    const links = await page.$eval('.srv.default-srv', links => links.getAttribute('data'));

    return {
        title: title,
        description: description,
        link_url: links,
        tags: tags
    }

};

async function getLinkFromMainWeb() {
    // Mở trình duyệt mới và tới trang của kenh14
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://phimporn.com/');

    const links = await page.$$eval('.post .m .post-title a', allAs => allAs.map(a => a.href));
    await browser.close();
    return links;

};


async function main() {

    const alllinks = await getLinkFromMainWeb();

    // Mở trình duyệt mới và tới trang của kenh14
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const scrapedData = [];

    for (let link of alllinks) {
        const data = await getDataFromPage(link, page);
        //await page.waitFor(3000);
        scrapedData.push(data);
    }
    //console.log(scrapedData);

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(scrapedData);
    xlsx.utils.book_append_sheet(wb,ws);
    xlsx.writeFile(wb,"test.xlsx");

    await browser.close();

}
main();