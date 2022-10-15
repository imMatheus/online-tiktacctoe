import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            minLength: 2,
            maxLength: 20,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
)

export const User = mongoose.model('User', userSchema)
