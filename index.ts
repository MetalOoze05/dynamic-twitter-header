import { Client } from "twitter-api-sdk"
import chalk from "chalk"
import { getQuote } from "./src/getQuote"
import { createCanvas, registerFont } from "canvas"
import fs from "node:fs"
import drawMultilineText from "canvas-multiline-text"

registerFont('./AurulentSansMono.otf', { family: 'myFont' })

const out = fs.createWriteStream(__dirname + "/out.png")

const main = async () => {
    const data = await getQuote()
    console.log(chalk.gray(`Quote: ${data.text}\nAuthor: ${data.author}`))

    const canvas = createCanvas(3000, 1000)
    const ctx = canvas.getContext("2d")
    
    ctx.font = "myFont"
    /*
    ctx.fillText(data.text, 1500, 500, 2000)
    ctx.fillText(`~ ${data.author}`, 1500, 600)
    */
   
    ctx.textAlign = "center"
    ctx.fillStyle = "#4A5568"

    drawMultilineText(ctx, `"${data.text}" ~ ${data.author}`, {
        rect: {
            x: 1500, y: 400,
            width: canvas.width - 300,
            height: canvas.height - 100
        },
        font: 'myFont',
        verbose: false,
        lineHeight: 1.4,
        minFontSize: 50,
        maxFontSize: 70
    })
    
    const stream = canvas.createJPEGStream()
    
    stream.pipe(out)    
}

main()

out.on("finish", () => console.log(chalk.green("Finished saving the png!")))