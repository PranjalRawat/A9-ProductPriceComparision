import fs from 'fs';

// Define an interface for the JSON structure
interface ProductDetails {
    amazon?: {
        title: string;
        price: string;
        url: string;
    };

    flipkart?: {
        title: string;
        price: string;
        url: string;
    };
}

export async function logProductDetailsToJson (platform: string, productDetails: {}) {
    let jsonData: ProductDetails = {};
    try {
        // Read existing data from JSON file if it exists
        const existingData = fs.readFileSync('test-results/productDetails.json', 'utf-8');
        jsonData = JSON.parse(existingData);
    } catch (error) {
        // File does not exist or contains invalid JSON, initialize jsonData as an empty object
        console.log('Creating new JSON file or initializing with existing data.');
    }

    // Add or update Amazon details
    jsonData[platform] = productDetails;

    // Write the updated JSON data to a file
    fs.writeFileSync('test-results/productDetails.json', JSON.stringify(jsonData, null, 2), 'utf-8');
}
