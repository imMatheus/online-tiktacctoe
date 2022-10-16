<script lang="ts">
    import type { Board, Winner } from 'src/types/Board'
    import { checkWinner } from '../utils/checkWinner'
    import { socket } from '../stores'

    import BoardSquare from './BoardSquare.svelte'
    let board: Board = ['', '', '', '', '', '', '', '', '']
    let turn: Exclude<Winner, ''> = 'x'
    let winner: Winner = ''
    let game: any = null

    $: {
        console.log('hej hej')
        console.log(checkWinner(board))
        winner = checkWinner(board)
    }
    $socket.on('update-board', (_board) => {
        console.log('we cgooood', _board)
        console.log('wag-1 biaaatch ')

        board = _board
    })

    $socket.on('join-game', (id) => {
        game = id
        console.log('we cgooood', game)
        $socket.emit('join-game', id)
    })

    function changeSquare(index: number) {
        if (board[index] !== '' || winner) return

        board[index] = turn
        turn = turn === 'x' ? 'o' : 'x'

        $socket.emit('change-board', game, board)
    }
</script>

<div class="px-2">
    <h2 class="bg-pink-500 text-7xl text-center">{turn} - {$socket.id}</h2>
    {JSON.stringify(game, null, 2)}
    {#if winner}
        <h2 class="bg-red-500 text-7xl text-center">The winner is {winner}</h2>
    {/if}
    <div
        class="mx-auto max-w-xs grid-cols-3 gap-2 grid grid-rows-3 aspect-square"
    >
        {#each board as value, index}
            <BoardSquare {value} {winner} onClick={() => changeSquare(index)} />
        {/each}
    </div>
</div>

<style>
</style>
