import { test } from '@playwright/test';
import config from '../config.json'
import { AmazonPage } from '../pageObjects/amazon';

let amazonPage: AmazonPage
let data: {}

test.describe('Amazon Product', () => {

  test.beforeEach(async ({page}) => {
    amazonPage = new AmazonPage(page);
    data = config['amazon'];

    await amazonPage.navigateToUrl(data['url']);
  });

  test('Verify Amazon Title', async ({ }) => {
    await amazonPage.verifyAmazonTitle(data['title']);
    await amazonPage.verifyAmazonHeaderLogoIsVisible();
  });

  test('Search for Product and Log Product Details', async ({ }) => {
    await amazonPage.searchForProduct(data['productToSearch']);
    await amazonPage.verifyResultPageIsVisible();
    await amazonPage.selectFirstSearchedProduct();
    await amazonPage.logProductDetails();
    await amazonPage.addProductToCart();
    await amazonPage.proceedToBuyProducts();
  });

})
