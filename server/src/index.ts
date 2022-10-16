import * as dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { Game, User, Queue } from './models'
import { loginRouter, gameRouter } from './routes'

async function main() {
    if (!process.env.MONGODB_URI) throw new Error('')

    const app = express()
    const PORT = 4000
    app.use(cors({ origin: '*' }))
    const httpServer = createServer(app)
    const io = new Server(httpServer, {
        /* options */
        cors: { origin: '*' },
    })

    io.on('connection', (socket) => {
        console.log('socket id: ', socket.id)
        console.log(socket.rooms)

        socket.on('join-queue', async (id: string) => {
            // find a queue whiting a minute
            const openQueue = await Queue.findOne({
                createdAt: {
                    $gt: new Date().getTime() - 1000 * 60 * 1,
                },
            })
            console.log('props')
            console.log(socket.rooms)
            console.log(!!openQueue)

            if (!openQueue) {
                return await Queue.create({
                    socket: id,
                })
            }

            if (openQueue.socket !== id) {
                console.log('we got a game!!!!!')

                const game = await Game.create({
                    participants: [openQueue.socket, id],
                })
                console.log('id: ', id)
                console.log('openQueue.socket: ', openQueue.socket)
                console.log('game._id.toString(): ', game._id.toString())

                socket.join(game._id.toString())
                socket.emit('join-game', game._id.toString())
                // io.in(id).socketsJoin(game._id.toString())
                // io.in(openQueue.socket as string).socketsJoin(
                //     game._id.toString()
                // )

                // io.socketsJoin(game._id.toString())

                socket
                    .to(openQueue.socket as string)
                    .emit('join-game', game._id.toString())
                // socket.to(id).emit('join-game', game._id.toString())
                await openQueue.delete()
            }
        })

        socket.on('join-game', (id: string) => {
            console.log('we finna join a game: ', id)

            socket.join(id)
        })

        socket.on('change-board', async (id, board) => {
            console.log('board')
            console.log(board)
            console.log(id)

            await Game.findByIdAndUpdate(id, { board: board })

            io.to(id).emit('update-board', board)
        })
    })

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
