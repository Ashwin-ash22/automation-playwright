import { test, expect } from '@playwright/test';
import { Home } from '../../page/Rahulshetty/homepage';
import { Login } from '../../page/Rahulshetty/Loginpage';
import { Data } from '../../data/data.json';
import { navigateToURL } from '../../page/utility/utilityfile'
require('../../page/utility/utilityfile')

test('Login in Home page', async ({ page }) => {
  await page.goto('https://courses.rahulshettyacademy.com/');
  await page.getByRole("link", { name: "Sign Up" }).click();
  await page.locator("(//a[text()='Log in'])").click();
  await page.locator("//a[@class='loginPasswordBtn']").click();
  await page.waitForTimeout(7000);
  await page.locator("//input[@id='email']").fill("zoro@yopmail.com");
  await page.locator("//input[@id='password']").fill("Zoro@22");
  await page.locator("//input[@value='Log in']").click();
});

test('Login in Home page (Page Object)', async ({ page }) => {
  const homepage = new Home(page);
  await homepage.clickLoginButton();
  const loginpage = new Login(page);
  await loginpage.clickLoginLink();
  await loginpage.clickLoginWithIDandPasswordLink();
  await page.waitForTimeout(3000);
  await loginpage.insertEmailID(Data.RahulShetty.Email);
  await loginpage.insertPassword(Data.RahulShetty.Password);
  // await loginpage.clickSigninButton();
  // await homepage.verifyProfileIcon();
});

test('SignUp in Home page (Page Object) @ash', async ({ page, context }) => {
  const homepage = new Home(page);
  await homepage.clickLoginButton();
  const loginpage = new Login(page);
  await page.waitForTimeout(3000);
  await loginpage.insertName(Data.RahulShetty.Name);
  await loginpage.createAccountUniquemailID(context);
  await page.waitForTimeout(7000);
  await homepage.verifyProfileIcon();
});

test('Validating the L1 Navigation @ash', async ({ page, context }) => {
  const homepage = new Home(page);
  await homepage.clickLoginButton();
  const loginpage = new Login(page);
  await page.waitForTimeout(3000);
  await loginpage.insertName(Data.RahulShetty.Name);
  await loginpage.createAccountUniquemailID(context);
  await homepage.verifyProfileIcon();
  await homepage.clickL1NavigationButton('Browse products');
  await homepage.verifyUrl(Data.URL.Browse_products, 'Browse products Page');
  // await page.goBack(); 
  await homepage.clickL1NavigationButton('Home');
  await homepage.verifyUrl(Data.URL.Home, 'Home Page');
  await page.goBack(); 
  await homepage.clickL1NavigationButton('Lifetime Access');
  await homepage.verifyUrl(Data.URL.Lifetime_Access, ' Lifetime Access Page');
  await page.goBack(); 
  await homepage.clickL1NavigationButton('Mentorship');
  await homepage.verifyUrl(Data.URL.Mentorship, 'Mentorship Page');
  await page.goBack(); 
  await homepage.clickL1NavigationButton('Consulting');
  await homepage.verifyUrl(Data.URL.Consulting, 'Consulting Page');
  await page.goBack(); 
  await homepage.clickL1NavigationButton('My dashboard');
  await homepage.verifyUrl(Data.URL.My_dashboard, 'My dashboard Page');
});