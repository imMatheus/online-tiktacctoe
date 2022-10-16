import express from 'express'
import { Game } from '../models'

export const leaderboardRouter = express.Router()

leaderboardRouter.get('/leaderboard', async (req, res) => {
    const games = await Game.find({}).sort({
        createdAt: -1,
    })
    res.json(games)
})
