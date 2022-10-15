import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema(
    {
        age: {
            type: Number,
            require: true,
        },
    },
    {
        timestamps: true,
    }
)

export const Game = mongoose.model('Game', gameSchema)
