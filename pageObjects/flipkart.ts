import { Locator, Page, expect } from "@playwright/test";
import { logProductDetailsToJson } from "../utils/logProductDetailsToJson";
let pages;


export class FlipkartPage {
    readonly page: Page;
    readonly flipkartHeaderLogoSelector: Locator;
    readonly flipkartSearchInputFieldSelector: Locator;
    readonly flipkartSearchSubmitButtonSelector: Locator;
    readonly flipkartResultInfoBarSelector: Locator;
    readonly flipkartProductSearchResultSelector: Locator;

    constructor(page: Page) {
        this.page = page;
        this.flipkartHeaderLogoSelector = page.locator('picture[title="Flipkart"] img');
        this.flipkartSearchInputFieldSelector = page.locator('input[title="Search for Products, Brands and More"]');
        this.flipkartSearchSubmitButtonSelector = page.locator('button[title="Search for Products, Brands and More"]');
        this.flipkartResultInfoBarSelector = page.getByText('results for')
        this.flipkartProductSearchResultSelector = page.locator('a[title="Analog Watch  - For Men NN1639SM02"]');

    }

    async navigateToUrl(pageUrl: string) {
        await this.page.goto(pageUrl);
        await this.page.waitForLoadState();
    }

    async verifyFlipkartTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    async verifyFlipkartHeaderLogoIsVisible() {
        await expect(this.flipkartHeaderLogoSelector).toBeVisible();
    }

    async searchForProduct(productName: string) {
        await expect(this.flipkartSearchInputFieldSelector).toBeVisible();
        await this.flipkartSearchInputFieldSelector.fill(productName);
        await this.flipkartSearchSubmitButtonSelector.click();
        await this.page.waitForLoadState();
    }

    async verifyResultPageIsVisible() {
        await expect(this.flipkartResultInfoBarSelector.first()).toBeVisible();
    }

    async selectFirstSearchedProduct() {
        await this.flipkartProductSearchResultSelector.first().click();
        await this.switchBrowserTab()
    }

    async switchBrowserTab() {
        await this.page.waitForTimeout(5000);
        pages = this.page.context().pages();
        await pages[1].waitForLoadState();
    }

    async logProductDetails() {
        const flipkartProductTitleSelector = pages[1].getByText('Analog Watch  - For Men NN1639SM02')
        const flipkartProductPrice = pages[1].getByText('₹');

        await expect(flipkartProductTitleSelector.first()).toBeVisible();
        await expect(flipkartProductPrice.first()).toBeVisible();

        // Extract text content from the elements
        const productTitle = await flipkartProductTitleSelector.first().textContent();
        const productPrice = await flipkartProductPrice.first().textContent();
        const productUrl = await pages[1].url();

        // Prepare data to be written to JSON
        const productDetails = {
            title: productTitle.trim(),
            price: productPrice.trim(),
            url: productUrl.trim()
        };

        await logProductDetailsToJson('flipkart', productDetails)
    }

    async addProductToCart() {
        const flipkartAddToCartProductSelector = pages[1].getByText('Add to cart');
        await expect(flipkartAddToCartProductSelector).toBeVisible();
        await flipkartAddToCartProductSelector.click();
        await pages[1].waitForLoadState();
    }

    async proceedToBuyProducts() {
        const flipkartProceedToBuyButtonSelector = pages[1].getByText('Place Order');
        await expect(flipkartProceedToBuyButtonSelector).toBeVisible();
        await flipkartProceedToBuyButtonSelector.click();
    }
}