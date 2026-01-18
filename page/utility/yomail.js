import { test, expect } from '@playwright/test';
module.exports.Utlity = class Utlity {
    constructor(newPage) {
        this.newPage = newPage;
        this.typethemail = newPage.getByPlaceholder('Enter your inbox here');
        this.checkinboxbutton = newPage.locator("//button[@class='md']");
        this.refresh = newPage.locator("//button[@id='refresh'");
        this.otp = newPage.locator('iframe[name="ifmail"]').contentFrame().locator("(//td[@valign='top']//p)[3]");
    }

    async insertEmailInYopmail(Mail) {
        console.log('Insert Email in Yopmail');
        await this.typethemail.fill(Mail);
    }

    async clickCheckInBoxButton() {
        console.log('Click Login Link');
        await this.checkinboxbutton.click();
        let maxAttempts = 3; // prevent infinite loops
        let attempts = 0;
        while (attempts <= maxAttempts) {
            try {
                await this.otp.waitFor({ state: 'visible', timeout: 5000 });
                console.log("OTP Received");
                break;
            } catch {
                console.log("Mail is still empty, refreshing and retrying...");
                // await this.refresh.click();
                await this.newPage.reload()
                attempts++;
            }
        }
        if (attempts === maxAttempts) {
            console.error("Failed to add product to cart after multiple attempts.");
        }
    }

    async closeYomailPage() {
        console.log('Close Yopmail');
        await this.newPage.close();
    }
};