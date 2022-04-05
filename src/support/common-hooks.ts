import { ICustomWorld } from './custom-world';
import { configChrome } from './config_chrome';
import { configFirefox } from './config_firefox';
import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import {
  chromium,
  ChromiumBrowser,
  firefox,
  FirefoxBrowser,
  WebKitBrowser,
} from 'playwright';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
import { ensureDir } from 'fs-extra';

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
const tracesDir = 'traces';

declare global {
  // eslint-disable-next-line no-var
  var browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
}

setDefaultTimeout(60000);

BeforeAll(async function () {
  switch (process.env.BROWSER?.trim()) {
    case 'firefox':
      browser = await firefox.launch(configFirefox.browserOptions);
      break;
    case 'chrome':
      browser = await chromium.launch(configChrome.browserOptions);
      break;
    default:
      browser = await chromium.launch(configChrome.browserOptions);
  }
  await ensureDir(tracesDir);
});

Before({ tags: '@ignore' }, async function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return 'skipped' as any;
});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
  this.startTime = new Date();
  this.testName = pickle.name.replace(/\W/g, '-');
  // customize the [browser context](https://playwright.dev/docs/next/api/class-browser#browsernewcontextoptions)
  this.context = await browser.newContext({
    acceptDownloads: true,
    recordVideo: process.env.PWVIDEO ? { dir: 'screenshots' } : undefined,
  });
  // use login and set authorization if needed
  // this.server.defaults.headers.common.Authorization = 'Bearer ' + token;

  await this.context.tracing.start({ screenshots: true, snapshots: true });
  this.page = await this.context.newPage();
  this.page.on('console', async (msg) => {
    if (msg.type() === 'log') {
      await this.attach(msg.text());
    }
  });
  this.feature = pickle;
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  if (result) {
    // await this.attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}s`);

    if (result.status !== Status.PASSED) {
      const image = await this.page?.screenshot({ path: `./screenshots/${this.testName}.png`, fullPage: true });
      image && (await this.attach(image, 'image/png'));
    }
  }
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser.close();
});
