import fs from 'fs';
import { productDetailJsonPath, outputDirPath } from './constant';

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

export async function logProductDetailsToJson (platform: "amazon" | "flipkart", productDetails: any) {
    let jsonData: ProductDetails = {};
    try {
        // Read existing data from JSON file if it exists
        const existingData = fs.readFileSync(productDetailJsonPath, 'utf-8');
        jsonData = JSON.parse(existingData);
    } catch (error) {
        // File does not exist or contains invalid JSON, initialize jsonData as an empty object
        console.log('Creating new JSON file or initializing with existing data.');
    }

    // Add or update product details
    jsonData[platform] = productDetails;

    // Ensure the output directory exists
    if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
    }

    // Write the updated JSON data to a file
    fs.writeFileSync(productDetailJsonPath, JSON.stringify(jsonData, null, 2), 'utf-8');
}
