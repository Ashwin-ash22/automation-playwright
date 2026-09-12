import { test, expect } from '@playwright/test';
import { navigateToURL } from '../../page/utility/utilityfile'
import { Data } from '../../data/data.json'
import { Utlity } from '../utility/yomail'
import { Utility } from '../utility/utilityfile'
module.exports.Login = class Login extends Utility {
    constructor(page) {
        super(page);
        this.page = page;
        this.loginlink = page.getByRole("link", { name: "Log in" });
        this.loginwithidpwd = page.getByRole("link", { name: "log in with a password" });
        this.emailaddress = page.getByRole("textbox", { name: "Email" });
        this.password = page.locator("//input[@id='password']");
        this.signbutton = page.locator("//input[@value='Log in']");
        this.name = page.locator("//input[@id='name']");
        this.sendcodebutton = page.getByTestId("btn-signup");
        // this.otpbox = (index) => page.locator(`(//div[@class='GUJjR'])[${index}]`);
        this.otpbox = (index) => page.getByTestId(`otp-input-${index}`);
        this.otpbox1 = page.getByTestId('otp-input-0');
        this.otpbox2 = page.getByTestId('otp-input-1');
        this.otpbox3 = page.getByTestId('otp-input-2');
        this.otpbox4 = page.getByTestId('otp-input-3');
        this.otpbox5 = page.getByTestId('otp-input-4');
        this.otpbox6 = page.getByTestId('otp-input-5');
        this.verifybutton = page.locator("//span[text()='Verify']")
    }

    async clickLoginLink() {
        try {
            console.log('Click Login Link');
            await this.click(this.loginlink);
        } catch (error) {
            console.error('An error occurred', error);
            throw new Error('Failed to Click Login Link');
        }
    }

    async clickLoginWithIDandPasswordLink() {
        try {
            console.log('Click Login With ID and Password Link');
            await this.click(this.loginwithidpwd);
        } catch (error) {
            console.error('An error occurred', error);
            throw new Error('Failed to Click Login With ID and Password Link');
        }
    }

    async insertEmailID(Email) {
        try {
            console.log('Insert Email ID');
            await this.fill(this.emailaddress, Email)
        } catch (error) {
            console.error('An error occurred', error);
            throw new Error('Failed to Insert Email ID');
        }
    }

    async insertPassword(Password) {
        try {
            console.log('Insert Password');
            await this.fill(this.password, Password)
        } catch (error) {
            console.error('An error occurred', error);
            throw new Error('Failed to Insert Password');
        }
    }

    async clickSigninButton() {
        try {
            console.log('Click Signin Button');
            await this.click(this.signbutton);
        } catch (error) {
            console.error('An error occurred', error);
            throw new Error('Failed to Click Signin Button');
        }
    }

    async insertName(Name) {
        try {
            console.log('Insert Name');
            await this.fill(this.name, Name)
        } catch (error) {
            console.error('An error occurred', error);
            throw new Error('Failed to Insert Name');
        }
    }

    async clickSendCodeButton() {
        try {
            console.log('Click Send Code Button');
            await this.click(this.sendcodebutton);
        } catch (error) {
            console.error('An error occurred', error);
            throw new Error('Failed to Click Send Code Button');
        }
    }

    async clickVerifyButton() {
        try {
            console.log('Click Verify Button');
            await this.click(this.verifybutton);
        } catch (error) {
            console.error('An error occurred', error);
            throw new Error('Failed to Click Verify Button');
        }
    }

    async getOTP(newPage) {
        try {
            console.log('Get OTP');
            await newPage.locator('iframe[name="ifmail"]').contentFrame().locator("(//td[@valign='top']//p)[3]").waitFor({ state: 'visible', timeout: 75000 });
            const OTP = await newPage.locator('iframe[name="ifmail"]').contentFrame().locator("(//td[@valign='top']//p)[3]").innerText();  //...........Retreving and spliting the value
            console.log(OTP);
            let splitOTP = OTP;
            const myArray = splitOTP.split("");
            this.Digit1 = myArray[0];
            this.Digit2 = myArray[1];
            this.Digit3 = myArray[2];
            this.Digit4 = myArray[3];
            this.Digit5 = myArray[4];
            this.Digit6 = myArray[5];
        } catch (error) {
            console.error('An error occurred', error);
            throw new Error('Failed to Get OTP');
        }
    }

    async insertOTP() {
        try {
            console.log('Insert OTP');
            await this.fill(this.otpbox(0), this.Digit1)
            await this.fill(this.otpbox(1), this.Digit2)
            await this.fill(this.otpbox(2), this.Digit3)
            await this.fill(this.otpbox(3), this.Digit4)
            await this.fill(this.otpbox(4), this.Digit5)
            await this.fill(this.otpbox(5), this.Digit6)
        } catch (error) {
            console.error('An error occurred', error);
            throw new Error('Failed to Insert OTP');
        }
    }

    async createAccountUniquemailID(context) {
        // Standalone function to generate a unique email ID
        function generateUniqueEmail() {
            const timestamp = Date.now();
            const randomNum = Math.floor(Math.random() * 1000);
            return `zoro${timestamp}${randomNum}@yopmail.com`;
        }
        console.log("Insert Email id");
        // Generate a unique email ID
        const uniqueEmail = generateUniqueEmail();
        // Use the unique email ID in the fill method
        await this.insertEmailID(uniqueEmail);
        await this.clickSendCodeButton();
        const newPage = await context.newPage();
        const yopmailpage = new Utlity(newPage);
        await navigateToURL(newPage, Data.URL.URL_Messgae.YopMail, Data.URL.YopMailURL);
        await yopmailpage.insertEmailInYopmail(uniqueEmail);
        await yopmailpage.clickCheckInBoxButton();
        await this.getOTP(newPage);
        await yopmailpage.closeYomailPage();
        await this.insertOTP();
        await this.clickVerifyButton();
    }
};