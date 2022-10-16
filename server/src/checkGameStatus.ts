export type Status = 'x' | 'o' | 'ongoing' | 'draw'

export type SquareValue = 'x' | 'o' | ''

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

export function checkGameStatus(board: Board): Status {
    const combs = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    // check for a win
    for (const comb of combs) {
        if (
            board[comb[0]] === board[comb[1]] &&
            board[comb[1]] === board[comb[2]] &&
            board[comb[0]] !== ''
        ) {
            return board[comb[0]] as 'x' | 'o'
        }
    }

    // check for a draw
    if (board.every((square) => square === 'x' || square === 'o')) return 'draw'

    return 'ongoing'
}
