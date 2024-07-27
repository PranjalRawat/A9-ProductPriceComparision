import { test, expect, request } from '@playwright/test';
import config from '../../config.json'
import expectedProductDetails from '../../output/productDetails.json'

test.describe('API Testing : Flipkart', () => {

    test('GET fetch product details', async ({ request }) => {
        const data = config['flipkart'];
        const url = `https://www.flipkart.com/search?q=${data['productToSearch']}`;

        const response = await request.get(url);
        expect(response.ok()).toBeTruthy();
        let responseText = await response.text();
        expect(responseText).toContain('title="Analog Watch  - For Men NN1639SM02"')

        // Find the specific product data
        const lines = responseText.split('data-id=');
        let productDetails;
        const expectedPrice = expectedProductDetails['amazon']['price'];
        let actualPrice: string = '';

        for (const line of lines) {
            if (line.includes(`class="WKTcLC" title="Analog Watch  - For Men NN1639SM02"`)) {
                productDetails = line;
                break;
            }
        }

        for (const detail of productDetails.split('<')) {
            if (detail.includes(`Nx9bqj`)) {
                actualPrice = detail.split('>₹')[1]
            }
        }
        expect(actualPrice).toBe(expectedPrice);
    });

});