import { ICustomWorld } from '../support/custom-world';
import { config } from '../support/config';
import { Given, Then } from '@cucumber/cucumber';
import expect from 'expect';
import { Placeholder } from 'e2e-api-playwright';
let myPlaceholder: Placeholder;

myPlaceholder = new Placeholder('Emma');

Given('Go to the playwright website', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.goto(config.BASE_URL);
  await page.locator('nav >> a >> text="Playwright"').waitFor();
  await myPlaceholder.setText();
});

Then('I get an error', async function () {
  expect(true).toEqual(false);
})

Then('I get a passing test', async function () {
  expect(true).toEqual(true);
})