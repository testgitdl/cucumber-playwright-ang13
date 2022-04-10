import { Before, BeforeAll, AfterAll, After, setDefaultTimeout, Status, setWorldConstructor } from "@cucumber/cucumber";
import { chromium, firefox } from "playwright";
import { CustomWorld } from "./CustomWorld.js"

setDefaultTimeout(60000)
setWorldConstructor(CustomWorld);

const configChrome = {
  slowMo: 0,
  headless: false,
  channel: "chrome",
  args: [
    "--no-sandbox",
    "--no-zygote",
    "--start-fullscreen"
  ]
};

const configFirefox = {
  slowMo: 0,
  args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
  headless: false,
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true,
  }
}

// launch the browser
BeforeAll(async function () {
  switch (process.env.BROWSER?.trim()) {
    case 'firefox':
      global.browser = await firefox.launch(configFirefox);
      break;
    case 'chrome':
      global.browser = await chromium.launch(configChrome);
      break;
    default:
      global.browser = await chromium.launch(configChrome);
  }
});

// close the browser
AfterAll(async function () {
  await global.browser.close();
});

// Create a new browser context and page per scenario
Before(async function (scenario) {
  global.context = await global.browser.newContext();
  global.page = await global.context.newPage();
  // this.content = await global.browser.newContext();
  // this.page = await global.context.newPage();
  this.init(scenario);
});

// Cleanup after each scenario
After(async function () {
  await global.page.close();
  await global.context.close();
  // await this.page.close();
  // await this.content.close();
});

After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    var buffer = await global.page.screenshot({ path: `screenshots/${scenario.pickle.name}.png`, fullPage: true })
    this.attach(buffer, 'image/png');
  }
});