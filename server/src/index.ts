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

async function main() {
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
    if (!process.env.MONGODB_URI) throw new Error('')

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

    app.post('/login', async (req, res) => {
        const Input = z.object({
            name: z.string().min(2).max(20),
            password: z.string(),
        })

        // makes sure req.body is of valid type
        if (!Input.safeParse(req.body).success) {
            return res.status(400).send({ message: 'Invalid types' })
        }

        const input: z.infer<typeof Input> = req.body

        // find user by the given name
        const userWithGivenName = await User.findOne({
            name: { $regex: input.name, $options: 'i' },
        })

        // if the user does not exit, we create one
        if (!userWithGivenName) {
            const user = await User.create({
                ...input,
                password: bcrypt.hashSync(input.password, 10),
            })
            return res.json({
                session: jwt.sign(
                    {
                        _id: user._id,
                        name: user.name,
                    },
                    'privateKey'
                ),
                login: false,
            })
        }

        const passwordsMatch = bcrypt.compareSync(
            input.password,
            userWithGivenName.password as string
        )
        if (!passwordsMatch) {
            return res.status(401).send({
                message: 'Password mismatch',
            })
        }
        return res.json({
            session: jwt.sign(
                {
                    _id: userWithGivenName._id,
                    name: userWithGivenName.name,
                },
                'privateKey'
            ),
            login: true,
        })
    })

    app.get('/games', async (req, res) => {
        const games = await Game.find({})
        res.json(games)
    })

    httpServer.listen(4000, () => {
        console.log(`The application is listening on port ${PORT}!`)
    })
}
main().catch((err) => console.log(err))
