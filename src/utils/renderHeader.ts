import chalk from "chalk"
import { getQuote } from "./getQuote.js"
import { createCanvas, registerFont } from "canvas"
import drawMultilineText from "canvas-multiline-text"
import type { WriteStream } from "node:fs"

registerFont('./AurulentSansMono.otf', { family: "myFont" })

export async function renderHeader(out: WriteStream) {
    const data = await getQuote()
    console.log(chalk.gray(`Quote: ${data.text}\nAuthor: ${data.author}`))

    const canvas = createCanvas(3000, 1000)
    const ctx = canvas.getContext("2d")

    ctx.font = "myFont"
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