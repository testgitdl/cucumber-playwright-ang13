import { LaunchOptions } from 'playwright';
const browserOptions: LaunchOptions = {
  slowMo: 0,
  headless: false,
  channel: "chrome",
  args: [
    "--no-sandbox",
    "--no-zygote",
    "--start-fullscreen"
  ]
};

export const configChrome = {
  browser: 'chrome',
  browserOptions
};
