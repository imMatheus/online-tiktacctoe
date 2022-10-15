<script lang="ts">
    import type { Board, Winner } from 'src/types/Board'
    import { checkWinner } from '../utils/checkWinner'

    import BoardSquare from './BoardSquare.svelte'
    let board: Board = ['', '', '', '', '', '', '', '', '']
    let turn: Exclude<Winner, ''> = 'x'
    let winner: Winner = ''

    $: {
        console.log('hej hej')
        console.log(checkWinner(board))
        winner = checkWinner(board)
    }

    function changeSquare(index: number) {
        if (board[index] !== '' || winner) return

        board[index] = turn
        turn = turn === 'x' ? 'o' : 'x'
    }
</script>

<div class="px-2">
    <h2 class="bg-pink-500 text-7xl text-center">{turn}</h2>
    {#if winner}
        <h2 class="bg-red-500 text-7xl text-center">The winner is {winner}</h2>
    {/if}
    <div
        class="mx-auto max-w-lg grid-cols-3 gap-2 grid grid-rows-3 aspect-square"
    >
        {#each board as value, index}
            <BoardSquare {value} {winner} onClick={() => changeSquare(index)} />
        {/each}
    </div>
</div>

<style>
</style>
