import { test, expect } from '@playwright/test';
module.exports.Utlity = class Utlity {
constructor(newPage){
this.newPage = newPage;
this.typethemail = newPage.getByPlaceholder('Enter your inbox here')
this.checkinboxbutton = newPage.locator("//button[@class='md']");
}

async insertEmailInYopmail(Mail){
    console.log('Insert Email in Yopmail');
      await this.typethemail.fill(Mail);
}

async clickCheckInBoxButton(){
    console.log('Click Login Link');
    await this.checkinboxbutton.click();
}

async closeYomailPage(){
    console.log('Close Yopmail');
    await this.newPage.close();
}
};