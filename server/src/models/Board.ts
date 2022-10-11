import mongoose from 'mongoose'

const boardSchema = new mongoose.Schema(
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

export const Board = mongoose.model('Board', boardSchema)
