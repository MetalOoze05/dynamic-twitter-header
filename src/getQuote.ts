import axios from "axios"

interface QuoteData {
    _id: string,
    text: string,
    author: string
}

export async function getQuote(): Promise<QuoteData> {
    const res = await axios({
        method: "get",
        url: "https://winterly-backend.herokuapp.com/quote",
        responseType: "json"
    })
    return res.data as QuoteData
}