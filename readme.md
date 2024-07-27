# E-commerce automation and Product Price Comparison

The prototype framework is designed to automate process of searching for a product on Amazon.in and Flipkart.com websites, Navigating through the purchase process, and comparing the lowest-cost product available on both platforms.

### Prerequisites

- **Node.js** : Ensure latest ( at least v18.18.0 + ) nodejs is installed on your system. You can download it from [nodejs.org](https://nodejs.org/en).
- **Git** : Install Git to clone the repository and manage version control. You can download Git from [git-scm](https://git-scm.com/downloads)
- **GitHub SSH Configuration**: Set up SSH access to GitHub for secure cloning. Follow the [GitHub SSH setup guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) for instructions

## Getting Started

You have two options to download the project locally on your machine:

### Option 1 : Cloning the repository

1. Cloning the repository. Go to the terminal and to desired directory and run the command below.

   ```bash
   git clone git@github.com:PranjalRawat/A9-ProductPriceComparision.git
   ```

### Option 2 : Downloading the zip file

1. Download the zip file.
   - Navigate to [Github Repository page](https://github.com/PranjalRawat/A9-ProductPriceComparision.git)
   - Click on the 'Code' button
   - Select 'Download Zip'
2. Extract the Zip File
   - Extract the contents of the downloaded ZIP file to a directory of your choice.

### Installation:

1. Go to the root directory and run the following command.

   ```bash
   npm install
   ```

   This command installs the required dependencies listed in the package.json file. If you prefer using yarn, you can use `yarn install` instead.

### Configuration

The automation framework fetches data from configuration file named `config.json` located in the project's root directory. This file provides essential paths and details for accessing data.

```json
{
  "amazon": {
    "url": "https://www.amazon.in/",
    "title": "Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in",
    "productToSearch": "Titan Watch NN1639SM02"
  },

  "flipkart": {
    "url": "https://www.flipkart.com/",
    "title": "Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!",
    "productToSearch": "Titan Watch NN1639SM02"
  }
}
```

### Running the test-suites

#### FrontEnd / UI

There are two ways to run the testcase.

1. Individually:

   ```bash
   npm run test:ui:amazon
   ```

   ```bash
   npm run test:ui:flipkart
   ```

   These commands will execute the test suites individually and show the html report at the end of the test case execution.

2. Full test-suites:

   ```
   npm run test:ui
   ```

   This commands will execute the all test suites and show the html report at the end of the test case execution.

#### BackEnd / API

There are two ways to run the testcase.

1. Individually:

   ```bash
   npm run test:api:amazon
   ```

   ```bash
   npm run test:api:flipkart
   ```

   These commands will execute the test suites individually.

2. Full test-suites:

   ```
   npm run test:api
   ```

   This commands will execute the all test suites.

### Running the Compare Price Script

To run the script to compare the product prices fetched from above steps follow these steps:

```
npm run comparePrice
```

Note: This will execute the compare price script and open up the web app showing the output html report.

### Reporting

- To view the test report navigate to `playwright-report` directory and open the `index.html` file in any preferred browser. This html report contain all the test cases and the steps which are followed with screenshot and video recording for each test execution and time taken by the test cases during execution.

- To view the product price compare report navigate to `output` directory and open the `compare-report.html` file in any preferred browser. This html report contain comparison result clearly indicating which platform offers the lowest price for the specified product and the url.
