import { test, expect, request } from '@playwright/test';

test('API GET Request', async ({ request }) => {

  const responce = await request.get('https://reqres.in/api/users?page=2');
  expect(responce.status()).toBe(200);
  const text = await responce.text();
  expect(text).toContain('Lindsay');
  console.log(await responce.json());
});

test('API login', async ({ page }) => {
  await page.goto('/');
  const loginpayload = { email: "zoro@yopmail.com", password: "Zoro@22" };
  const apicontext = await request.newContext();
  const loginresponce = await apicontext.post("https://sso.teachable.com/secure/9521/identity/login/password?force=true",
    {
      data: loginpayload
    })
  expect(loginresponce.ok()).toBeTruthy();
});


