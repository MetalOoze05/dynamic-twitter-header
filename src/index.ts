import * as dotenv from "dotenv";
import Twit from "twit";
import chalk from "chalk";
import fs from "node:fs";
import { renderHeader } from "./utils/renderHeader.js";
import path from "path";
import { fileURLToPath } from "node:url";

dotenv.config();

const twitter = new Twit({
  consumer_key: `${process.env.CONSUMER_KEY}`,
  consumer_secret: `${process.env.CONSUMER_SECRET}`,
  access_token: `${process.env.ACCESS_TOKEN}`,
  access_token_secret: `${process.env.ACCESS_TOKEN_SECRET}`,
  timeout_ms: 60 * 1000,
  strictSSL: true,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const out = fs.createWriteStream(__dirname + "/out.png");

(async () => {
  renderHeader(out);

  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  const fileToBase64String = fs.readFileSync(__dirname + "/out.png", {
    encoding: "base64",
  });

  twitter.post(
    "media/upload",
    { media_data: fileToBase64String },
    (err, data: any, response) => {
      let media_id = data.media_id_string;
      twitter.post(
        "account/update_profile_banner",
        { media_id: media_id },
        (err, data, response) => {
          if (err) {
            console.error(err);
          } else {
            console.log(chalk.green("Updated twitter header!"));
          }
        }
      );
    }
  );
})();

out.on("finish", () => console.log(chalk.green("Finished saving the png!")));
