import { test, expect, request } from '@playwright/test';
import config from '../../config.json'
import expectedProductDetails from '../../output/productDetails.json'

test.describe('API Testing : Amazon', () => {

    test('GET fetch product details', async ({ request }) => {
        const data = config['amazon'];
        const url = `https://amazon.in/s?k=${data['productToSearch']}`;

        const response = await request.get(url);
        expect(response.ok()).toBeTruthy();
        let responseText = await response.text();
        expect(responseText).toContain("Titan Karishma Analog Black Dial Men's Watch NM1639SM02/NN1639SM02")

        // Find the specific product data
        const lines = responseText.split('\n');
        let productDetails;
        const expectedPrice = expectedProductDetails['amazon']['price'];
        let actualPrice: string = '';

        for (const line of lines) {
            if (line.includes(`alt="Titan Karishma Analog Black Dial Men's Watch NM1639SM02/NN1639SM02"`)) {
                productDetails = line;
                break;
            }
        }

        for (const detail of productDetails.split('<')) {
            if (detail.includes(`a-price-whole`)) {
                actualPrice = detail.split('>')[1]
            }
        }
        expect(actualPrice).toBe(expectedPrice);
    });

});