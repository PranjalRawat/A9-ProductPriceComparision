import { test } from '@playwright/test';
import config from '../config.json'
import { FlipkartPage } from '../pageObjects/flipkart';

let flipkartPage: FlipkartPage
let data: {}

test.describe('Flipkart Product', () => {

  test.beforeEach(async ({page}) => {
    flipkartPage = new FlipkartPage(page);
    data = config['flipkart'];

    await flipkartPage.navigateToUrl(data['url']);
  });

  test.skip('Verify Flipkart Title', async ({ }) => {
    await flipkartPage.verifyFlipkartTitle(data['title']);
    await flipkartPage.verifyFlipkartHeaderLogoIsVisible();
  });

  test('Search for Product and Log Product Details', async ({ }) => {
    await flipkartPage.searchForProduct(data['productToSearch']);
    await flipkartPage.verifyResultPageIsVisible();
    await flipkartPage.selectFirstSearchedProduct();
    await flipkartPage.logProductDetails();
    await flipkartPage.addProductToCart();
    await flipkartPage.proceedToBuyProducts();
  });

})
