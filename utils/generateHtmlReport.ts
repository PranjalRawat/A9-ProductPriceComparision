import * as fs from 'fs';
import path from 'path';

const reportPath = path.resolve('test-results/compare-report.html');

export function generateHTMLReport(content: string[]) {
    const listItems = content.map(item => `<li>${item}</li>`).join('\n');
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Price Comparison Report</title>
    </head>
    <body>
        <h1>Price Comparison Report</h1>
        <ul>\n${listItems}\n</ul>
    </body>
</html>`;

    fs.writeFileSync(reportPath, htmlContent, 'utf8');
    return reportPath;
}
