import { Given, Then } from "@cucumber/cucumber";
import { HelloWord } from 'e2e-api';
import { expect } from 'chai';
import { LoginPage } from '../page_objects/login.page.js';

let myVar;

Given("Go to the playwright website", async function () {
    myVar = new HelloWord('Emma');
    const loginpage = new LoginPage();
    await loginpage.navigate();
});

Then("I get an error", function () {
    expect(true).equals(false);
});

Then("I get a passing test", function () {
    myVar.setText();
});