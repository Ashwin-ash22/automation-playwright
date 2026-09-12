import { test, expect } from '@playwright/test';
import { Utility } from '../utility/utilityfile'
module.exports.Home = class Home extends Utility {
    constructor(page) {
        super(page);
        this.page = page;
        this.loginbutton = page.getByRole("link", { name: "Sign Up" });
        this.registerbutton = page.locator("//a[text()='Register']")
        this.profileicon = page.locator("//img[contains(@alt, 'Profile image for')]");
        this.L1navigation = (text) => page.getByRole("link", { name: `${text}` }).nth(0);
    }

    async launchUrl() {
        await this.page.goto('/');
    }

    async clickLoginButton() {
        try {
            console.log('Click Login Button');
            await this.waitFor(this.loginbutton, 5000);
            await this.click(this.loginbutton);
        } catch (error) {
            console.error('An error occurred', error)
            throw new Error('Failed to click Login Button')
        }
    }

    async verifyProfileIcon() {
        try {
            console.log('Verify Profile Icon');
            await this.waitFor(this.profileicon, 10000);
            await this.verifyVisible(this.profileicon);
        } catch (error) {
            console.error('An error occurred', error);
            throw new Error('Failed to Verify Profile Icon');
        }
    }

    async clickRgisterButton() {
        try {
            console.log('Click Rgister Button');
            await this.waitFor(this.registerbutton, 5000);
            await this.click(this.registerbutton);
        } catch (error) {
            console.error('An error occurred', error)
            throw new Error('Failed to click Rgister Button')
        }
    }

    async clickRgisterButton() {
        try {
            console.log('Click Rgister Button');
            await this.waitFor(this.registerbutton, 5000);
            await this.click(this.registerbutton);
        } catch (error) {
            console.error('An error occurred', error)
            throw new Error('Failed to click Rgister Button')
        }
    }

    async clickL1NavigationButton(text) {
        try {
            console.log('Click L1 Navigation ' + text + ' Button');
            await this.waitFor(this.L1navigation(text), 5000);
            await this.click(this.L1navigation(text));
        } catch (error) {
            console.error('An error occurred', error)
            throw new Error('Failed to click L1 Navigation Button')
        }
    }
};