import * as dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import express from 'express'
import bcrypt from 'bcrypt'
import cors from 'cors'
const app = express()
const PORT = 4000

app.use(cors({ origin: '*' }))
app.use(express.json())

import { Board } from './models'

async function main() {
    if (!process.env.MONGODB_URI) throw new Error('')

    await mongoose.connect(process.env.MONGODB_URI)

    app.get('/', async (req, res) => {
        res.send('This is a test web page!')
    })

    app.post('/login', async (req, res) => {
        console.log(req.body)
    })

    app.get('/boards', async (req, res) => {
        const boards = await Board.find({})
        res.send(boards)
    })

    app.listen(4000, () => {
        console.log(`The application is listening on port ${PORT}!`)
    })
}
main().catch((err) => console.log(err))
