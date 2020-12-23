const puppeteer = require('puppeteer');
const $ = require('cheerio');
const CronJob = require('cron').CronJob;

const url = 'https://www.amazon.com/Final-Fantasy-VII-Remake-PlayStation-4/dp/B00ZS80PC2/ref=sr_1_4?crid=S4NCP7YO8764&dchild=1&keywords=final+fantasy+vii+remake&qid=1608691377&sprefix=final+fan%2Caps%2C190&sr=8-4';

const setup = async (config) => {
  const browser = await puppeteer.launch(config);
  const page = await browser.newPage();

  await page.goto(url);

  return { page, browser };
};

const checkPrice = async (page) => {
  await page.reload();
  const html = await page.evaluate(() => document.body.innerHTML);

  const data = $('#priceblock_ourprice', html);
  console.log($(data).text());
};

const run = async (config) => {
  const { page, browser } = await setup(config);

  await checkPrice(page);

  await browser.close();
};

run({ headless: true });