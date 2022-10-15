import * as dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import express from 'express'
import bcrypt from 'bcrypt'
import cors from 'cors'
import { z } from 'zod'
import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import { createServer } from 'http'

import { Game, User } from './models'

import { loginRouter, gameRouter } from './routes'

async function main() {
    if (!process.env.MONGODB_URI) throw new Error('')

    const app = express()
    const PORT = 4000
    const httpServer = createServer(app)
    const io = new Server(httpServer, {
        /* options */
    })

    io.on('connection', (socket) => {
        // ...
    })

    app.use(cors({ origin: '*' }))
    app.use(express.json())
    app.use(loginRouter)
    app.use(gameRouter)

    await mongoose.connect(process.env.MONGODB_URI)

    app.get('/', async (req, res) => {
        res.send('This is a test web page!')
    })

    app.get('/leaderboard', async (req, res) => {
        res.json(await User.find({}))
    })

    app.get('/users', async (req, res) => {
        console.log('this the the users query')
        console.log(req.cookies)
        console.log(req.body)
        console.log(req.query)

        res.json(await User.find({}))
    })

    httpServer.listen(4000, () => {
        console.log(`The application is listening on port ${PORT}!`)
    })
}
main().catch((err) => console.log(err))
