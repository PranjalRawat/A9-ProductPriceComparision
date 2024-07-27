import productDetails from '../productDetails.json';
import { generateHTMLReport } from './generateHtmlReport';
import { openReportInBrowser } from './openReportInBrowser';

function getNumericPrice(price: string) {
    return parseFloat(price.replace(/[^\d.]/g, ""));
}

function comparePrices() {
    const amazonPrice = getNumericPrice(productDetails['amazon']['price'])
    const flipkartPrice = getNumericPrice(productDetails['flipkart']['price'])

    const results: string[] = [];

    if (amazonPrice > flipkartPrice) {
        results.push(`The lower price is <b>${flipkartPrice}</b> from Flipkart.`);
        results.push(`<b>Flipkart URL:</b> <a href="${productDetails['flipkart']['url']}">${productDetails['flipkart']['title']}</a>`);
    } else if (amazonPrice < flipkartPrice) {
        results.push(`The lower price is <b>₹${amazonPrice}</b> from Amazon.`);
        results.push(`<b>Amazon URL:</b> <a href="${productDetails['amazon']['url']}">${productDetails['amazon']['title']}</a>`);
    } else {
        results.push(`Both prices are the same: <b>${productDetails['flipkart']['price']}</b>.`);
        results.push(`<b>Flipkart URL:</b> <a href="${productDetails['flipkart']['url']}">${productDetails['flipkart']['title']}</a>`);
        results.push(`<b>Amazon URL:</b> <a href="${productDetails['amazon']['url']}">${productDetails['amazon']['title']}</a>`);
    }

    return results
}

const comparisonResult = comparePrices();
const reportPath = generateHTMLReport(comparisonResult);
openReportInBrowser(reportPath);
