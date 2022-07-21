import axios from "axios"

interface QuoteData {
    _id: string,
    text: string,
    author: string
}

export function getQuote(): Promise<QuoteData> {
    return axios({
        method: "get",
        url: "https://winterly-backend.herokuapp.com/quote",
        responseType: "json"
    }).then((res) => {
        return res.data as QuoteData
    })
}