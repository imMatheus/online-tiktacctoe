import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()
const PORT = 4000

app.get('/', (req, res) => {
    res.send('This is a test web page!')
})

app.listen(4000, () => {
    console.log(`The application is listening on port ${PORT}!`)
})
