"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const getQuote_1 = require("./src/getQuote");
const canvas_1 = require("canvas");
const node_fs_1 = __importDefault(require("node:fs"));
const canvas_multiline_text_1 = __importDefault(require("canvas-multiline-text"));
(0, canvas_1.registerFont)('./AurulentSansMono.otf', { family: 'myFont' });
const out = node_fs_1.default.createWriteStream(__dirname + "/out.png");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, getQuote_1.getQuote)();
    console.log(chalk_1.default.gray(`Quote: ${data.text}\nAuthor: ${data.author}`));
    const canvas = (0, canvas_1.createCanvas)(3000, 1000);
    const ctx = canvas.getContext("2d");
    ctx.font = "myFont";
    /*
    ctx.fillText(data.text, 1500, 500, 2000)
    ctx.fillText(`~ ${data.author}`, 1500, 600)
    */
    ctx.textAlign = "center";
    ctx.fillStyle = "#4A5568";
    (0, canvas_multiline_text_1.default)(ctx, `"${data.text}" ~ ${data.author}`, {
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
    });
    const stream = canvas.createJPEGStream();
    stream.pipe(out);
});
main();
out.on("finish", () => console.log(chalk_1.default.green("Finished saving the png!")));
