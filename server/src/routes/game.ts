import express from 'express'
import { Game } from '../models'

export const gameRouter = express.Router()

gameRouter.get('/games', async (req, res) => {
    try {
        await Game.create({
            board: ['', '', 'x', 'o', 'x', '', '', '', ''],
            participants: [
                '6346d3653970e58911eb2069',
                '634aaa84f91c3b4a25378365',
            ],
        })
    } catch (error: any) {
        console.log(error._message)

        return res.status(400).send(error.message)
    }
    const games = await Game.find({}).sort({
        createdAt: -1,
    })
    res.json(games)
})
