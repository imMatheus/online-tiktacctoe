import type { Board, Status } from "$lib/types/Board";

export function checkWinner(board: Board): Status {
  const combs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // check for winner
  for (const comb of combs) {
    if (
      board[comb[0]] === board[comb[1]] &&
      board[comb[1]] === board[comb[2]] &&
      board[comb[0]] !== ""
    ) {
      return board[comb[0]] as "x" | "o";
    }
  }

  if (board.some((square) => square === "")) return "ongoing";

  return "draw";
}
