let puppeteer = require("puppeteer");
let browser = null;
let page = null;

describe("Shopee test", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 720,
    });
    jest.setTimeout(60000); // 5000ms
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    await page.goto("https://shopee.vn");
  });

  test("Search keyboard", async () => {
    // expect.assertions(1);
    // Tìm khung search, gõ sexy underwear và bấm enter

    // .$('') css selector
    // .$x xpath
    const searchBox = await page.$x(
      '//*[@id="main"]/div/header/div[2]/div/div[1]/div[1]/div/form/input'
    );
    await searchBox.keyboard.type("keycap");
    await searchBox.press("Enter");

    // Chờ trang load xong, tìm các phần tử item và đếm nếu đủ 40
    await page.waitForNavigation();
    const products = await page.$$("div[data-qa-locator=product-item]");
    expect(products.length).toBe(40);
  });
});
