const { test, expect } = require('@playwright/test');
import { Data } from '../../data/data.json'
module.exports.Utility = class Utility {

    async click(locator) {
        await locator.click();
    }

    async fill(locator, value) {
        await locator.fill(value);
    }

    async waitFor(locator, timeout = 10000) {
        await locator.waitFor({ state: 'visible', timeout });
    }

    async verifyVisible(locator) {
        await expect(locator).toBeVisible();
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    async verifyUrl(PageUrl, PageName) {
        try {
            console.log("verifying" + PageName + " url");
            await this.page.waitForLoadState('networkidle');
            const urlPattern = new RegExp(PageUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
            await this.page.waitForURL(urlPattern, { timeout: 30000 });
            const currentUrl = await this.getCurrentUrl();
            expect(currentUrl).toContain(PageUrl);
            console.log(currentUrl);
        } catch (error) {
            console.error('An error occurred: ', error);
            throw new Error('Failed to verifying' + PageName + 'url '); // This will fail the test case 
        }
    }
};

export async function navigateToURL(page, Lanched_site, URL) {
    try {
        console.log('Navigate to URL ' + Lanched_site);
        page.once('load', () => { console.log('page fully loaded'); })
        await page.goto(URL);
    } catch (error) {
        console.error('An error occurred: ', error);
        throw new Error(' Failed to launch site/landing'); // This will fail the test case
    }
}

test.beforeEach(async ({ page }) => {
    await navigateToURL(page, "RahulShetty_LaunchSite", Data.URL.BaseUrl)
});