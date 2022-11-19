import * as dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'

import { createServer } from 'http'
import { Game, User, Queue } from './models'
import { loginRouter, gameRouter } from './routes'
import { checkGameStatus } from './checkGameStatus'

async function main() {
    if (!process.env.MONGODB_URI) throw new Error('')

    const app = express()
    const PORT = 4000

    const whitelist = ['http://localhost:5173', '*']

    app.use(
        cors({
            origin: function (origin, callback) {
                if (whitelist.indexOf(origin as string) !== -1) {
                    callback(null, true)
                } else {
                    callback(new Error('Not allowed by CORS'))
                }
            },
            credentials: true,
        })
    )

    const httpServer = createServer(app)
    const io = new Server(httpServer, {
        /* options */
        cors: {
            origin: function (origin, callback) {
                if (whitelist.indexOf(origin as string) !== -1) {
                    callback(null, true)
                } else {
                    callback(new Error('Not allowed by CORS'))
                }
            },
            credentials: true,
        },
    })

    io.on('connection', (socket) => {
        socket.on('join-queue', async (id: string) => {
            // find a queue whiting a minute
            const openQueue = await Queue.findOne({
                createdAt: {
                    $gt: new Date().getTime() - 1000 * 60 * 1,
                },
            })

            if (!openQueue) {
                return await Queue.create({
                    socket: id,
                })
            }

            if (openQueue.socket !== id) {
                console.log('we got a game!!!!!')

                const random = Math.floor(Math.random() * 2)

                const game = await Game.create({
                    participants: [
                        {
                            id: openQueue.socket,
                            piece: random === 0 ? 'x' : 'o',
                        },
                        {
                            id: id,
                            piece: random === 1 ? 'x' : 'o',
                        },
                    ],
                })
                console.log('id: ', id)
                console.log('openQueue.socket: ', openQueue.socket)
                console.log('game._id.toString(): ', game._id.toString())

                socket.join(game._id.toString())
                socket.emit('join-game', game._id.toString(), game)
                socket
                    .to(openQueue.socket as string)
                    .emit('join-game', game._id.toString(), game)
                // socket.to(id).emit('join-game', game._id.toString())
                await openQueue.delete()
            }
        })

        socket.on('join-game', async (id: string) => {
            console.log('we finna join a game: ', id)

            socket.join(id)
        })

        socket.on('change-board', async (id, user_id, index) => {
            // console.log('board')
            // console.log(board)
            console.log(id)

            // await Game.findByIdAndUpdate(id, { board: board })
            const game = await Game.findById(id)
            if (
                !game ||
                !game.participants.some(
                    (participant) => participant.id === user_id
                ) ||
                game.board[index] !== '' ||
                game.turn !==
                    game.participants.find(
                        (participant) => participant.id === user_id
                    )?.piece ||
                checkGameStatus(game.board as any) !== 'ongoing'
            ) {
                return
            }
            game.board[index] = game.turn
            game.status = checkGameStatus(game.board as any)
            game.turn = game.turn === 'x' ? 'o' : 'x'
            await game.save()
            io.to(id).emit('update-board', game)
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
        res.json(await User.find({}))
    })

    httpServer.listen(4000, () => {
        console.log(`The application is listening on port ${PORT}!`)
    })
}
main().catch((err) => console.log(err))
