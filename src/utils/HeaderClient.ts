import axios from "axios";
import { WriteStream } from "fs";
import { QuoteData } from "../@types/QuoteData";
import chalk from "chalk";
import drawMultilineText from "canvas-multiline-text"
import { createCanvas, registerFont } from "canvas"

export class HeaderClient {
    out: WriteStream;

    constructor(out: WriteStream) {
        this.out = out;
    };

    async getQuote(): Promise<QuoteData> {
        const res = await axios({
            method: "get",
            url: "https://winterly-backend.herokuapp.com/quote",
            responseType: "json"
        })
        return res.data as QuoteData;
    }

    async logQuote(data: QuoteData) {
        return console.log(chalk.gray(`Quote: ${data.text}\nAuthor: ${data.author}`));
    }

    async renderHeader() {
        await registerFont("./AurulentSansMono.otf", { family: "myFont" });

        const data = await this.getQuote();
        await this.logQuote(data);    

        const canvas = createCanvas(3000, 1000);
        const ctx = canvas.getContext("2d");

        ctx.font = "myFont";
        ctx.textAlign = "center";
        ctx.fillStyle = "#4A5568";

        drawMultilineText(ctx, `"${data.text}" ~ ${data.author}`, {
            rect: {
                x: 1500, 
                y: 400,
                width: canvas.width - 300,
                height: canvas.height - 100
            },
            font: "myFont",
            verbose: false,
            lineHeight: 1.4,
            minFontSize: 50,
            maxFontSize: 70
        })

        const stream = canvas.createJPEGStream()
        return stream.pipe(this.out);
    }
}