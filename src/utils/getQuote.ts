import axios from "axios"
import { QuoteData } from "../@types/QuoteData"

export async function getQuote(): Promise<QuoteData> {
    const res = await axios({
        method: "get",
        url: "https://winterly-backend.herokuapp.com/quote",
        responseType: "json"
    })
    return res.data as QuoteData
}