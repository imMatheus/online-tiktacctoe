<script lang="ts">
    import type { Board, Winner, Game } from 'src/types/Board'
    import { checkWinner } from '../utils/checkWinner'
    import { socket } from '../stores'

    import BoardSquare from './BoardSquare.svelte'

    let game: Game | null = null
    let myPiece: null | 'x' | 'o' = null
    let isMyTurn = false

    $: {
        myPiece = game
            ? game.participants.find((p) => p.id === $socket.id).piece
            : null
        isMyTurn = game && myPiece === game.turn
    }
    // $: {
    //     console.log('hej hej')
    //     console.log(checkWinner(board))
    //     winner = checkWinner(board)
    // }
    $socket.on('update-board', (_game) => {
        console.log('we cgooood', _game)
        console.log('wag-1 biaaatch ')

        game = _game
    })

    $socket.on('join-game', (id, _game) => {
        game = _game
        console.log('$$$we got a gaaauuum', game)
        $socket.emit('join-game', id)
    })

    function changeSquare(index: number) {
        if (game.board[index] !== '' || game.status !== 'ongoing' || !isMyTurn)
            return

        game.board[index] = game.turn
        game.turn = game.turn === 'x' ? 'o' : 'x'
        game = { ...game }
        $socket.emit('change-board', game._id, $socket.id, index)
    }
</script>

{#if game}
    <h2 class="bg-pink-500 text-7xl text-center">
        {game.turn} - {$socket.id} - you are {myPiece}
    </h2>
    {JSON.stringify(game, null, 2)}
    {#if game.status !== 'ongoing'}
        <h2 class="bg-red-500 text-7xl text-center">
            The winner is {game.status}
        </h2>
    {/if}
    <div
        class="mx-auto max-w-xs grid-cols-3 gap-2 grid grid-rows-3 aspect-square"
    >
        {#each game.board as value, index}
            <BoardSquare
                {value}
                disabled={game.status !== 'ongoing' || !isMyTurn}
                onClick={() => changeSquare(index)}
            />
        {/each}
    </div>
{/if}

<style>
</style>
