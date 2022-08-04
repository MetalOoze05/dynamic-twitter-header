import * as dotenv from "dotenv";
import { HeaderClient } from "./utils/HeaderClient.js";
import Twit from "twit";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";

dotenv.config();

const twitter: Twit = new Twit({
    consumer_key: `${process.env.CONSUMER_KEY}`,
    consumer_secret: `${process.env.CONSUMER_SECRET}`,
    access_token: `${process.env.ACCESS_TOKEN}`,
    access_token_secret: `${process.env.ACCESS_TOKEN_SECRET}`,
    timeout_ms: 60 * 1000,
    strictSSL: true,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const out = fs.createWriteStream(__dirname + "/out.jpg");

const client = new HeaderClient(out);

(async () => {
    client.renderHeader();

    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    
    const fileToBase64String = fs.readFileSync(__dirname + "/out.jpg", {
        encoding: "base64"
    });

    twitter.post("media/upload", { media_data: fileToBase64String }, (err: any, data: any, res: any) => {
        let media_id = data.media_id_string;

        twitter.post("account/update_profile_banner", { media_id: media_id }, (err: any, data: any, res: any) => {
            if (err) return console.error(err);
            else console.log(chalk.green("Updated twitter header!!"));
        })
    })

})();

out.on("finish", () => console.log(chalk.green("Finished saving the image!!")));


