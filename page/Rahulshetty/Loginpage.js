import { test, expect } from '@playwright/test';
import { navigateToURL } from '../../page/utility/utilityfile'
import { Data  } from '../../data/data.json'
import { Utlity } from '../utility/yomail'
module.exports.Login = class Login {
constructor(page){
this.page = page;
this.loginlink = page.locator("(//a[text()='Log in'])");
this.loginwithidpwd = page.locator("//a[@class='loginPasswordBtn']");
this.emailaddress  = page.locator("//input[@id='email']");
this.password = page.locator("//input[@id='password']");
this.signbutton = page.locator("//input[@value='Log in']");
this.name = page.locator("//input[@id='name']");
this.sendcodebutton = page.getByTestId("btn-signup");
this.otpbox = (index) => page.locator(`(//div[@class='GUJjR'])[${index}]`);
this.otpbox1 = page.getByTestId('otp-input-0');
this.otpbox2 = page.getByTestId('otp-input-1');
this.otpbox3 = page.getByTestId('otp-input-2');
this.otpbox4 = page.getByTestId('otp-input-3');
this.otpbox5 = page.getByTestId('otp-input-4');
this.otpbox6 = page.getByTestId('otp-input-5');
this.verifybutton = page.locator("//span[text()='Verify']")
}

async clickLoginLink(){
    console.log('Click Login Link');
    await this.loginlink.click();
}

async clickLoginWithIDandPasswordLink(){
    console.log('Click Login With ID and Password Link');
    await this.loginwithidpwd.click();
}

async insertEmailID(Email){
    console.log('Insert Email ID');
    await this.emailaddress.fill(Email)
}

async insertPassword(Password){
    console.log('Insert Password');
    await this.password.fill(Password)
}

async clickSigninButton(){
    console.log('Click Signin Button');
    await this.signbutton.click();
}

async insertName(Name){
    console.log('Insert Name');
    await this.name.fill(Name)
}

async clickSendCodeButton(){
    console.log('Click Send Code Button');
    await this.sendcodebutton.click();
}

async clickVerifyButton(){
    console.log('Click Verify Button');
    await this.verifybutton.click();
}

async getOTP(newPage){
    console.log('Get OTP');
    await newPage.locator('iframe[name="ifmail"]').contentFrame().locator("(//td[@valign='top']//p)[3]").waitFor({ state: 'visible', timeout:75000 }); 
    const OTP = await newPage.locator('iframe[name="ifmail"]').contentFrame().locator("(//td[@valign='top']//p)[3]").innerText();  //...........Retreving and spliting the value
    console.log(OTP);
    let splitOTP = OTP;
const myArray = splitOTP.split("");
this.Digit1 = myArray[0];
this.Digit2 = myArray[1];
this.Digit3 = myArray[2];
this.Digit4 = myArray[3];
this.Digit5 = myArray[4];
this.Digit6 = myArray[5];
}

async insertOTP(){
    console.log('Insert OTP');
    await this.otpbox1.fill(this.Digit1)
    await this.otpbox2.fill(this.Digit2)
    await this.otpbox3.fill(this.Digit3)
    await this.otpbox4.fill(this.Digit4)
    await this.otpbox5.fill(this.Digit5)
    await this.otpbox6.fill(this.Digit6)
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
await navigateToURL(newPage, Data.URL.URL_Messgae.YopMail , Data.URL.YopMailURL);
await yopmailpage.insertEmailInYopmail(uniqueEmail);
await yopmailpage.clickCheckInBoxButton();
await this.getOTP(newPage);
await yopmailpage.closeYomailPage();
await this.insertOTP();
await this.clickVerifyButton();
}

};