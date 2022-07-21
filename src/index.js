require("dotenv").config()
const Twitter = require("twitter-api-sdk")

const client = new Twitter.Client(process.env.BEARER_TOKEN)