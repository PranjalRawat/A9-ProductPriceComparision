import { exec } from "child_process";

export function openReportInBrowser (reportPath: string) {
    // Open the HTML report using the default web browser
    const platform = process.platform;
    let command = '';

    if (platform === 'win32') {
        command = `start ${reportPath}`;
    } else if (platform === 'darwin') {
        command = `open ${reportPath}`;
    } else if (platform === 'linux') {
        command = `xdg-open ${reportPath}`;
    }

    exec(command, (error) => {
        if (error) {
            console.error(`Error opening the report: ${error.message}`);
        }
    });
}
