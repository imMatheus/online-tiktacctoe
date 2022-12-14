import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema(
    {
        board: {
            type: Array(9).fill({ type: String, enum: ['x', 'o', ''] }),
            require: true,
            validate: [
                (val: any) => val.length === 9,
                'Board need to have 9 squares',
            ],
            default: Array(9).fill(''),
        },
        status: {
            type: String,
            enum: ['x', 'o', 'ongoing', 'draw'],
            default: 'ongoing',
        },
        turn: {
            type: String,
            enum: ['x', 'o'],
            require: true,
            default: 'x',
        },
        participants: {
            type: [
                {
                    id: {
                        type: String,
                        require: true,
                    },
                    piece: {
                        type: String,
                        enum: ['x', 'o'],
                        require: true,
                    },
                    // type: mongoose.Types.ObjectId,
                    // ref: 'user',
                },
            ],
            validate: [
                (val: any) => val.length === 2,
                'Participants need to have 2 users',
            ],
            require: true,
        },
    },
    {
        timestamps: true,
    }
)

export const Game = mongoose.model('Game', gameSchema)
