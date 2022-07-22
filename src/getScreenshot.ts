/***
 * @NOTE - For a serverless environment, you'd ideally need some package like chrome-aws-lambda to make puppeteer work.
 */

import puppeteer from "puppeteer";

type ScreenshotProps = {
  width?: number;
  height?: number;
  quote: string;
  author: string;
  save?: boolean;
  path?: string;
};

export async function returnDynamicTemplateScreenshot({
  width = 1600,
  height = 900,
  quote,
  author,
  save = false,
  path,
}: ScreenshotProps) {
  let browser = await puppeteer.launch();

  if (save && !path) {
    return console.log("No path has been specified.");
  }

  try {
    console.log("Browser loaded.")
    let page = await browser.newPage();
    console.log("Page Loaded.")

    await page.setViewport({
      width: width,
      height: height,
    });

    const template = `
             <i>${quote}</i> ~ <b>${author}</b>
         `; // Set any arbitrary template

    await page.setContent(template);
    console.log("Template set.")

    const screenshot = await page.screenshot({
      type: "jpeg",
      path: save ? path : null,
    });
    console.log("Screenshot saved.")

    await browser.close();

    return screenshot;
  } catch (err) {
    throw new Error(err, {
      cause: err,
    });
  }
}