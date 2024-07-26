import { Locator, Page, expect } from "@playwright/test";
import { logProductDetailsToJson } from "../utils/logProductDetailsToJson";
let pages;


export class AmazonPage {
    readonly page: Page;
    readonly amazonHeaderLogoSelector: Locator;
    readonly amazonSearchInputFieldSelector: Locator;
    readonly amazonSearchSubmitButtonSelector: Locator;
    readonly amazonResultInfoBarSelector: Locator;
    readonly amazonResultHeaderTitleSelector: Locator;
    readonly amazonProductSearchResultSelector: Locator;

    constructor(page: Page) {
        this.page = page;
        this.amazonHeaderLogoSelector = page.locator('div[id="nav-logo"] a[id="nav-logo-sprites"]');
        this.amazonSearchInputFieldSelector = page.locator('div[class*="nav-search-field"] input[id="twotabsearchtextbox"]');
        this.amazonSearchSubmitButtonSelector = page.locator('input[id="nav-search-submit-button"]');
        this.amazonResultInfoBarSelector = page.locator('span[data-component-type="s-result-info-bar"]');
        this.amazonResultHeaderTitleSelector = page.locator('span[data-component-type="s-messaging-widget-results-header"] h2');
        this.amazonProductSearchResultSelector = page.locator('div[data-component-type="s-search-result"] [class*="s-product-image-container"]');

    }

    async navigateToUrl(pageUrl: string) {
        await this.page.goto(pageUrl);
        await this.page.waitForLoadState();
    }

    async verifyAmazonTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    async verifyAmazonHeaderLogoIsVisible() {
        await expect(this.amazonHeaderLogoSelector).toBeVisible();
    }

    async searchForProduct(productName: string) {
        await expect(this.amazonSearchInputFieldSelector).toBeVisible();
        await this.amazonSearchInputFieldSelector.fill(productName);
        await this.amazonSearchSubmitButtonSelector.click();
        await this.page.waitForLoadState();
    }

    async verifyResultPageIsVisible() {
        await expect(this.amazonResultInfoBarSelector).toBeVisible();
        await expect(this.amazonResultHeaderTitleSelector.first()).toHaveText('Results');
    }

    async selectFirstSearchedProduct() {
        await this.amazonProductSearchResultSelector.first().click();
        await this.switchBrowserTab()
    }

    async switchBrowserTab() {
        await this.page.waitForTimeout(5000);
        pages = this.page.context().pages();
        await pages[1].waitForLoadState();
    }

    async logProductDetails() {
        const amazonProductTitleSelector = pages[1].locator('span[id="productTitle"]');
        const amazonProductPrice = pages[1].locator('span[class="a-price-whole"]');

        await expect(amazonProductTitleSelector).toBeVisible();
        await expect(amazonProductPrice.first()).toBeVisible();

        // Extract text content from the elements
        const productTitle = await amazonProductTitleSelector.textContent();
        const productPrice = await amazonProductPrice.first().textContent();
        const productUrl = await pages[1].url();

        // Prepare data to be written to JSON
        const productDetails = {
            title: productTitle.trim(),
            price: productPrice.trim(),
            url: productUrl.trim()
        };

        await logProductDetailsToJson('amazon', productDetails)
    }

    async addProductToCart() {
        const amazonAddToCartProductSelector = pages[1].locator('input[id="add-to-cart-button"]');
        const amazonCartIconSelector = pages[1].locator('a[id="nav-cart"]');
        await expect(amazonAddToCartProductSelector).toBeVisible();
        await amazonAddToCartProductSelector.dblclick();
        await pages[1].waitForLoadState();
        await amazonCartIconSelector.click();
        await pages[1].waitForLoadState();
    }

    async proceedToBuyProducts() {
        const amazonProceedToBuyButtonSelector = pages[1].locator('input[name="proceedToRetailCheckout"]');
        await expect(amazonProceedToBuyButtonSelector).toBeVisible();
        await amazonProceedToBuyButtonSelector.click();
    }
}