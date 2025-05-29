import { test, expect } from '@playwright/test';
module.exports.Home = class Home {
    constructor(page) {
        this.page = page;
        this.loginbutton = page.locator("(//a[@class='theme-btn'])[1]");
        this.registerbutton = page.locator("//a[text()='Register']")
        this.profileicon = page.locator("//img[contains(@alt, 'Profile image for')]");
    }

    async launchUrl() {
        await this.page.goto('/');
    }

    async clickLoginButton() {
        try {
            console.log('Click Login Button');
            await this.loginbutton.waitFor({ state: 'visible', timeout: 5000 });
            await this.loginbutton.click();
        } catch (error) {
            console.error('An error occurred', error)
            throw new Error('Failed to click Login Button')
        }
    }

    async verifyProfileIcon() {
        try {
            console.log('Verify Profile Icon');
            await this.profileicon.waitFor({ state: 'visible', timeout: 10000 });
            await expect(this.profileicon).toBeVisible();
        } catch (error) {
            console.error('An error occurred', error);
            throw new Error('Failed to Verify Profile Icon');
        }
    }

    async clickRgisterButton() {
        try {
            console.log('Click Rgister Button');
            await this.registerbutton.waitFor({ state: 'visible', timeout: 5000 });
            await this.registerbutton.click();
        } catch (error) {
            console.error('An error occurred', error)
            throw new Error('Failed to click Rgister Button')
        }
    }
};