const { test } = require('@playwright/test');
import { Data } from '../../data/data.json'
module.exports.Utility = class Utility {

    async click(locator) {
        await locator.click();
    }

    async fill(locator, value) {
        await locator.fill(value);
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
    await navigateToURL(page, "", Data.URL.BaseUrl)
});