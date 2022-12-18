import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            require: true,
        },
        token: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
)

export const Session = mongoose.model('Session', sessionSchema)
