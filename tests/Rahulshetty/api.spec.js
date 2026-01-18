import { test, expect } from '@playwright/test';
import { Home } from '../../page/Rahulshetty/homepage';
import { Login } from '../../page/Rahulshetty/Loginpage';
import { Data } from '../../data/data.json';
require('../../page/utility/utilityfile');

test.only('API GET LogRequest', async ({ page, request }) => {
  const homepage = new Home(page);
  await homepage.clickLoginButton();
  const loginpage = new Login(page);
  await loginpage.clickLoginLink();
  await loginpage.clickLoginWithIDandPasswordLink();
  await page.waitForTimeout(3000);
  await loginpage.insertEmailID(Data.RahulShetty.Email);
  await loginpage.insertPassword(Data.RahulShetty.Password);
  await loginpage.clickSigninButton();
  await page.waitForTimeout(19000);
  const responce = await request.get('https://sso.teachable.com/secure/9521/identity/login/password');
  expect(responce.status()).toBe(422);
  const text = await responce.text();
  expect(text).toContain('zoro');
  console.log(await responce.json());
});