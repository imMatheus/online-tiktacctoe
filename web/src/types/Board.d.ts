import type { SquareValue } from './SquareValue'

export type Winner = 'x' | 'o' | ''

export type SquareValue = Winner

export type Board = [
    SquareValue,
    SquareValue,
    SquareValue,
    SquareValue,
    SquareValue,
    SquareValue,
    SquareValue,
    SquareValue,
    SquareValue
]

export interface Participant {
    id: string
    piece: 'x' | 'o'
    _id: string
}

export type Game = {
    _id: string
    board: Board
    status: 'x' | 'o' | 'ongoing' | 'draw'
    turn: 'x' | 'o'
    participants: Participant[]
    createdAt: Date
    updatedAt: Date
}
