import { expect } from "chai";
export class LoginPage {

  async navigate() {
    await page.goto('https://playwright.dev/');
  }

  async test() {
    console.log('okkkk');
  }
}
