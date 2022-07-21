import { Client } from "twitter-api-sdk"
import chalk from "chalk"
import fs from "node:fs"
import { renderHeader } from "./src/renderHeader"

const out = fs.createWriteStream(__dirname + "/out.png")

renderHeader(out)

out.on("finish", () => console.log(chalk.green("Finished saving the png!")))