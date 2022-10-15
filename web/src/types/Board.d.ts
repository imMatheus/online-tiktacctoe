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
