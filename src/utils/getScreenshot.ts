/***
 * @NOTE - For a serverless environment, you'd ideally need some package like chrome-aws-lambda to make puppeteer work.
 */

import puppeteer from "puppeteer";
import chalk from "chalk";
import { ScreenshotProps } from "../@types/ScreenshotProps";

export async function returnDynamicTemplateScreenshot({
  width = 1600,
  height = 900,
  quote,
  author,
  path,
}: ScreenshotProps) {
  let browser = await puppeteer.launch();

  console.log("Browser loaded.");
  let page = await browser.newPage();
  console.log("Page Loaded.");

  await page.setViewport({
    width: width,
    height: height,
  });

  const template = `
            <div id="screenshotThis">
            <i>${quote}</i> ~ <b>${author}</b>
            </div>
         `; // Set any arbitrary template

  await page.setContent(template);
  console.log("Template set.");

  await page.waitForSelector("#screenshotThis");
  const element = await page.$("#screenshotThis");

  const screenshot = await element.screenshot({
    type: "jpeg",
    path: path,
  });
  console.log(chalk.greenBright("Screenshot saved."));

  await browser.close();

  return screenshot;
}
