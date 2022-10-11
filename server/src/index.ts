import * as dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import express from 'express'
const app = express()
const PORT = 4000

async function main() {
    if (!process.env.MONGODB_URI) throw new Error('')

    await mongoose.connect(process.env.MONGODB_URI)

    const kittySchema = new mongoose.Schema({
        name: String,
    })

    const Kitten = mongoose.model('Kitten', kittySchema)

    const silence = new Kitten({ name: 'Silence' })
    console.log(silence.name) // 'Silence'

    await silence.save()

    app.get('/', async (req, res) => {
        res.send('This is a test web page!')
    })

    app.listen(4000, () => {
        console.log(`The application is listening on port ${PORT}!`)
    })
}
main().catch((err) => console.log(err))
