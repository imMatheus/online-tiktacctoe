import mongoose from 'mongoose'

const queueSchema = new mongoose.Schema(
    {
        socket: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
)

export const Queue = mongoose.model('Queue', queueSchema)
